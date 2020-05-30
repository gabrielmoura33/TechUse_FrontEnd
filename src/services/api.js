import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4567/',
});

export default api;
