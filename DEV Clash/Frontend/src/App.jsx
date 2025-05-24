import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import { CartProvider } from './hooks/useCart.jsx'; // Import CartProvider

// Import all page components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import VendorMenuPage from './pages/VendorMenuPage';
import CartPage from './pages/CartPage'; // New Page
import CheckoutPage from './pages/CheckoutPage'; // New Page
import OrderHistoryPage from './pages/OrderHistoryPage'; // New Page
import VendorDashboardPage from './pages/VendorDashboardPage';
import MenuManagementPage from './pages/MenuManagementPage'; // New Page
import OrderManagementPage from './pages/OrderManagementPage'; // New Page
import NotFoundPage from './pages/NotFoundPage';

// Import protected route component
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap routes with CartProvider */}
        <Routes>
          {/* Public Landing Page - Accessible to everyone. Full-screen design handled within LandingPage. */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes - Full-screen design handled within LoginPage/RegisterPage */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Student Routes - Header/Footer handled within each page */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/vendors/:id" element={<VendorMenuPage />} />
            <Route path="/cart" element={<CartPage />} /> {/* New Route */}
            <Route path="/checkout" element={<CheckoutPage />} /> {/* New Route */}
            <Route path="/student/order-history" element={<OrderHistoryPage />} /> {/* New Route */}
          </Route>

          {/* Protected Vendor Routes - Header/Footer handled within each page */}
          <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            <Route path="/vendor/menu" element={<MenuManagementPage />} /> {/* Updated Route */}
            <Route path="/vendor/orders" element={<OrderManagementPage />} /> {/* Updated Route */}
          </Route>

          {/* Catch-all for undefined routes - Full-screen design handled within NotFoundPage */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
