import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RateUs from "../modals/RateUs"; // Adjust path if needed
import AddPaymentMethod from "../modals/AddPaymentMethod"; // Adjust path if needed
import ReferFriends from "../modals/ReferFriends"; // Adjust path if needed

function LoginUserSlider({ closeSignInModel, logoutUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showRateUs, setShowRateUs] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showReferFriends, setShowReferFriends] = useState(false);

  const variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://github.com/RitikShahi/MealVery-Food-Ordering-System");
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <>
      <motion.div
        className="absolute right-0 top-0 w-[30%] h-screen bg-gradient-to-b from-green-600 to-green-800 py-8 px-10 rounded-l-3xl shadow-2xl text-white overflow-y-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <RxCross2
          onClick={closeSignInModel}
          size={32}
          color="white"
          cursor="pointer"
          className="absolute top-6 right-6"
        />

        {/* User Info */}
        <div className="flex flex-col items-center mt-12">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            src={user?.userInfo?.img}
            alt="User Avatar"
          />
          <h3 className="mt-4 text-3xl font-bold">{user?.userInfo?.name}</h3>
          <p className="mt-2 text-sm text-gray-200">
            Hi There ! <strong>Foodie</strong> 😄
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 space-y-5">
          <button
            className="w-full py-3 px-4 rounded-full bg-white text-green-800 font-semibold shadow hover:bg-gray-100 transition"
            onClick={() => navigate('/past-orders')}
          >
            View Past Orders
          </button>
          <button
            className="w-full py-3 px-4 rounded-full bg-white text-green-800 font-semibold shadow hover:bg-gray-100 transition"
            onClick={() => setShowRateUs(true)}
          >
            Rate Us
          </button>
          <button
            className="w-full py-3 px-4 rounded-full bg-white text-green-800 font-semibold shadow hover:bg-gray-100 transition"
            onClick={() => setShowAddPayment(true)}
          >
            Add Payment Method
          </button>
          <button
            className="w-full py-3 px-4 rounded-full bg-white text-green-800 font-semibold shadow hover:bg-gray-100 transition"
            onClick={() => setShowReferFriends(true)}
          >
            Refer Friends
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="w-full mt-16 py-3 rounded-full bg-red-500 text-white font-bold shadow hover:bg-red-600 transition"
          onClick={logoutUser}
        >
          LOGOUT
        </button>
      </motion.div>

      {/* Conditionally Render the RateUs Modal */}
      {showRateUs && (
        <RateUs
          closeRateUsModal={() => setShowRateUs(false)}
          submitReview={(data) => {
            console.log("Review submitted:", data);
            // Optionally, update your state or make an API call here.
          }}
        />
      )}

      {/* Conditionally Render the AddPaymentMethod Modal */}
      {showAddPayment && (
        <AddPaymentMethod
          closeAddPaymentModal={() => setShowAddPayment(false)}
          // Optionally, handle saved card details here.
        />
      )}

      {/* Conditionally Render the ReferFriends Modal */}
      {showReferFriends && (
        <ReferFriends
          closeReferModal={() => setShowReferFriends(false)}
        />
      )}
    </>
  );
}

export default LoginUserSlider;
