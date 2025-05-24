import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MenuItemCard from '../components/MenuItemCart.jsx';
import studentService from './studentService.js';
import { useCart } from '../hooks/useCart.jsx';
import { MOCK_MENUS } from '../utils/constants.js'; // Import MOCK_MENUS for fallback/testing

const VendorMenuPage = () => {
  const { id: vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchVendorData = async () => {
      setLoading(true);
      setError('');
      console.log('VendorMenuPage: Fetching menu for vendorId:', vendorId); // Debug log

      try {
        // Fetch all vendors to find the specific vendor's name
        const allVendors = await studentService.getAllVendors();
        const foundVendor = allVendors.find(v => v._id === vendorId);
        if (!foundVendor) {
          setError('Vendor not found.');
          setLoading(false);
          return;
        }
        setVendor(foundVendor); // Set the found vendor object

        // Fetch menu for the specific vendor
        const menu = await studentService.getVendorMenu(vendorId);
        setMenuItems(menu);
        console.log('VendorMenuPage: Fetched menu items:', menu); // Debug log
      } catch (err) {
        setError(err.message || 'Failed to fetch vendor menu.');
        console.error('VendorMenuPage: Error fetching menu:', err); // Debug log
        // Fallback to mock data if real API fails during testing
        // This part can be removed once backend is stable
        if (MOCK_MENUS[vendorId]) {
          console.warn('Falling back to mock menu data for testing.');
          setMenuItems(MOCK_MENUS[vendorId]);
          setError('Failed to fetch real data, showing mock data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVendorData();
  }, [vendorId]);

  const handleAddToCart = (item) => {
    // FIX: Ensure vendor object passed to cart has _id and name consistent with how it's stored in cart
    if (vendor) {
      addToCart(item, { _id: vendor._id, name: vendor.name }); // Use vendor._id and name
      alert(`${item.name} added to cart!`);
    } else {
      alert("Cannot add to cart: Vendor information missing.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error && !menuItems.length ? ( // Only show error if no menu items loaded
          <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Menu for {vendor ? vendor.name : 'Vendor'}
            </h1>
            <Link to="/student/dashboard" className="text-blue-600 hover:underline mb-4 block">
              &larr; Back to Vendors
            </Link>

            {menuItems.length === 0 ? (
              <p className="text-gray-600 text-center text-lg mt-8">No menu items available for this vendor yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  // FIX: Use item._id for key if backend uses _id, otherwise item.id
                  // Assuming backend MenuItem model uses _id as primary key
                  <MenuItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VendorMenuPage;
