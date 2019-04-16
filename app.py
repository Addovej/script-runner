from flask import Flask, render_template
from flask_cors import CORS

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
app.config.update(CELERY=celery)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run()
