import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; //   import SignUp page
import Layout from "./layouts/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import TeamDashboard from "./pages/TeamDashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Clients from "./pages/Clients";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import AddOrderForm from "./components/AddOrderForm";
import AddClientForm from "./components/AddClientForm";
import AddTeamForm from "./components/AddTeamForm";
import ProgressTracker from "./components/ProgressTracker";
import TrackOrders from "./pages/TrackOrders";
import Users from "./pages/Users";
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));

    // redirect to role dashboard
    if (userData.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/team/dashboard", { replace: true });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUp />} /> {/*   New SignUp route */}
      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          {/* Root redirect based on role */}
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/team/dashboard" replace />
              )
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<Orders userRole="admin" />} />
          <Route path="/admin/orders/addform" element={<AddOrderForm />} />
          <Route
            path="/admin/orders/:id"
            element={<OrderDetails userRole="admin" />}
          />
          <Route
            path="/admin/orders/:id/progress"
            element={<ProgressTracker userRole="admin" />}
          />
          <Route
            path="/:role/track-orders/:id/progress"
            element={<ProgressTracker />}
          />
          <Route path="/admin/clients" element={<Clients userRole="admin" />} />
          <Route path="/admin/clients/add" element={<AddClientForm />} />
          <Route path="/admin/teams" element={<Teams userRole="admin" />} />
          <Route path="/admin/teams/add" element={<AddTeamForm />} />
          <Route
            path="/admin/track-orders"
            element={<TrackOrders userRole="admin" />}
          />
          <Route path="/admin/users" element={<Users userRole="admin" />} />

          {/* Team Routes */}
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/team/orders" element={<Orders userRole="team" />} />
          <Route
            path="/team/orders/:id"
            element={<OrderDetails userRole="team" />}
          />
          <Route
            path="/team/track-orders"
            element={<TrackOrders userRole="team" />}
          />
          <Route
            path="/team/orders/:id/progress"
            element={<ProgressTracker userRole="team" />}
          />
          <Route path="/team/clients" element={<Clients />} />
          <Route path="/team/teams" element={<Teams />} />

          {/* Shared */}
          <Route path="/profile" element={<Profile user={user} />} />
        </Route>
      ) : (
        // fallback: if not authenticated, send to login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
