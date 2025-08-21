import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTeamMember } from "../redux/teamSlice";

const AddTeamForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    specialties: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeamMember({ 
      ...formData, 
      specialties: formData.specialties.split(",").map(s => s.trim()) 
    }));
    navigate("/admin/teams");
  };

  return (
    <div className="w-full min-h-screen bg-white shadow-md rounded-none p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Add Team Member</h2>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option value="">Select Role</option>
            <option value="Senior Tailor">Senior Tailor</option>
            <option value="Pattern Maker">Pattern Maker</option>
            <option value="Finishing Specialist">Finishing Specialist</option>
            <option value="Quality Control">Quality Control</option>
          </select>
        </div>

        <textarea
          name="specialties"
          placeholder="Specialties (comma separated)"
          value={formData.specialties}
          onChange={handleChange}
          rows={3}
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
        />

        {/* Buttons */}
        <div className="flex space-x-3 pt-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-gradient-to-r from-[#04203E] to-[#06345f] text-white rounded-lg hover:from-[#06345f] hover:to-[#04203E] transition-all text-sm"
          >
            Save Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeamForm;
