import React from "react";

const OrderLocationCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full ">
      {/* Card Heading */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">📍 Order Location</h2>

      {/* Map Container */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <iframe
          title="Order Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.05530152056!2d77.06889965120523!3d28.527280599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03f53f5b2b37%3A0x7d1f0e8c299df2a0!2sDelhi%2C%20India!5e0!3m2!1sen!2sus!4v1692730223087!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default OrderLocationCard;