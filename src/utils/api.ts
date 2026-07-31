import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7123/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
