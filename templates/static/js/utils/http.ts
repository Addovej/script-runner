import * as axios from 'axios';

const http = axios.default.create({
  baseURL: 'http://localhost:5000',
});

export default http;
