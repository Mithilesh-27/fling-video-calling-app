import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ENV === 'production'
  ? "/api"
  : 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

export default apiClient;