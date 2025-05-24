import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx'; // Import useCart
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import CartItem from '../components/CartItem.jsx'; // Import CartItem

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice, cartVendor } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
            <Link to="/student/dashboard">
              <Button variant="primary">Start Ordering</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Items from {cartVendor?.name}</h2>
              {cartItems.map(item => (
                <CartItem
                  key={item.item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
              <div className="flex justify-between items-center mt-6">
                <Button variant="danger" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link to={`/vendors/${cartVendor?._id}`} className="text-blue-600 hover:underline">
                    &larr; Continue Shopping at {cartVendor?.name}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
              <p className="text-gray-700 mb-2">Total Items: <span className="font-bold">{getTotalItems()}</span></p>
              <p className="text-gray-700 text-xl font-bold mb-6">Total Price: <span className="text-blue-700">BDT {getTotalPrice()}</span></p>
              <Button onClick={handleCheckout} className="w-full" variant="primary">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
