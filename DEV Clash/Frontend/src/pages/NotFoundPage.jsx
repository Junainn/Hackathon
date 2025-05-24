import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    // Removed min-h-screen and flex/items/justify. MainLayout handles overall page structure.
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4"> {/* Approximate height to fill remaining space */}
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Page Not Found</p>
      <Link to="/" className="text-blue-600 hover:underline text-lg">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
