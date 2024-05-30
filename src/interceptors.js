import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', 
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response) {
      const token = 'dummy_token';
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
