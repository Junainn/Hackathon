import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderListItem from '../components/OrderListItem'; // Re-use OrderListItem
import vendorService from '../services/vendorService';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVendorOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await vendorService.getVendorOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await vendorService.updateOrderStatus(orderId, newStatus);
      // Re-fetch orders to get the latest state, or optimistically update
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(err.message || 'Failed to update order status.');
      console.error('Update order status error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Order Management</h1>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center text-lg mt-8">No orders received yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map(order => (
              <OrderListItem key={order._id} order={order} onUpdateStatus={handleUpdateOrderStatus} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderManagementPage;
