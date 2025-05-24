import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorCard from '../components/VendorCard';
import studentService from '../services/studentService';
import { useAuth } from '../hooks/useAuth.jsx';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await studentService.getAllVendors();
        setVendors(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch vendors. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col"> {/* Ensure page fills screen and is a flex column */}
      <Header /> {/* Include Header */}
      <main className="flex-grow container mx-auto p-4 py-8"> {/* Main content area */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
        ) : (
          <div className="p-4">
            <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
              Welcome, {user?.name || 'Student'}! Start your order.
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Available Vendors</h2>
            {vendors.length === 0 ? (
              <p className="text-gray-600 text-center text-lg">No vendors available at the moment. Please check back later!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <VendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default StudentDashboardPage;
