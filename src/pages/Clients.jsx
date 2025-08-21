import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Eye,
  Edit,
  Calendar,
} from "lucide-react";

const Clients = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // optional if you want filters
  const navigate = useNavigate();

  const clients = useSelector((state) => state.clients.clients);

  const filteredClients = clients.filter((client) => {
    const q = searchTerm.toLowerCase();
    return (
      client.id.toLowerCase().includes(q) ||
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q) ||
      client.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500">Manage and track all clients</p>
        </div>

        {userRole === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/${userRole}/clients/add`)}
            className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Client</span>
          </motion.button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-40" /> {/* Name */}
            <col className="w-48" /> {/* Email */}
            <col className="w-36" /> {/* Phone */}
            <col /> {/* Address */}
            <col className="w-20" /> {/* Orders */}
            <col className="w-28" /> {/* Total Spent */}
            <col className="w-36" /> {/* Last Order */}
            <col className="w-24" /> {/* Actions */}
          </colgroup>

          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "Address",
                "Orders",
                "Total Spent",
                "Last Order",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase truncate"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.03 }}
                  className="group border-b last:border-b-0 hover:bg-gray-50/70"
                >
                  {/* Name */}
                  <td className="px-3 py-2 text-gray-800 font-medium truncate">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#06345f] shrink-0" />
                      <span className="truncate">{client.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-3 py-2 text-gray-700 truncate">
                    {client.email}
                  </td>

                  {/* Phone */}
                  <td className="px-3 py-2 text-gray-700 truncate">
                    {client.phone}
                  </td>

                  {/* Address */}
                  <td className="px-3 py-2 text-gray-600 truncate">
                    {client.address}
                  </td>

                  {/* Orders */}
                  <td className="px-3 py-2 text-center font-medium text-gray-800">
                    {client.orders}
                  </td>

                  {/* Total Spent */}
                  <td className="px-3 py-2 font-semibold text-gray-900">
                    {client.totalSpent}
                  </td>

                  {/* Last Order */}
                  <td className="px-3 py-2 text-gray-700 truncate">
                    {client.lastOrder}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      <Link to={`/${userRole}/clients/${client.id}`}>
                        <button className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>

                      {userRole === "admin" && (
                        <button className="p-1.5 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition">
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

export default Clients;
