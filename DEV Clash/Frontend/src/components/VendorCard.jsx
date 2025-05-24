import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; // Adjusted path

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{vendor.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {vendor.status === 'Open' ? (
            <span className="text-green-600 font-semibold">Open Now</span>
          ) : (
            <span className="text-red-600 font-semibold">Closed</span>
          )}
        </p>
        <p className="text-gray-700 mb-4 text-sm">{vendor.description || 'No description available.'}</p>
        <Link to={`/vendors/${vendor._id}`}>
          <Button variant="primary" className="w-full">
            View Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
