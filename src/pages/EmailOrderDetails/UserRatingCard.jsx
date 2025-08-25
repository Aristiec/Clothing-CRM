import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const UserRatingCard = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    onSubmit?.({ rating, remark });
    console.log("Submitted:", { rating, remark });
    setRating(0);
    setRemark("");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full ">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🌟 Rate Your Experience</h2>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar
                size={30}
                className={`transition-colors duration-200 cursor-pointer ${
                  starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
        <span className="ml-3 text-gray-700 font-semibold">{rating} / 5</span>
      </div>

      {/* Remark Input */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
        rows={5}
        placeholder="Write your remarks..."
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default UserRatingCard;