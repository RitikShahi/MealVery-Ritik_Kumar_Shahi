import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from "../../../redux/ordersSlice"; // Adjust path as needed

function AdminPanel() {
  const orders = useSelector((state) => state.orders); // Global orders from all users
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const adminMembers = [
    "Ritik Kumar Shahi",
    "Pratyush Kumar",
    "Rishabh Verma",
    "Kshitij Shende",
    "Yuvansh Chauhan"
  ];

  const handleMarkOutForDelivery = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Out For Delivery' }));
  };

  const handleMarkDelivered = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Delivered' }));
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Failed':
        return 'bg-red-500';
      case 'Out For Delivery':
        return 'bg-blue-500';
      case 'Accepted':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-orange-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-orange-800">
        <h1 className="text-4xl font-extrabold">MealVery</h1>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 bg-orange-800 rounded shadow hover:bg-orange-700 transition"
          >
            Admin Panel Members
          </button>
          {showDropdown && (
            <ul className="absolute right-0 mt-2 w-56 bg-orange-800 rounded shadow-lg">
              {adminMembers.map((member, index) => (
                <li key={index} className="px-4 py-2 border-b border-orange-700 last:border-0">
                  {member}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Admin Panel - Order Management</h2>
        {orders.map((order) => (
          <div key={order.id} className="p-6 mb-6 bg-orange-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Order #{order.id}</h3>
              <span className={`px-4 py-2 rounded-full text-lg font-bold ${getStatusBadgeClasses(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-4 text-xl"><strong>Hotel:</strong> {order.hotelName}</p>
            <p className="mt-2 text-lg">
              <strong>Address:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.landmark}, {order.deliveryDetails.pincode}
            </p>
            <p className="mt-2 text-lg"><strong>Phone:</strong> {order.deliveryDetails.phone}</p>
            <p className="mt-2 text-lg"><strong>Payment:</strong> {order.paymentOption}</p>
            <div className="mt-4 space-x-4">
              {order.status === 'Accepted' && (
                <>
                  <button 
                    onClick={() => handleMarkOutForDelivery(order.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Mark Out For Delivery
                  </button>
                  <button 
                    onClick={() => handleMarkDelivered(order.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Mark Delivered
                  </button>
                </>
              )}
              {order.status === 'Out For Delivery' && (
                <button 
                  onClick={() => handleMarkDelivered(order.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center border-t border-orange-800">
        © 2025 Ritik Shahi
      </footer>
    </div>
  );
}

export default AdminPanel;
