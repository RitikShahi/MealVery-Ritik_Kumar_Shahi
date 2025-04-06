import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

function AddPaymentMethod({ closeAddPaymentModal }) {
  const [cardDetails, setCardDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation: ensure all fields are filled
    if (
      !cardDetails.cardHolder ||
      !cardDetails.cardNumber ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all fields.");
      return;
    }
    // Simulate an API call with a 1-second delay
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="relative max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      {submitted ? (
        // Show "Card Added!" message with close button
        <>
          <RxCross2
            size={28}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeAddPaymentModal}
          />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-700">Card Added!</h2>
            <p className="mt-4 text-green-600">
              Your payment method has been saved successfully.
            </p>
          </div>
        </>
      ) : (
        // Show the form to add a card
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Add Payment Method
          </h2>
          <input
            type="text"
            name="cardHolder"
            value={cardDetails.cardHolder}
            onChange={handleInputChange}
            placeholder="Card Holder Name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              placeholder="Expiry (MM/YY)"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2"
            />
            <input
              type="password"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors"
          >
            Save Card
          </button>
        </form>
      )}
    </div>
  );
}

export default AddPaymentMethod;
