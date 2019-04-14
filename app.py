from flask import Flask

from templates.app import app_blueprint

app = Flask(
    __name__,
    static_folder='./templates/public',
    template_folder='./templates/static'
)
app.config.from_object('configurations.DevelopmentConfig')
app.register_blueprint(app_blueprint)

if __name__ == '__main__':
    app.run()
