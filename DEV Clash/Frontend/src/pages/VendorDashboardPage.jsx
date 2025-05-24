import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // Ensure .jsx extension
import Button from '../components/Button';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const VendorDashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Ensure page fills screen and is a flex column */}
      <Header /> {/* Include Header */}
      <main className="flex-grow container mx-auto p-4 py-8"> {/* Main content area */}
        <div className="p-4">
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Vendor Dashboard</h1>
          <p className="text-lg text-gray-700 text-center">Welcome, {user?.name}! This is your vendor control panel.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Menu Management</h3>
              <p className="text-gray-700 mb-4">Add, edit, or delete your menu items.</p>
              <Link to="/vendor/menu">
                <Button variant="primary" className="w-full">Manage Menu</Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Management</h3>
              <p className="text-gray-700 mb-4">View and update statuses of incoming orders.</p>
              <Link to="/vendor/orders">
                <Button variant="primary" className="w-full">View Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default VendorDashboardPage;
