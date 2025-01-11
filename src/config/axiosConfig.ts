import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add authorization token (if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      return Promise.reject(new Error('Invalid server URL'));
    }

    const storedToken = localStorage.getItem('accessToken');
    const token = storedToken ? JSON.parse(storedToken) : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const callbackUrl = window.location.pathname;

      localStorage.removeItem('accessToken');
      window.location.href = `/auth/login?callbackUrl=${callbackUrl}`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
