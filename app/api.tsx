import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL for your API
  timeout: 5000, // 5 seconds timeout
});

export default api;
