from os.path import isfile, isdir

from flask import Blueprint, render_template, jsonify
from flask import current_app as app

from templates.utils import get_dir_content, get_file_content

app_blueprint = Blueprint('app', __name__)


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
        return jsonify(get_dir_content(path=app.config.get('ROOT_PATH')))

    return jsonify(get_dir_content(path=path))


@app_blueprint.route('/filecontent/<string:path>', methods=['GET'])
def file_content(path):
    # TODO: for fast solution I've made this 'magic'.
    path = path.replace('-', '/')

    if not isfile(path):
        return jsonify({'message': 'It`s not a file'})

    return jsonify({'content': get_file_content(path)})


@app_blueprint.route('/test', methods=['GET'])
def test():
    data = {
        'message': 'Ты пидор'
    }
    return jsonify(data)
