import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const studentService = {
  getAllVendors: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_VENDORS);
      // This part should be robust enough for {data: [...]} or direct array
      if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
      } else if (response.data && Array.isArray(response.data.vendors)) {
          return response.data.vendors;
      } else if (Array.isArray(response.data)) {
          return response.data;
      } else {
          console.error("Unexpected response format for getAllVendors:", response.data);
          throw new Error("Invalid response format for vendors.");
      }
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch vendors.';
    }
  },

  getVendorMenu: async (vendorId) => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_VENDOR_MENU(vendorId));
      // FIX: Ensure you return response.data.data because your backend sends { success: true, data: menuItems }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // Extract the array from the 'data' property
      } else {
        console.error("Unexpected response format for getVendorMenu:", response.data);
        throw new Error("Invalid response format for vendor menu.");
      }
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
      // You might need a similar adjustment here if your backend wraps the order history array
      return response.data; // Keep as is for now, adjust if needed
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order history.';
    }
  }
};

export default studentService;
