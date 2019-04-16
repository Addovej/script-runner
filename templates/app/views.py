import subprocess
from datetime import datetime as dt
from os.path import isfile, isdir

from flask import Blueprint, render_template, jsonify
from flask import current_app as app

from templates.utils import get_dir_content, get_file_content, log_file, get_file_ext

app_blueprint = Blueprint('app', __name__)
ext_map = {
    'py': 'python3',
    'bash': 'bash'
}


@app_blueprint.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app_blueprint.route('/pathretrieve', defaults={'path': ''}, methods=['GET'])
@app_blueprint.route('/pathretrieve/<string:path>', methods=['GET'])
def path_retrieve(path):
    # TODO: for fast solution I've made this 'magic'.
    path = path.replace('-', '/')

    if path and not isdir(path):
        return jsonify({'message': 'It`s not a directory.'})

    if not path:
        return jsonify(get_dir_content(
            path=app.config.get('ROOT_PATH'),
            files_ext=app.config.get('EXEC_FILE_EXT')
        ))

    return jsonify(get_dir_content(
        path=path,
        files_ext=app.config.get('EXEC_FILE_EXT')
    ))


@app_blueprint.route('/filecontent/<string:path>', methods=['GET'])
def file_content(path):
    # TODO: for fast solution I've made this 'magic'.
    path = path.replace('-', '/')

    if not isfile(path):
        return jsonify({'message': 'It`s not a file'})

    return jsonify({'content': get_file_content(path)})


@app_blueprint.route('/logs', methods=['GET'])
def get_log():
    return jsonify({'content': get_file_content(app.config.get('LOG_FILE'))})


@app_blueprint.route('/run-script/<string:path>', methods=['POST'])
def run_script(path):
    celery = app.config['CELERY']

    @celery.task()
    def script_run(file_path):
        if isfile(file_path):
            try:
                command = ext_map[get_file_ext(file_path)]
            except KeyError as e:
                print('Could not get a running command for file {}\n{}'.format(file_path, e))
            else:
                cmd = [command, file_path]
                try:
                    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    out, err = proc.communicate()  # TODO: need setup a timeout
                except Exception as e:
                    print(e)
                else:
                    log_file(
                        app.config.get('LOG_FILE'),
                        '{} - {}\n'.format(dt.now().strftime('%Y-%m-%d %H:%M:%S'), file_path)
                    )
                    print(out.decode('utf-8'))
                    print(err.decode('utf-8'))
        else:
            print('File {} does not exists.'.format(file_path))

    # script_run.delay(path.replace('-', '/'))
    script_run(path.replace('-', '/'))
    return jsonify({'message': 'Script ({}) was run success.'.format(path.replace('-', '/'))})


@app_blueprint.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'test'})
