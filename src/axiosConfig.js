// src/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can add authorization headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.log('Unauthorized access, logging out...');
      // Implement logout or redirect to login page if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
