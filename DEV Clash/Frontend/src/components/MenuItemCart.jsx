import React from 'react';
import Button from './Button';

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* FIX: Changed item.imageUrl to item.image to match backend response */}
      <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-blue-700 text-lg font-bold">BDT {item.price}</span>
          <Button onClick={() => onAddToCart(item)} variant="primary" className="text-sm px-3 py-1">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
