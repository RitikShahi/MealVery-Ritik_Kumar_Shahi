import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from "../../../redux/ordersSlice"; // Adjust path as needed

function DeliveryPanel() {
  const orders = useSelector((state) => state.orders); // Global orders
  const dispatch = useDispatch();

  const handleAccept = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Accepted' }));
  };

  const handleReject = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Failed' }));
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Failed':
        return 'bg-red-400';
      case 'Accepted':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-blue-800">
        <h1 className="text-4xl font-extrabold">MealVery</h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Delivery Panel-Manage Orders</h2>
        {orders.map((order) => (
          <div key={order.id} className="p-6 mb-6 bg-blue-800 rounded-lg shadow-lg">
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
            <div className="mt-4 flex space-x-4">
              {order.status === 'Food Processing' && (
                <>
                  <button 
                    onClick={() => handleAccept(order.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Accept Order
                  </button>
                  <button 
                    onClick={() => handleReject(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Reject Order
                  </button>
                </>
              )}
              {order.status === 'Accepted' && (
                <p className="text-lg font-bold">Awaiting admin update</p>
              )}
            </div>
          </div>
        ))}
      </main>
      {/* Footer */}
      <footer className="p-4 text-center border-t border-blue-800">
        © 2025 Ritik Shahi
      </footer>
    </div>
  );
}

export default DeliveryPanel;
