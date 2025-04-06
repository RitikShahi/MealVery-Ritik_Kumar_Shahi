import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

function ReferFriends({ closeReferModal }) {
  const link = "https://github.com/RitikShahi/MealVery-Food-Ordering-System";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeReferModal}
      ></div>
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full z-10">
        {/* Close Button */}
        <RxCross2
          size={28}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={closeReferModal}
        />
        <h2 className="text-2xl font-bold text-center mb-4">Refer Friends</h2>
        <p className="text-center text-gray-700 mb-6">
          Copy the link below and share it with your friends!
        </p>
        <div className="flex items-center justify-center bg-gray-100 p-3 rounded-md mb-6">
          <code className="text-sm text-gray-800 break-all">{link}</code>
        </div>
        <button
          onClick={handleCopy}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors"
        >
          Copy Link
        </button>
      </div>
    </motion.div>
  );
}

export default ReferFriends;
