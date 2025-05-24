import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const studentService = {
  getAllVendors: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_VENDORS);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch vendors.';
    }
  },

  getVendorMenu: async (vendorId) => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_VENDOR_MENU(vendorId));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch vendor menu.';
    }
  },

  placeOrder: async (orderData) => {
    try {
      const response = await api.post(API_ENDPOINTS.PLACE_ORDER, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to place order.';
    }
  },

  getOrderHistory: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_ORDER_HISTORY);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order history.';
    }
  }
};

export default studentService;
