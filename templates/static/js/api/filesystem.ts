import http from '../utils/http'

const get_test = () => {
    return http.get(`/test`);
};

const get_root_folder = () => {
    return http.get(`/pathretrieve`)
};

const get_folder = (path) => {
    return http.get(`/pathretrieve/${path}`)
};

const get_file_content = (path) => {
    return http.get(`/filecontent/${path}`)
};

export const filesystemAPI = {
    get_test,
    get_root_folder,
    get_folder,
    get_file_content
};
