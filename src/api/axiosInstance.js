import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://vault-backend.vercel.app/api', // Your backend URL http://localhost:4000/api
    timeout: 10000, // Request timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
  

