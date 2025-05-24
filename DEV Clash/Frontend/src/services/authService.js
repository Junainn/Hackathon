import api from './api';
import { setUser, removeUser } from '../utils/localStorage';
import { API_ENDPOINTS } from '../utils/constants';

const authService = {
  login: async (email, password) => {
    try {
      // Backend now sends { user: { ... } } in response.data
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const { user } = response.data; // Get user directly from response
      setUser(user); // Store user details in local storage
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (name, email, password, role) => {
    try {
      // Backend now sends { user: { ... } } in response.data
      const response = await api.post(API_ENDPOINTS.REGISTER, { name, email, password, role });
      const { user } = response.data; // Get user directly from response
      setUser(user); // Store user details
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.SIGNOUT); // Call backend to clear cookie
      removeUser(); // Clear user details from local storage
    } catch (error) {
      console.error("Logout failed on backend:", error);
      removeUser(); // Still clear frontend state even if backend call fails
    }
  },

  // Removed getProfile as it's no longer needed
  // getProfile: async () => { /* ... */ }
};

export default authService;
