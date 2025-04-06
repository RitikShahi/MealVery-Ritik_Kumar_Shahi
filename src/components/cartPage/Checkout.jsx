import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from "../../../redux/ordersSlice"; // Adjusted path

function Checkout() {
  const dispatch = useDispatch();
  // Retrieve the cart to extract the restaurant name
  const cart = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  // State to store the hotel name once the order is placed
  const [orderHotelName, setOrderHotelName] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    landmark: '',
    pincode: '',
    phone: '',
  });
  const [paymentOption, setPaymentOption] = useState('Credit Card');

  const handleInputChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (
      !deliveryDetails.address ||
      !deliveryDetails.landmark ||
      !deliveryDetails.pincode ||
      !deliveryDetails.phone
    ) {
      return;
    }
    // Extract the restaurant name from the cart.
    // Ensure that each cart item includes the property 'nameOfRes'
    const extractedHotelName =
      cart && cart.length > 0 && cart[0].nameOfRes
        ? cart[0].nameOfRes
        : "Unknown Hotel";
    // Save the extracted hotel name in state so that the modal can display it reliably
    setOrderHotelName(extractedHotelName);

    // Create the order object with a default status "Food Processing"
    const order = {
      id: Date.now(), // Unique order id
      hotelName: extractedHotelName, // Use the extracted hotel name
      deliveryDetails,
      paymentOption,
      status: "Food Processing"
    };
    // Dispatch the order to Redux
    dispatch(addOrder(order));
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1000);
  };

  const isFormValid =
    deliveryDetails.address &&
    deliveryDetails.landmark &&
    deliveryDetails.pincode &&
    deliveryDetails.phone;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Delivery Details
      </h2>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          name="address"
          value={deliveryDetails.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="landmark"
          value={deliveryDetails.landmark}
          onChange={handleInputChange}
          placeholder="Landmark"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="pincode"
          value={deliveryDetails.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          value={deliveryDetails.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h3 className="text-xl font-semibold mt-4 text-gray-700">
          Payment Option
        </h3>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Cash On Delivery">Cash On Delivery</option>
        </select>

        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={!isFormValid}
          className={`mt-4 p-3 rounded font-semibold text-white transition-colors duration-300 ${
            isFormValid ? 'bg-black hover:bg-gray-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Place Order
        </button>
      </form>

      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Modal content */}
          <div className="relative bg-green-200 border border-green-500 rounded-lg shadow-md text-center p-6 animate-fadeIn">
            <h4 className="text-2xl font-bold text-green-800">
              Order Confirmed!
            </h4>
            <p className="mt-2 text-green-700">
              Thank you for your order from {orderHotelName}. Your food is on the way!
            </p>
            <button
              onClick={() => setOrderPlaced(false)}
              className="mt-4 bg-green-800 text-white py-1 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
