import React, { useState } from "react";
import { X, Upload, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/ordersSlice";

const AddOrderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teamMembers = useSelector((state) => state.teams.teamMembers);

  const [formData, setFormData] = useState({
    product: "",
    stage: "",
    status: "In Progress",
    dueDate: "",
    priority: "Medium",
    notes: "",
    image: null,
    quantity: "",
    materials: "",
    assignedTeam: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrder(formData));
    navigate("/admin/orders");
  };

  return (
    <div className="w-full min-h-screen bg-white shadow-md rounded-none p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Back button with icon */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Add New Order</h2>
        </div>

        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="product"
            placeholder="Product Type"
            value={formData.product}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="text"
            name="materials"
            placeholder="Materials"
            value={formData.materials}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option value="">Select Stage</option>
            <option value="Designing">Designing</option>
            <option value="Cutting">Cutting</option>
            <option value="Stitching">Stitching</option>
            <option value="Finishing">Finishing</option>
            <option value="Packaging">Packaging</option>
            <option value="Delivery">Delivery</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option>In Progress</option>
            <option>Delayed</option>
            <option>Completed</option>
          </select>

          <select
            name="assignedTeam"
            value={formData.assignedTeam}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option value="">Assign Team Member</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
        />

        {/* Image Upload */}
        <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-amber-500 cursor-pointer">
          <Upload className="h-5 w-5 mb-2" />
          <label className="cursor-pointer text-sm">
            <span>Upload Order Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="preview"
              className="mt-3 w-32 h-32 object-cover rounded-md shadow"
            />
          )}
        </div>

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
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;
