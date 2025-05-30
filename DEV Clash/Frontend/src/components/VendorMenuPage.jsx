import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import MenuItemCard from '../components/MenuItemCard';
import studentService from '../services/studentService';
import { useCart } from '../hooks/useCart.jsx';
import { MOCK_MENUS } from '../utils/constants'; // Import MOCK_MENUS for fallback/testing

const VendorMenuPage = () => {
  const { id: vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  // FIX: Add a console.log outside useEffect to confirm component rendering
  console.log('VendorMenuPage: Component rendered. Current vendorId from useParams:', vendorId);

  useEffect(() => {
    // FIX: Add early exit if vendorId is not available
    if (!vendorId) {
      setError('Vendor ID is missing from the URL.');
      setLoading(false);
      console.error('VendorMenuPage: No vendorId found in URL parameters.');
      return;
    }

    const fetchVendorData = async () => {
      setLoading(true);
      setError('');
      console.log('VendorMenuPage: Effect triggered for vendorId:', vendorId); // Debug log

      try {
        // Fetch all vendors to find the specific vendor's name
        const allVendors = await studentService.getAllVendors();
        const foundVendor = allVendors.find(v => v._id === vendorId);
        if (!foundVendor) {
          setError('Vendor not found.');
          setLoading(false);
          console.log('VendorMenuPage: Vendor not found for ID:', vendorId); // Debug log
          return;
        }
        setVendor(foundVendor);

        // Fetch menu for the specific vendor
        const menu = await studentService.getVendorMenu(vendorId);
        console.log('VendorMenuPage: Raw menu data from service:', menu); // Debug log
        if (Array.isArray(menu)) {
          setMenuItems(menu);
          console.log('VendorMenuPage: Successfully set menu items:', menu); // Debug log
        } else {
          setError('Menu data received is not an array.');
          console.error('VendorMenuPage: Menu data is not an array:', menu); // Error log
          setMenuItems([]); // Ensure it's an empty array if invalid
        }

      } catch (err) {
        setError(err.message || 'Failed to fetch vendor menu.');
        console.error('VendorMenuPage: Error fetching menu:', err); // Error log
        // Fallback to mock data if real API fails during testing
        if (MOCK_MENUS[vendorId]) {
          console.warn('Falling back to mock menu data for testing.');
          setMenuItems(MOCK_MENUS[vendorId]);
          setError('Failed to fetch real data, showing mock data.');
        } else {
          setMenuItems([]); // Ensure it's empty if no mock fallback
        }
      } finally {
        setLoading(false);
        console.log('VendorMenuPage: Loading finished. Final menuItems state:', menuItems); // Debug log
      }
    };
    fetchVendorData();
  }, [vendorId]); // Dependency array ensures effect runs when vendorId changes

  const handleAddToCart = (item) => {
    if (vendor) {
      addToCart(item, { _id: vendor._id, name: vendor.name });
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
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Menu for {vendor ? vendor.name : 'Vendor'}
            </h1>
            <Link to="/student/dashboard" className="text-blue-600 hover:underline mb-4 block">
              &larr; Back to Vendors
            </Link>

            {/* Display error if it exists AND there are no menu items */}
            {error && menuItems.length === 0 && (
              <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
            )}

            {/* Check menuItems.length to show "No items" message or render items */}
            {menuItems.length === 0 && !loading && !error ? ( // Show "No items" only if not loading and no error
              <p className="text-gray-600 text-center text-lg mt-8">No menu items available for this vendor yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  // Ensure key is unique and stable. Use _id from backend if available.
                  <MenuItemCard key={item._id || item.id} item={item} onAddToCart={handleAddToCart} />
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
