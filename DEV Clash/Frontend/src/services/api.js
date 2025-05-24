// src/services/api.js
import axios from 'axios';
import { removeUser } from '../utils/localStorage'; // Only remove user, not token

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: This tells Axios to send cookies with requests
});

// Request interceptor: Remove the Authorization header logic as JWT is in a cookie
api.interceptors.request.use(
  (config) => {
    // No need to manually add Authorization header if JWT is sent as a cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the response is 401 Unauthorized, it means the cookie is invalid or expired
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized or Session Expired. Logging out...');
      removeUser(); // Clear user details from local storage
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default api;
