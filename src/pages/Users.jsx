import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Search, Eye, Edit, X, UserCog } from "lucide-react";
import { addUser } from "../redux/userSlice";

const Users = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const users = useSelector((state) => state.users?.users || []);
  const dispatch = useDispatch();

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add User Modal
  const AddUserModal = () => (
    <AnimatePresence>
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                dispatch(
                  addUser({
                    id: `USER-${Date.now()}`,
                    email: formData.get("email"),
                    password: formData.get("password"),
                    role: formData.get("role"),
                    createdAt: new Date().toISOString(),
                    status: "active",
                  })
                );
                setShowAddModal(false);
                e.target.reset();
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                required
                minLength={6}
              />
              <select
                name="role"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
                <option value="team">Team Member</option>
              </select>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#04203E] to-[#06345f] text-white rounded-lg hover:from-[#06345f] hover:to-[#04203E] transition-all"
                >
                  Create User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "subadmin":
        return "bg-blue-100 text-blue-800";
      case "team":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatRole = (role) => {
    switch (role) {
      case "subadmin":
        return "Sub Admin";
      case "team":
        return "Team Member";
      default:
        return role?.charAt(0).toUpperCase() + role?.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage system users and permissions</p>
        </div>

        {userRole === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add User</span>
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
              placeholder="Search users by email or role..."
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
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase w-2/5">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/5">
                Role
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/5">
                Created Date
              </th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 tracking-wide uppercase w-1/5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.03 }}
                  className="group border-b last:border-b-0 hover:bg-gray-50/70"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {formatRole(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                        <Eye className="h-4 w-4" />
                      </button>
                      {userRole === "admin" && (
                        <button className="p-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition">
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal />
    </div>
  );
};

export default Users;
