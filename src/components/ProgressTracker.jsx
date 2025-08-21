import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useLocation } from "react-router-dom";
import { IoArrowBack, IoMail, IoLogoWhatsapp } from "react-icons/io5";
import { TbMessageFilled } from "react-icons/tb";
import { useSelector } from "react-redux";

const ProgressTracker = ({ userRole }) => {
  const { role,id } = useParams();
  const location = useLocation();

  // get "from" state passed via navigation
  const from = location.state?.from;

  // Grab the order from Redux
  const order = useSelector((state) =>
    state.orders.orders.find((o) => o.id === id)
  );

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">Order not found...</div>
    );
  }

  // Fixed workflow stages with descriptions
  const stages = [
    { name: "Designing", desc: "Creating sketches and selecting fabrics for the order." },
    { name: "Cutting", desc: "Fabric is cut into pieces based on design patterns." },
    { name: "Stitching", desc: "Stitching the fabric pieces together to form the garment." },
    { name: "Finishing", desc: "Adding final touches like buttons, zippers, and ironing." },
    { name: "Packaging", desc: "Garment is quality checked and neatly packed." },
    { name: "Delivery", desc: "Order is shipped or handed over to the client." },
  ];

  // Find current stage index
  const currentStageIndex = stages.findIndex((s) => s.name === order.stage);

  // Track notifications sent for each stage
  const [sentNotifications, setSentNotifications] = useState({});

  const sendNotification = (type, stageName) => {
    alert(`${type} notification sent to ${order.client} about ${stageName}!`);
    setSentNotifications((prev) => ({
      ...prev,
      [stageName]: type,
    }));
  };

  const resolvedRole = role || userRole;

  let backPath;
if (from === "orderDetails" || location.pathname.includes("/orders/")) {
  backPath = `/${resolvedRole}/orders/${id}`;
} else {
  backPath = `/${resolvedRole}/track-orders`;
}

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      {/* Header with Back button beside Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Link to={backPath} className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <IoArrowBack className="h-5 w-5 text-gray-600" />
            </motion.button>
          </Link>
          Progress Tracker - Order #{order.id}
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Client: <span className="font-semibold">{order.client}</span> | Product:{" "}
        {order.product} | Status: {order.status} | Due: {order.dueDate}
      </p>

      {/* Timeline */}
      <div className="relative border-l-4 border-red-200 space-y-6 w-full mt-6">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const selectedNotify = sentNotifications[stage.name];

          return (
            <div key={stage.name} className="relative w-full">
              {/* Circle */}
              <span
                className={`absolute left-8 top-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-amber-500 text-white animate-pulse"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {isCompleted ? "✔" : index + 1}
              </span>

              {/* Stage Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`max-w-3xl mx-auto w-full p-4 rounded-xl shadow-md border flex flex-col md:flex-row items-start justify-between gap-4 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-50 border-green-200"
                    : isCurrent
                    ? "bg-amber-50 border-amber-200 scale-105 shadow-lg ring-2 ring-amber-400"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {/* Left Section: Stage Info */}
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg ${
                      isCurrent ? "text-amber-700" : "text-gray-800"
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <p className="text-sm text-gray-600">{stage.desc}</p>
                  <p className="text-xs mt-1">
                    {isCurrent
                      ? "In Progress"
                      : isCompleted
                      ? "✔ Done"
                      : "Waiting..."}
                  </p>
                </div>

                {/* Right Section: Notify */}
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-gray-700 mb-2">Notify</p>
                  <div className="flex gap-3">
                    {/* SMS */}
                    <button
                      onClick={() => sendNotification("SMS", stage.name)}
                      title="Send SMS"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                        selectedNotify === "SMS"
                          ? "bg-blue-500 text-white border-blue-600 ring-2 ring-blue-400"
                          : "border-blue-400 text-blue-500 hover:bg-blue-100"
                      }`}
                    >
                      <TbMessageFilled className="w-4 h-4" />
                    </button>

                    {/* Email */}
                    <button
                      onClick={() => sendNotification("Email", stage.name)}
                      title="Send Email"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                        selectedNotify === "Email"
                          ? "bg-red-500 text-white border-red-600 ring-2 ring-red-400"
                          : "border-red-400 text-red-500 hover:bg-red-100"
                      }`}
                    >
                      <IoMail className="w-4 h-4" />
                    </button>

                    {/* WhatsApp */}
                    <button
                      onClick={() => sendNotification("WhatsApp", stage.name)}
                      title="Send WhatsApp"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                        selectedNotify === "WhatsApp"
                          ? "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-400"
                          : "border-emerald-400 text-emerald-500 hover:bg-emerald-100"
                      }`}
                    >
                      <IoLogoWhatsapp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
