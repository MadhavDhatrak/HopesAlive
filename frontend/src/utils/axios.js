import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  // your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//    console.log('Token:', localStorage.getItem('token'));
export default api;
