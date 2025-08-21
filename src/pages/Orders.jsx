import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Plus,
  Search,
  Filter,
  ShoppingBag,
  Calendar,
  Eye,
  Edit,
  X,
} from "lucide-react";

const Orders = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  // const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orders.orders);

  const filteredOrders = orders.filter((order) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(q) ||
      order.product.toLowerCase().includes(q);
    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 ">Manage and track all orders</p>
        </div>

        {userRole === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/${userRole}/orders/addform`)}
            className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Order</span>
          </motion.button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-36" /> {/* Order ID */}
            <col /> {/* Product */}
            <col className="w-32" /> {/* Stage */}
            <col className="w-28" /> {/* Priority */}
            <col className="w-32" /> {/* Status */}
            <col className="w-40" /> {/* Due Date */}
            <col className="w-28" /> {/* Actions */}
          </colgroup>

          <thead className="bg-gray-50">
            <tr>
              {[
                "Order ID",
                "Product",
                "Stage",
                "Priority",
                "Status",
                "Due Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.03 }}
                  className="group border-b last:border-b-0 hover:bg-gray-50/70 cursor-pointer"
                  onClick={() => navigate(`/${userRole}/orders/${order.id}`)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-[#06345f]" />
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                    {order.product}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-blue-600">
                    {order.stage}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        order.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : order.priority === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        order.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Delayed"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{order.dueDate}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className="flex justify-start gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to={`/${userRole}/orders/${order.id}`}>
                        <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>

                      {userRole === "admin" && (
                        <button className="p-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition">
                          <Edit className="h-4 w-4" />
                        </button>
                       )} 
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
