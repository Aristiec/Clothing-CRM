import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Briefcase,
  Layers,
} from "lucide-react";
import ClothingLoginImage from "../assets/login.jpg";
import { useDispatch } from "react-redux";
import { addTeamMember } from "../redux/teamSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    specialties: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTeamMember({
        id: `TM-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password, // password is stored with team member
        phone: formData.phone,
        role: formData.role,
        specialties: formData.specialties
          ? formData.specialties.split(",").map((s) => s.trim())
          : [],
      })
    );

    // After signup, redirect to login page
    navigate("/login");
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
              Create Your Account
            </h1>
            <p className="text-xs text-[#04203E] font-[Inter]">
              Sign up to join your clothing team
            </p>
          </div>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full pl-10 pr-4 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
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
              placeholder="Password"
              className="w-full pl-10 pr-10 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 h-10 rounded border border-[#717171] text-sm text-[#717171] focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Senior Tailor">Senior Tailor</option>
              <option value="Pattern Maker">Pattern Maker</option>
              <option value="Finishing Specialist">Finishing Specialist</option>
              <option value="Quality Control">Quality Control</option>
            </select>
          </div>

          {/* Specialties */}
          <div className="relative">
            <Layers className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              placeholder="Specialties (comma separated)"
              className="w-full pl-10 pr-4 h-10 rounded border border-[#717171] text-sm italic text-[#717171] focus:outline-none"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-[#04203E] text-white text-sm font-bold py-2 rounded hover:bg-[#163a63] transition"
          >
            Create Account
          </button>

          {/* Link to Login */}
          <p className="text-xs text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#04203E] font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
