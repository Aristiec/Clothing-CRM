import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useLocation } from "react-router-dom";
import { IoArrowBack, IoMail, IoLogoWhatsapp } from "react-icons/io5";
import { TbMessageFilled } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../redux/notificationsSlice";
import { Bell } from "lucide-react";

const ProgressTracker = ({ userRole }) => {
  const { role, id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

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
    {
      name: "Designing",
      desc: "Creating sketches and selecting fabrics for the order.",
    },
    {
      name: "Cutting",
      desc: "Fabric is cut into pieces based on design patterns.",
    },
    {
      name: "Stitching",
      desc: "Stitching the fabric pieces together to form the garment.",
    },
    {
      name: "Finishing",
      desc: "Adding final touches like buttons, zippers, and ironing.",
    },
    {
      name: "Packaging",
      desc: "Garment is quality checked and neatly packed.",
    },
    {
      name: "Delivery",
      desc: "Order is shipped or handed over to the client.",
    },
  ];

  // Find current stage index
  const currentStageIndex = stages.findIndex((s) => s.name === order.stage);

  // Track notifications sent for each stage
  const [sentNotifications, setSentNotifications] = useState({});

  // Modals
  const [modalData, setModalData] = useState(null);
  const [emailModalData, setEmailModalData] = useState(null);

  // Email form state
  const [emailForm, setEmailForm] = useState({
    subject: "",
    description: "",
  });

  // Send notification
  const sendNotification = (type, stageName, index) => {
    const currentStatus = stages[index].name;
    const nextStatus =
      index + 1 < stages.length ? stages[index + 1].name : "Completed";

    if (type === "Email") {
      setEmailModalData({ currentStatus, nextStatus, stageName });
    } else {
      const message = `${type} sent to ${order.client}. Current: ${currentStatus}, Next: ${nextStatus}`;
      setModalData({ type, currentStatus, nextStatus, message });
    }
  };

  // Autofill email subject & body
 useEffect(() => {
  if (emailModalData) {
    setEmailForm({
      subject: `Your order #${order.id} is now in ${emailModalData.currentStatus}`,
      description: `Hello ${order.client},

Your order (${order.product}) is currently in the "${emailModalData.currentStatus}" stage. Next, it will move to "${emailModalData.nextStatus}".

Estimated delivery date: ${order.dueDate}.

Track your order: https://yourstore.com/track/${order.id}

Thank you for shopping with us!
- Fashion Store Team`,
    });
  }
}, [emailModalData, order]);

  const resolvedRole = role || userRole;

  let backPath;
  if (from === "orderDetails" || location.pathname.includes("/orders/")) {
    backPath = `/${resolvedRole}/orders/${id}`;
  } else {
    backPath = `/${resolvedRole}/track-orders`;
  }

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      {/* Header */}
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
                {/* Stage Info */}
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

                {/* Notify Buttons */}
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-gray-700 mb-2">Notify</p>
                  <div className="flex gap-3">
                    {/* SMS */}
                    <button
                      disabled={
                        !(resolvedRole === "admin"
                          ? index <= currentStageIndex
                          : isCurrent)
                      }
                      onClick={() => sendNotification("SMS", stage.name, index)}
                      title="Send SMS"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all
                        ${
                          !(resolvedRole === "admin"
                            ? index <= currentStageIndex
                            : isCurrent)
                            ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                            : selectedNotify === "SMS"
                            ? "bg-black-500 text-white border-black-300 ring-2 ring-black-300"
                            : "border-black-300 text-black-300 hover:bg-black-100"
                        }`}
                    >
                      <TbMessageFilled className="w-4 h-4" />
                    </button>

                    {/* Email */}
                    <button
                      disabled={
                        !(resolvedRole === "admin"
                          ? index <= currentStageIndex
                          : isCurrent)
                      }
                      onClick={() =>
                        sendNotification("Email", stage.name, index)
                      }
                      title="Send Email"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all
                        ${
                          !(resolvedRole === "admin"
                            ? index <= currentStageIndex
                            : isCurrent)
                            ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                            : selectedNotify === "Email"
                            ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400"
                            : "border-blue-400 text-blue-600 hover:bg-blue-100"
                        }`}
                    >
                      <IoMail className="w-4 h-4" />
                    </button>

                    {/* WhatsApp */}
                    <button
                      disabled={
                        !(resolvedRole === "admin"
                          ? index <= currentStageIndex
                          : isCurrent)
                      }
                      onClick={() =>
                        sendNotification("WhatsApp", stage.name, index)
                      }
                      title="Send WhatsApp"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all
                        ${
                          !(resolvedRole === "admin"
                            ? index <= currentStageIndex
                            : isCurrent)
                            ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                            : selectedNotify === "WhatsApp"
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

      {/* Email Modal (single, outside the loop) */}
{emailModalData && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      onClick={() => setEmailModalData(null)}
    ></div>

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden z-10 flex flex-col"
    >
      {/* Header Section - Order & Client Details */}
      <div className="bg-white border-b p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100">
              <IoMail className="w-3 h-3 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-blue-600">Send Email</h3>
          </div>
          <button
            onClick={() => setEmailModalData(null)}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          >
            ×
          </button>
        </div>
        
        {/* Order Details */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="space-y-1">
            <div>
              <p className="text-gray-500 text-xs">Order ID</p>
              <p className="font-semibold">#{order.id}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Product</p>
              <p className="truncate">{order.product}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <p className="text-gray-500 text-xs">Client</p>
              <p className="truncate">{order.client}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Due Date</p>
              <p>{order.dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Email Form */}
      <div className="flex-1 p-5 overflow-y-auto">
        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={emailForm.subject}
            onChange={(e) =>
              setEmailForm({ ...emailForm, subject: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-colors"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="6"
            value={emailForm.description}
            onChange={(e) =>
              setEmailForm({ ...emailForm, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none transition-colors"
          />
        </div>
      </div>

      {/* Footer Section - Progress Stages */}
      <div className="border-t bg-gray-50 p-3">
        <p className="text-xs text-gray-600 mb-2">Progress</p>
        
        {/* Compact Horizontal Progress */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-200"></div>
          <div 
            className="absolute top-3 left-3 h-0.5 bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          ></div>
          
          {/* Stage Indicators */}
          <div className="flex justify-between items-center relative">
            {stages.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage.name} className="flex flex-col items-center min-w-0">
                  {/* Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "bg-blue-500 text-white animate-pulse"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  
                  {/* Stage Name */}
                  <p 
                    className={`text-xs mt-1 text-center leading-tight ${
                      isCurrent ? "font-semibold text-blue-600" : "text-gray-500"
                    }`}
                    style={{ maxWidth: '60px' }}
                  >
                    {stage.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setEmailModalData(null)}
            className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(
                addNotification({
                  orderId: order.id,
                  client: order.client,
                  stage: emailModalData.currentStatus,
                  type: "Email",
                  message: `Email sent to ${order.client}`,
                  timestamp: new Date().toISOString(),
                })
              );

              setSentNotifications((prev) => ({
                ...prev,
                [emailModalData.currentStatus]: "Email",
              }));

              setEmailModalData(null);
              setEmailForm({ subject: "", description: "" });
            }}
            className="px-4 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <IoMail className="w-3 h-3" />
            Send
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}


      {/* Generic Notification Modal */}
      {modalData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 z-10"
          >
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner">
                <Bell className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Send Notification
                </h3>
                <p className="text-sm text-gray-500">
                  Confirm before sending update to client
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Client:</span> {order.client}
              </p>
              <p>
                <span className="font-semibold">Order ID:</span> #{order.id}
              </p>
              <p>
                <span className="font-semibold">Product:</span> {order.product}
              </p>
              <p>
                <span className="font-semibold">Channel:</span>{" "}
                <span className="px-2 py-1 rounded-lg bg-gray-100 text-sm font-medium">
                  {modalData.type}
                </span>
              </p>
              <p className="bg-gray-50 border rounded-lg p-3 text-sm">
                <span className="font-semibold">Current Stage:</span>{" "}
                {modalData.currentStatus} <span className="mx-2">➡</span>{" "}
                <span className="font-semibold">Next Stage:</span>{" "}
                {modalData.nextStatus}
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setModalData(null)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(
                    addNotification({
                      orderId: order.id,
                      client: order.client,
                      stage: modalData.currentStatus,
                      type: modalData.type,
                      message: modalData.message,
                      timestamp: new Date().toISOString(),
                    })
                  );

                  setSentNotifications((prev) => ({
                    ...prev,
                    [modalData.currentStatus]: modalData.type,
                  }));

                  setModalData(null);
                }}
                className="px-6 py-2 rounded-lg bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTracker;
