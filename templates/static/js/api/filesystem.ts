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

const get_logs = () => {
    return http.get(`/logs`)
};

const run_script = (path) => {
    return http.post(`/run-script/${path}`)
};

const save_file = (path, content) => {
    return http.post(`/write-file`, {path: path, content: content})
};

export const filesystemAPI = {
    get_test,
    get_root_folder,
    get_folder,
    get_file_content,
    get_logs,
    run_script,
    save_file
};
