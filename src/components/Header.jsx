import React from "react";
import { motion } from "framer-motion";
import { Menu, Bell, User, LogOut } from "lucide-react";

const Header = ({ onMenuClick, user, onLogout }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-100 shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu toggle */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {/* {user?.role === "admin" ? "Admin" : "Team"} */}
              Clothing CRM
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </motion.button>

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
