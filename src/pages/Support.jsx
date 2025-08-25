import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LifeBuoy, Paperclip } from "lucide-react";

const Support = () => {
  const orders = useSelector((state) => state.orders.orders);

  const [formData, setFormData] = useState({
    department: "",
    category: "",
    orderId: "",
    subject: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", formData);
    alert("Order Support Ticket submitted successfully!");
    setFormData({
      department: "",
      category: "",
      orderId: "",
      subject: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex items-center gap-2">
          <LifeBuoy className="h-7 w-7 text-[#06345f]" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
            <p className="text-gray-500">Create and track support tickets</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        {/* Department + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send To
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#06345f] focus:border-transparent outline-none"
              required
            >
              <option value="">Select Department</option>
              <option value="Orders">Orders</option>
              <option value="Billing">Billing</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#06345f] focus:border-transparent outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Order Delay">Order Delay</option>
              <option value="Wrong Product">Wrong Product</option>
              <option value="Damaged Product">Damaged Product</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Order Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#06345f] focus:border-transparent outline-none"
            required
          >
            <option value="">Select Order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.product} ({order.client})
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief summary of your request"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#06345f] focus:border-transparent outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about your request"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#06345f] focus:border-transparent outline-none"
            rows="4"
            required
          />
        </div>

        {/* Attach Files */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label className="flex items-center cursor-pointer">
            <Paperclip className="w-4 h-4 mr-2 text-gray-500" />
            Attach Files
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {formData.file && (
            <span className="text-gray-500">{formData.file.name}</span>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-md transition flex items-center gap-2"
          >
            Submit Ticket
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Support;
