import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  LineChart,
  UserCog
} from "lucide-react";
import ClothingLogo from "../assets/logo.jpg";

// Sidebar width constants
const OPEN_WIDTH = 200;
const COLLAPSED_WIDTH = 72;

// Old navItems (default admin menu)
const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { path: "/admin/clients", icon: Users, label: "Clients" },
  { path: "/admin/teams", icon: UserCheck, label: "Teams" },
  { path: "/admin/users", icon: UserCog, label: "Users" },
  { path: "/admin/track-orders", icon: LineChart, label: "Track Orders" },
];

// Separate Admin & Team Menus (new)
const adminNavItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { path: "/admin/track-orders", icon: LineChart, label: "Track Orders" },
  { path: "/admin/clients", icon: Users, label: "Clients" },
  { path: "/admin/teams", icon: UserCheck, label: "Teams" },
  { path: "/admin/users", icon: UserCog, label: "Users" },
];

const teamNavItems = [
  { path: "/team/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/team/orders", icon: ShoppingBag, label: "Orders" },
  { path: "/team/track-orders", icon: LineChart, label: "Track Orders" },
  { path: "/team/clients", icon: Users, label: "Clients" },
  
];

const NavBar = ({ isOpen, onToggle, user }) => {
  // Choose nav list based on user role (fallback to old navItems)
  const roleBasedNavItems =
    user?.role === "admin"
      ? adminNavItems
      : user?.role === "team"
      ? teamNavItems
      : navItems; 

  return (
    <>
      <motion.aside
        animate={{ width: isOpen ? OPEN_WIDTH : COLLAPSED_WIDTH }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed lg:static inset-y-0 left-0 bg-gray-100 border-r border-gray-200 shadow-md z-[60] flex flex-col overflow-hidden"
      >
        {/* Logo Section */}
        <div className="relative h-16 flex items-center justify-between px-3">
          <div
            className={`flex items-center ${
              isOpen ? "justify-start" : "justify-center w-full"
            } space-x-2`}
          >
            <img
              src={ClothingLogo}
              alt="Clothing CRM Logo"
              className="h-8 w-8 object-contain"
            />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-semibold text-gray-800 whitespace-nowrap"
                >
                  {/* Removed text, but could add if needed */}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col mt-2">
          <ul className="space-y-1 px-2">
            {roleBasedNavItems.map((item) => (
              <motion.li
                key={item.path}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#04203E] to-[#06345f] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={onToggle}
        initial={false}
        animate={{ left: isOpen ? OPEN_WIDTH - 10 : COLLAPSED_WIDTH - 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="fixed top-8 -translate-y-1/2 
             w-5 h-5 flex items-center justify-center
             shadow-lg border border-gray-300
             bg-gradient-to-r from-[#06345f] to-[#0a4b8e]
             hover:scale-105 transition-transform
             z-[9999] pointer-events-auto"
        aria-label="Toggle sidebar"
        style={{ left: isOpen ? OPEN_WIDTH : COLLAPSED_WIDTH }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5 text-white" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
};

export default NavBar;