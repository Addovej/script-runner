import argparse
import pty
import os
import subprocess
import select
import termios
import struct
import fcntl
import shlex

from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO

from make_celery import make_celery
from templates.app import app_blueprint

app = Flask(
    __name__,
    static_folder='./templates/public',
    template_folder='./templates/static'
)
app.config.from_object('configurations.DevelopmentConfig')
CORS(app)
app.register_blueprint(app_blueprint)
celery = make_celery(app)
app.config.update(
    CELERY=celery,
    fd=None,
    child_pid=None
)

socketio = SocketIO(app)


def set_winsize(fd, row, col, xpix=0, ypix=0):
    winsize = struct.pack('HHHH', row, col, xpix, ypix)
    fcntl.ioctl(fd, termios.TIOCSWINSZ, winsize)


def read_and_forward_pty_output():
    max_read_bytes = 1024 * 20
    while True:
        socketio.sleep(0.01)
        if app.config['fd']:
            timeout_sec = 0
            (data_ready, _, _) = select.select([app.config['fd']], [], [], timeout_sec)
            if data_ready:
                output = os.read(app.config['fd'], max_read_bytes).decode()
                socketio.emit('pty-output', {'output': output}, namespace='/pty')


@app.route('/wssh')
def wssh():
    return render_template('wssh.html')


@socketio.on('pty-input', namespace='/pty')
def pty_input(data):
    """write to the child pty. The pty sees this as if you are typing in a real
    terminal.
    """
    if app.config['fd']:
        os.write(app.config['fd'], data['input'].encode())


@socketio.on('resize', namespace='/pty')
def resize(data):
    if app.config['fd']:
        set_winsize(app.config['fd'], data['rows'], data['cols'])


@socketio.on('connect', namespace='/pty')
def connect():
    """new client connected"""

    if app.config['child_pid']:
        # already started child process, don't start another
        return

    # create child process attached to a pty we can read from and write to
    (child_pid, fd) = pty.fork()
    if child_pid == 0:
        # this is the child process fork.
        # anything printed here will show up in the pty, including the output
        # of this subprocess
        os.chdir(os.path.expanduser('~'))
        subprocess.run(app.config['CMD'])
    else:
        # this is the parent process fork.
        # store child fd and pid
        app.config['fd'] = fd
        app.config['child_pid'] = child_pid
        set_winsize(fd, 50, 50)
        cmd = ' '.join(shlex.quote(c) for c in app.config['CMD'])
        print('child pid is', child_pid)
        print(
            f'starting background task with command `{cmd}` to continously read '
            'and forward pty output to client'
        )
        socketio.start_background_task(target=read_and_forward_pty_output)
        print('task started')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    socketio.run(
        app,
        debug=app.config.get('DEBUG'),
        port=app.config.get('PORT') or 5000
    )
