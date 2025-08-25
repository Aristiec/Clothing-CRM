import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const ProfileCard = () => {
  // 🔹 Static mock data
  const profile = {
    name: "Khirod Chandra Nayak",
    role: "UI Developer",
    email: "khirod.nayak@example.com",
    phone: "+91 98765 43210",
    location: "Bhubaneswar, India",
    joinDate: "March 2023",
    about:
      "Passionate frontend developer with a focus on creating modern, responsive, and user-friendly web applications. Skilled in React, Redux, and Tailwind CSS.",
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-3xl font-bold">
          {profile.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500">{profile.role}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-gray-500" /> {profile.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-gray-500" /> {profile.phone}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" /> {profile.location}
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" /> Joined{" "}
          {profile.joinDate}
        </p>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {profile.about}
        </p>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
