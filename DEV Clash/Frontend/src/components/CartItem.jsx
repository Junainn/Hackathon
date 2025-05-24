import React from 'react';
import Button from './Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
      <img src={item.item.imageUrl || 'https://via.placeholder.com/80'} alt={item.item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{item.item.name}</h3>
        <p className="text-gray-600">BDT {item.item.price} x {item.quantity}</p>
        <p className="text-blue-700 font-bold">Total: BDT {item.item.price * item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          onClick={() => onUpdateQuantity(item.item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="px-2 py-1 text-sm"
        >
          -
        </Button>
        <span className="font-semibold text-lg">{item.quantity}</span>
        <Button
          variant="secondary"
          onClick={() => onUpdateQuantity(item.item.id, item.quantity + 1)}
          className="px-2 py-1 text-sm"
        >
          +
        </Button>
        <Button
          variant="danger"
          onClick={() => onRemove(item.item.id)}
          className="px-2 py-1 text-sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
