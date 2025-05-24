// src/services/vendorService.js
import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const vendorService = {
  // Menu Management
  addMenuItem: async (itemData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_MENU_ITEM, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add menu item.';
    }
  },

  updateMenuItem: async (itemId, itemData) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_MENU_ITEM(itemId), itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update menu item.';
    }
  },

  deleteMenuItem: async (itemId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.DELETE_MENU_ITEM(itemId));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete menu item.';
    }
  },

  // Order Management
  getVendorOrders: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_VENDOR_ORDERS);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch vendor orders.';
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), { status: newStatus });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order status.';
    }
  },

  // Placeholder for toggling availability
  toggleAvailability: async (vendorId, isOpen) => {
    // This would likely be a PUT request to update vendor status
    console.log(`Mock: Toggling vendor ${vendorId} availability to ${isOpen}`);
    return new Promise(resolve => setTimeout(() => resolve({ message: 'Availability updated' }), 500));
  }
};

export default vendorService;
