import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: CONFIG.TIME_OUT,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error || 'Something went wrong'),
);

axiosInstance.interceptors.request.use((config) => {
  if (localStorage && localStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

export default axiosInstance;
