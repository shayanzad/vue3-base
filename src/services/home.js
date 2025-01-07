import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // آدرس سرور API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
