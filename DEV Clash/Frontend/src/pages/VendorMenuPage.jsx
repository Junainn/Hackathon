import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const VendorMenuPage = () => {
  const { id } = useParams(); // Assuming you use react-router-dom's useParams
  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Full screen, column layout */}
      <Header /> {/* Include Header */}
      <main className="flex-grow container mx-auto p-4 py-8"> {/* Main content area */}
        <h1 className="text-3xl font-bold mb-4">Menu for Vendor ID: {id}</h1>
        <p>This page would display the menu items for the selected vendor.</p>
        <Link to="/student/dashboard" className="text-blue-600 hover:underline mt-4 block">Back to Vendors</Link>
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default VendorMenuPage;
