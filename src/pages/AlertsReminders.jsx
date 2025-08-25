import React from "react";
import { motion } from "framer-motion";
import { BellRing, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const alertsData = [
  {
    id: 1,
    title: "Survey Approval Pending",
    description: "Your new survey is awaiting admin approval.",
    date: "Aug 25, 2025",
    status: "pending",
  },
  {
    id: 2,
    title: "Reward Distribution",
    description: "Distribute rewards for the completed survey.",
    date: "Aug 28, 2025",
    status: "reminder",
  },
  {
    id: 3,
    title: "Monthly Report",
    description: "Prepare and submit the monthly performance report.",
    date: "Sep 01, 2025",
    status: "upcoming",
  },
  {
    id: 4,
    title: "System Update Completed",
    description: "The backend system update was successfully deployed.",
    date: "Aug 20, 2025",
    status: "done",
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
    case "reminder":
      return <BellRing className="text-blue-500 w-5 h-5" />;
    case "upcoming":
      return <Clock className="text-purple-500 w-5 h-5" />;
    case "done":
      return <CheckCircle className="text-green-500 w-5 h-5" />;
    default:
      return null;
  }
};

const AlertsReminders = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex items-center gap-2">
          <BellRing className="h-7 w-7 text-[#06345f]" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alerts & Reminders</h1>
            <p className="text-gray-500">Stay updated with your latest tasks</p>
          </div>
        </div>
      </div>

      {/* Alerts Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        {alertsData.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-4 border-b border-gray-100 last:border-none pb-4 last:pb-0"
          >
            <div className="mt-1">{getStatusIcon(alert.status)}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {alert.title}
              </h3>
              <p className="text-gray-600 text-sm">{alert.description}</p>
              <p className="text-gray-400 text-xs mt-1">Due: {alert.date}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AlertsReminders;
