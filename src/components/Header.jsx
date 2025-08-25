// export default Header;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

const Header = ({ onMenuClick, user, onLogout }) => {
  // ✅ Correct path
  const notifications = useSelector((state) => state.notifications.notifications) || [];
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-100 shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6 relative"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Clothing CRM</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 relative">
          {/* Bell with Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </motion.button>

            {/* Dropdown Panel */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-3 border-b font-semibold text-gray-700 flex justify-between">
                    Notifications
                    <span className="text-xs text-gray-500">
                      {notifications.length} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-gray-500 text-sm text-center">
                        No notifications yet
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {n.stage}
                          </p>
                          <p className="text-xs text-gray-600">{n.message}</p>
                          {n.nextStage && (
                            <p className="text-xs text-gray-600">
                              Next Stage: <span className="font-semibold">{n.nextStage}</span>
                            </p>
                          )}
                          <p className="text-xs text-gray-400">{n.timestamp}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="w-8 h-8 bg-gradient-to-br from-[#04203E] to-[#06345f] rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
