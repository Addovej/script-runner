from os import listdir
from os.path import isfile, join


def get_file_ext(file):
    return file.split('.').pop()


def get_dir_content(path='', files_ext=list):
    listing = {
        'folders': [],
        'files': [],
        'current': path
    }
    try:
        folder_content = listdir(path)
    except FileNotFoundError:
        return listing
    except NotADirectoryError:
        return listing

    if folder_content:
        for item in folder_content:
            path_file = join(path, item)
            f = {'name': item, 'path': path_file, 'isFolder': False}
            if isfile(path_file):
                if get_file_ext(item) in files_ext:
                    listing['files'].append(f)
            else:
                f.update({'isFolder': True})
                listing['folders'].append(f)

    return listing


def get_file_content(path=''):
    if isfile(path):
        with open(path, 'r') as file:
            data = file.read()

            return data

    return ''


def log_file(file, message=''):
    file = open(file, 'a+')
    try:
        file.write(message)
    except Exception as e:
        print(e)
    finally:
        file.close()
