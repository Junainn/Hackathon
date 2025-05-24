import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import studentService from '../services/studentService.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart, cartVendor } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const handlePlaceOrder = async () => {
    setLoading(true);
    setOrderError('');
    try {
      if (!user || !cartVendor) {
        setOrderError("User or vendor information missing.");
        return;
      }

      const orderDetails = {
        vendor: { id: cartVendor._id, name: cartVendor.name },
        items: cartItems.map(item => ({
          item: { id: item.item.id, name: item.item.name, price: item.item.price },
          quantity: item.quantity
        })),
        totalPrice: getTotalPrice(),
        // Add more details like pickup time, special instructions if needed
      };

      const response = await studentService.placeOrder(orderDetails);
      console.log('Order placed:', response.order);
      setOrderSuccess(true);
      clearCart(); // Clear cart after successful order
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.');
      console.error('Order placement error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-green-50">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold text-green-700 mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-700 mb-6">Your order has been sent to {cartVendor.name}.</p>
          <div className="space-y-4">
            <Button onClick={() => navigate('/student/order-history')} variant="primary">
              View Order History
            </Button>
            <Button onClick={() => navigate('/student/dashboard')} variant="secondary">
              Order More
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty. Nothing to checkout.</p>
          <Button onClick={() => navigate('/student/dashboard')} variant="primary">
            Back to Dashboard
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>
            <p className="text-gray-600 mb-2">Ordering from: <span className="font-bold">{cartVendor?.name}</span></p>
            <p className="text-gray-600 mb-4">Customer: <span className="font-bold">{user?.name}</span></p>
            <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {cartItems.map(item => (
                <li key={item.item.id} className="text-sm">
                  {item.item.name} x {item.quantity} (BDT {item.item.price})
                </li>
              ))}
            </ul>
            <div className="text-right text-xl font-bold text-blue-700">
              Total: BDT {getTotalPrice()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Method (Mock)</h2>
            <p className="text-gray-600 mb-4">
              Payment will be processed via SSLCommerz sandbox. For this mock, we'll simulate success.
            </p>
            {orderError && <p className="text-red-500 text-sm mb-4">{orderError}</p>}
            <Button onClick={handlePlaceOrder} className="w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Place Order & Pay (Mock)'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
