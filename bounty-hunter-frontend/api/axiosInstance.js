import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8000', // Replace with your API's base URL
  headers: { 'Content-Type': 'application/json' },
  proxy: false
});

export default axiosInstance;