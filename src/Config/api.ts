import axios from 'axios';

 const api = axios.create({
  baseURL: 'http://localhost:6464',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, set the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle any request errors here
    return Promise.reject(error);
  }
);

export default api;
