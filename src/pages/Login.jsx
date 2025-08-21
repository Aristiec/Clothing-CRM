import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import ClothingLoginImage from "../assets/login.jpg";

const Login = ({ onLogin }) => { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      onLogin({
        email: formData.email,
        role: selectedRole,
      });

      //navigate to the correct dashboard
      if (selectedRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/team/dashboard");
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-[#FAFCFD]">
        <img
          src={ClothingLoginImage}
          alt="Clothing CRM Visual"
          className="max-w-[520px] max-h-[460px]"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#E9EEF4] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[450px] bg-white shadow-md rounded-lg p-10 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#04203E] font-[Archivo]">
              Welcome Back
            </h1>
            <p className="text-xs text-[#04203E] font-[Inter]">
              Sign in to manage your clothing orders
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedRole === "admin"
                  ? "bg-[#04203E] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("team")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedRole === "team"
                  ? "bg-[#04203E] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Team
            </button>
          </div>

          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-[#04203E] text-white text-sm font-bold py-2 rounded hover:bg-[#163a63] transition"
          >
            Sign In as {selectedRole === "admin" ? "Admin" : "Team Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
