import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const TrackOrders = ({ userRole }) => {
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders by search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Track Your Orders</h1>
          <p className="text-gray-500">See your orders and track their current progress</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/4">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/2">
                Order Name
              </th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/4">
                Track
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.03 }}
                  className="group border-b last:border-b-0 hover:bg-gray-50/70"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {order.product}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/${userRole}/track-orders/${order.id}/progress`, {
                          state: { from: "trackOrders" },
                        })
                      }
                      className="text-amber-600 hover:text-amber-800 hover:underline text-sm font-medium transition-colors"
                    >
                      View Progress
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackOrders;