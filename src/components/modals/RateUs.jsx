import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';

function RateUs({ closeRateUsModal, submitReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting your review.");
      return;
    }
    // Optionally call a submission callback with rating and review.
    if (submitReview) {
      submitReview({ rating, review });
    }
    // After 1 second, display "Thank you" message.
    setTimeout(() => {
      setSubmitted(true);
      // Automatically close the modal after showing the thank you message for 2 seconds.
      setTimeout(() => {
        closeRateUsModal();
      }, 2000);
    }, 1000);
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
        onClick={closeRateUsModal}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full z-10">
        {/* Close Button */}
        <RxCross2
          size={28}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={closeRateUsModal}
        />
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Rate Us</h2>
            
            {/* Star Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      className="hidden"
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      size={32}
                      className={`cursor-pointer transition-colors duration-200 ${
                        ratingValue <= (hover || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            
            {/* Review Textarea */}
            <textarea
              className="w-full border border-gray-300 rounded p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
            
            {/* Submit Button */}
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-green-700">Thank You!</h2>
            <p className="mt-4 text-green-600">We appreciate your feedback.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RateUs;
