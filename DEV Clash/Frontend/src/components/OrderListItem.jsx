import React, { useState } from 'react';
import Button from './Button';
import { ORDER_STATUSES } from '../utils/constants';

const OrderListItem = ({ order, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    await onUpdateStatus(order._id, newStatus);
    setCurrentStatus(newStatus); // Update local state after successful update
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Order ID: {order._id}</h3>
          <p className="text-gray-600 text-sm">Customer: {order.user.name}</p>
          <p className="text-gray-600 text-sm">Ordered from: {order.vendor.name}</p>
          <p className="text-gray-600 text-sm">Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentStatus)}`}>
          {currentStatus}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {order.items.map((item, index) => (
            <li key={index} className="text-sm">
              {item.item.name} x {item.quantity} (BDT {item.item.price})
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right text-lg font-bold text-blue-700 mb-4">
        Total: BDT {order.totalPrice}
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        {ORDER_STATUSES.map(status => (
          <Button
            key={status}
            onClick={() => handleStatusChange(status)}
            variant={currentStatus === status ? 'primary' : 'secondary'}
            className="text-sm px-3 py-1"
            disabled={loading}
          >
            {loading && currentStatus === status ? 'Updating...' : status}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OrderListItem;
