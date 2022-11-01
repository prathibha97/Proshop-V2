import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;