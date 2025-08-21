import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <NavBar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          onLogout={onLogout}
        />

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
