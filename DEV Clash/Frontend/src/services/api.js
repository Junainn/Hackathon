// src/services/api.js
// This is a mock API service. In a real project, you would use axios or fetch.
// Example with axios:
// import axios from 'axios';
// const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
// api.interceptors.request.use(config => { /* add token */ return config; });
// api.interceptors.response.use(response => response, error => { /* handle 401 */ return Promise.reject(error); });
// export default api;

import { getToken, removeToken, getUser } from '../utils/localStorage';
import { MOCK_MENUS, MOCK_ORDERS } from '../utils/constants'; // Import mock data

const api = {
  // Simulate a POST request
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = getToken();
        if (url !== '/auth/login' && url !== '/auth/register' && !token) {
          removeToken();
          reject({ response: { status: 401, data: { message: 'Unauthorized' } } });
          return;
        }

        if (url === '/auth/login') {
          if (data.email === 'student@cuet.ac.bd' && data.password === 'password123') {
            resolve({ data: { token: 'mock-student-token', user: { name: 'Student User', email: data.email, role: 'student', _id: 'student123' } } });
          } else if (data.email === 'vendor@cuet.ac.bd' && data.password === 'password123') {
            resolve({ data: { token: 'mock-vendor-token', user: { name: 'Vendor User', email: data.email, role: 'vendor', _id: 'vendor123' } } });
          } else {
            reject({ response: { data: { message: 'Invalid credentials' } } });
          }
        } else if (url === '/auth/register') {
          if (data.email === 'existing@cuet.ac.bd') {
            reject({ response: { data: { message: 'Email already registered' } } });
          } else {
            resolve({ data: { token: `mock-${data.role}-token`, user: { name: data.name, email: data.email, role: data.role, _id: `mock-${Date.now()}` } } });
          }
        } else if (url === '/orders') { // Student places order
            const currentUser = getUser();
            if (currentUser && currentUser.role === 'student') {
                const newOrder = {
                    _id: `order${MOCK_ORDERS.length + 1}`,
                    user: { _id: currentUser._id, name: currentUser.name },
                    vendor: data.vendor, // Assuming vendor details are passed
                    items: data.items,
                    totalPrice: data.totalPrice,
                    status: 'Pending',
                    createdAt: new Date().toISOString(),
                };
                MOCK_ORDERS.unshift(newOrder); // Add to beginning for easy viewing
                resolve({ data: { message: 'Order placed successfully!', order: newOrder } });
            } else {
                reject({ response: { data: { message: 'Only students can place orders.' } } });
            }
        } else if (url === '/vendor/menu/add') { // Vendor adds menu item
            const currentUser = getUser();
            if (currentUser && currentUser.role === 'vendor') {
                const vendorMenu = MOCK_MENUS[currentUser._id] || [];
                const newItem = { id: `m${Date.now()}`, ...data };
                MOCK_MENUS[currentUser._id] = [...vendorMenu, newItem];
                resolve({ data: { message: 'Menu item added successfully!', item: newItem } });
            } else {
                reject({ response: { data: { message: 'Only vendors can add menu items.' } } });
            }
        }
        else {
          // Fallback for other POST requests
          resolve({ data: { message: `Mock POST success for ${url}`, receivedData: data } });
        }
      }, 1000); // Simulate network delay
    });
  },
  // Simulate a GET request
  get: (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = getToken();
        const currentUser = getUser();
        if (!token) {
          removeToken();
          reject({ response: { status: 401, data: { message: 'Unauthorized' } } });
          return;
        }

        if (url === '/vendors') {
          resolve({
            data: [
              { _id: 'v1', name: 'CUET Canteen', status: 'Open', description: 'Serves traditional Bangladeshi meals.', ownerId: 'vendor123' },
              { _id: 'v2', name: 'Campus Cafe', status: 'Closed', description: 'Coffee, snacks, and quick bites.', ownerId: 'vendorOther' },
              { _id: 'v3', name: 'Juice Bar', status: 'Open', description: 'Fresh juices and smoothies.', ownerId: 'vendor123' },
            ]
          });
        } else if (url.startsWith('/vendors/') && url.endsWith('/menu')) {
            const vendorId = url.split('/')[2];
            resolve({ data: MOCK_MENUS[vendorId] || [] });
        } else if (url === '/orders/history') { // Student's order history
            if (currentUser && currentUser.role === 'student') {
                const studentOrders = MOCK_ORDERS.filter(order => order.user._id === currentUser._id);
                resolve({ data: studentOrders });
            } else {
                reject({ response: { data: { message: 'Only students can view order history.' } } });
            }
        } else if (url === '/vendor/orders') { // Vendor's orders
            if (currentUser && currentUser.role === 'vendor') {
                const vendorOrders = MOCK_ORDERS.filter(order => order.vendor.ownerId === currentUser._id || order.vendor._id === currentUser._id); // Assuming vendor._id or ownerId links
                resolve({ data: vendorOrders });
            } else {
                reject({ response: { data: { message: 'Only vendors can view orders.' } } });
            }
        } else {
          // Fallback for other GET requests
          resolve({ data: { message: `Mock GET success for ${url}` } });
        }
      }, 500);
    });
  },

  // Simulate PUT request (for updating status or menu items)
  put: (url, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const token = getToken();
            const currentUser = getUser();
            if (!token) {
                removeToken();
                reject({ response: { status: 401, data: { message: 'Unauthorized' } } });
                return;
            }

            if (url.startsWith('/vendor/orders/') && url.endsWith('/status')) {
                const orderId = url.split('/')[3];
                const orderIndex = MOCK_ORDERS.findIndex(o => o._id === orderId);
                if (orderIndex > -1 && (MOCK_ORDERS[orderIndex].vendor.ownerId === currentUser._id || MOCK_ORDERS[orderIndex].vendor._id === currentUser._id)) {
                    MOCK_ORDERS[orderIndex].status = data.status;
                    resolve({ data: { message: 'Order status updated!', order: MOCK_ORDERS[orderIndex] } });
                } else {
                    reject({ response: { data: { message: 'Order not found or unauthorized.' } } });
                }
            } else if (url.startsWith('/vendor/menu/')) { // Update menu item
                const itemId = url.split('/')[3];
                const vendorMenu = MOCK_MENUS[currentUser._id] || [];
                const itemIndex = vendorMenu.findIndex(item => item.id === itemId);
                if (itemIndex > -1) {
                    MOCK_MENUS[currentUser._id][itemIndex] = { ...MOCK_MENUS[currentUser._id][itemIndex], ...data };
                    resolve({ data: { message: 'Menu item updated!', item: MOCK_MENUS[currentUser._id][itemIndex] } });
                } else {
                    reject({ response: { data: { message: 'Menu item not found.' } } });
                }
            } else {
                resolve({ data: { message: `Mock PUT success for ${url}`, receivedData: data } });
            }
        }, 800);
    });
  },

  // Simulate DELETE request (for deleting menu items)
  delete: (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const token = getToken();
            const currentUser = getUser();
            if (!token) {
                removeToken();
                reject({ response: { status: 401, data: { message: 'Unauthorized' } } });
                return;
            }

            if (url.startsWith('/vendor/menu/')) {
                const itemId = url.split('/')[3];
                const vendorMenu = MOCK_MENUS[currentUser._id] || [];
                const initialLength = vendorMenu.length;
                MOCK_MENUS[currentUser._id] = vendorMenu.filter(item => item.id !== itemId);
                if (MOCK_MENUS[currentUser._id].length < initialLength) {
                    resolve({ data: { message: 'Menu item deleted!' } });
                } else {
                    reject({ response: { data: { message: 'Menu item not found.' } } });
                }
            } else {
                resolve({ data: { message: `Mock DELETE success for ${url}` } });
            }
        }, 700);
    });
  }
};

export default api;
