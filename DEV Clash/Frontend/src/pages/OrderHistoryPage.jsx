import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import studentService from '../services/studentService';
import OrderListItem from '../components/OrderListItem'; // Re-use Vendor's OrderListItem for display

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await studentService.getOrderHistory();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order history.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">My Order History</h1>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center text-lg mt-8">You haven't placed any orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map(order => (
              // Re-using OrderListItem but without status update functionality for students
              <OrderListItem key={order._id} order={order} onUpdateStatus={() => {}} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
