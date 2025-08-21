import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TeamBanner from "../assets/teambanner.jpg";

const TeamDashboard = () => {
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();

  // Compute stats dynamically for the team
  const stats = [
    {
      icon: ShoppingBag,
      label: "Assigned Orders",
      value: orders.length,
      color: "bg-blue-500",
      change: "+5%",
    },
    {
      icon: Clock,
      label: "In Progress",
      value: orders.filter((o) => o.status === "In Progress").length,
      color: "bg-amber-500",
      change: "+2%",
    },
    {
      icon: CheckCircle,
      label: "Completed Today",
      value: orders.filter(
        (o) =>
          o.status === "Completed" &&
          new Date(o.completedDate).toDateString() ===
            new Date().toDateString()
      ).length,
      color: "bg-green-500",
      change: "+1%",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Order Completed",
      details: "ORD-004 - Party Dress",
      time: "2 hours ago",
      color: "text-green-600",
    },
    {
      id: 2,
      action: "New Order Assigned",
      details: "ORD-010 - Formal Shirt",
      time: "5 hours ago",
      color: "text-blue-600",
    },
    {
      id: 3,
      action: "Stage Updated",
      details: "ORD-007 - Suit (Cutting → Stitching)",
      time: "Yesterday",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center md:items-start justify-between relative overflow-hidden"
      >
        {/* Left Text Section */}
        <div className="relative z-10 md:w-1/2">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-gray-900">
            Team Workspace
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl">
            Stay on top of your{" "}
            <span className="text-[#06345f] font-semibold">
              assigned tasks
            </span>{" "}
            and deliver efficiently.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/team/orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-md"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>View Orders</span>
              </motion.button>
            </Link>
            <Link to="/team/members">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#06345f] to-[#04203E] text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-md"
              >
                <Users className="h-5 w-5" />
                <span>Team Members</span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-end h-45">
          <img
            src={TeamBanner}
            alt="Hero"
            className="w-full max-w-sm rounded-xl"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
              {stat.value}
            </h3>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assigned Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Assigned Orders
          </h2>
          <Link
            to="/team/orders"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>

        <div className="p-6 space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => navigate(`/team/orders/${order.id}`)}
            >
              <div>
                <h4 className="font-semibold text-gray-900">{order.id}</h4>
                <p className="text-sm text-gray-500">
                  {order.client} • {order.product}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  Stage: {order.stage}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : order.priority === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.priority}
                </span>
                <div className="flex items-center space-x-1 text-gray-500 text-xs mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{order.dueDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Recent Activity
          </h2>
          <Link
            to="/team/dashboard"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            View More
          </Link>
        </div>
        <div className="p-6 space-y-3">
          {recentActivity.map((act) => (
            <div
              key={act.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-sm"
            >
              <div>
                <p className="font-medium">{act.action}</p>
                <p className="text-gray-500">{act.details}</p>
              </div>
              <span className={act.color}>{act.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TeamDashboard;
