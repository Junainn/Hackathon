import api from './api';
import { setToken, removeToken, setUser, removeUser } from '../utils/localStorage';
import { API_ENDPOINTS } from '../utils/constants';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (name, email, password, role) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, { name, email, password, role });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  logout: () => {
    removeToken();
    removeUser();
  },
};

export default authService;
