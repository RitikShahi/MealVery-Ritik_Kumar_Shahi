import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrder } from "../../../redux/ordersSlice"; // Adjust path based on your structure

function ViewPastOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700">No Past Orders</h2>
        <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
      </div>
    );
  }

  // Function to determine badge styling based on order status
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-200 text-green-800';
      case 'Failed':
        return 'bg-red-200 text-red-800';
      case 'Out For Delivery':
        return 'bg-blue-200 text-blue-800';
      case 'Accepted':
        return 'bg-yellow-200 text-yellow-800';
      case 'Food Processing':
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Past Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded shadow-md bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">Order #{order.id}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusBadgeClasses(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-2 text-gray-600">
              <strong>Hotel:</strong> {order.hotelName}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Delivery Address:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.landmark}, {order.deliveryDetails.pincode}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Phone:</strong> {order.deliveryDetails.phone}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Payment Option:</strong> {order.paymentOption}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => dispatch(removeOrder(order.id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPastOrders;
