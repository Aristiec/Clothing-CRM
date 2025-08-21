import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Plus,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BannerImage from "../assets/banner.jpg";

const AdminDashboard = ({ userRole }) => {
  // Fetch orders from Redux store
  const orders = useSelector((state) => state.orders.orders);

  const navigate = useNavigate();

  // Compute stats dynamically
  const stats = [
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: orders.length,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      icon: Clock,
      label: "In Progress",
      value: orders.filter((o) => o.status === "In Progress").length,
      color: "bg-amber-500",
      change: "+8%",
    },
    {
      icon: AlertTriangle,
      label: "Delayed",
      value: orders.filter((o) => o.status === "Delayed").length,
      color: "bg-red-500",
      change: "-3%",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: orders.filter((o) => o.status === "Completed").length,
      color: "bg-green-500",
      change: "+18%",
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
        <div className="relative z-10 md:w-1/2 ">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-gray-900">
            Fashion Production Hub
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl">
            Streamline your fashion business with{" "}
            <span className="text-[#06345f] font-semibold">
              powerful management tools
            </span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/admin/orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#81D4FA] transition-all flex items-center space-x-2 shadow-md"
              >
                <Plus className="h-5 w-5" />
                <span>Add Order</span>
              </motion.button>
            </Link>

            <Link to="/admin/clients">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#06345f] to-[#04203E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-md"
              >
                <Users className="h-5 w-5" />
                <span>Add Client</span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-end h-45">
          <img
            src={BannerImage} 
            alt="Hero"
            className="w-full max-w-sm rounded-xl"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
          >
            {/* Header Row: Icon + Label */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>

            {/* Number Value */}
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
              {stat.value}
            </h3>

            {/* Footer Row: Change Indicator */}
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#04203E] to-[#06345f] rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{order.id}</h4>
                    <p className="text-sm text-gray-500">
                      {order.client} • {order.product}
                    </p>
                    <p className="text-xs text-gray-400">
                      Assigned: {order.assignedTeamMember} • Priority:{" "}
                      {order.priority}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{order.dueDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
