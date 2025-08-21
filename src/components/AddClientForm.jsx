import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../redux/clientsSlice";

const AddClientForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get orders from Redux store to populate the dropdown
  const orders = useSelector((state) => state.orders?.orders || []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    orders: "",
    totalSpent: "",
    lastOrder: "",
    orderProduct: "", 
    selectedOrders: [], // Array to store multiple selected orders
    orderInput: "", // Text input for manual order entry
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multi-select for order products
  const handleOrderProductSelect = (e) => {
    const selectedProduct = e.target.value;
    if (selectedProduct && !formData.selectedOrders.includes(selectedProduct)) {
      setFormData({
        ...formData,
        selectedOrders: [...formData.selectedOrders, selectedProduct],
        orderProduct: "", // Reset dropdown
      });
    }
  };

  // Handle manual order input (paste or type multiple orders)
  const handleOrderInputChange = (e) => {
    setFormData({ ...formData, orderInput: e.target.value });
  };

  // Process manual order input and add to selected orders
  const processOrderInput = () => {
    if (formData.orderInput.trim()) {
      // Split by comma, semicolon, or newline and clean up
      const inputOrders = formData.orderInput
        .split(/[,;\n]/)
        .map(order => order.trim())
        .filter(order => order.length > 0);
      
      // Add new orders that aren't already selected
      const newOrders = inputOrders.filter(order => 
        !formData.selectedOrders.includes(order)
      );
      
      if (newOrders.length > 0) {
        setFormData({
          ...formData,
          selectedOrders: [...formData.selectedOrders, ...newOrders],
          orderInput: "", // Clear input after processing
        });
      }
    }
  };

  // Remove selected order
  const removeSelectedOrder = (orderToRemove) => {
    setFormData({
      ...formData,
      selectedOrders: formData.selectedOrders.filter(order => order !== orderToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addClient({
        id: `CL-${Date.now()}`,
        ...formData,
        selectedOrders: formData.selectedOrders, // Include selected orders array
      })
    );
    navigate("/admin/clients");
  };

  // Get unique product names from orders
  const uniqueProducts = [...new Set(orders.map(order => order.product).filter(Boolean))];
  
  // Get all orders for ID/Name selection
  const allOrderOptions = orders.map(order => ({
    id: order.id,
    product: order.product,
    display: `${order.id} - ${order.product}`,
  }));

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
          <h2 className="text-xl font-bold text-gray-900">Add New Client</h2>
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
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            required
          />

          <input
            type="number"
            name="orders"
            placeholder="Total Orders"
            value={formData.orders}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          <input
            type="text"
            name="totalSpent"
            placeholder="Total Spent ($)"
            value={formData.totalSpent}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />

          {/* Order Product Dropdown */}
          <select
            name="orderProduct"
            value={formData.orderProduct}
            onChange={handleOrderProductSelect}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-white"
          >
            <option value="">Select Order Product</option>
            {uniqueProducts.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>

          {/* Manual Order Input */}
          <div className="relative">
            <input
              type="text"
              name="orderInput"
              placeholder="Enter Order IDs/Names (comma separated)"
              value={formData.orderInput}
              onChange={handleOrderInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  processOrderInput();
                }
              }}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm pr-16"
            />
            <button
              type="button"
              onClick={processOrderInput}
              className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 text-white rounded text-xs hover:bg-amber-600 transition-colors"
            >
              Add
            </button>
          </div>

          <input
            type="date"
            name="lastOrder"
            value={formData.lastOrder}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />
        </div>

        {/* Selected Orders Display */}
        {formData.selectedOrders.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Orders ({formData.selectedOrders.length})
            </label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50 max-h-32 overflow-y-auto">
              {formData.selectedOrders.map((order, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs"
                >
                  {order}
                  <button
                    type="button"
                    onClick={() => removeSelectedOrder(order)}
                    className="ml-1 text-amber-600 hover:text-amber-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Click the X to remove an order. You can add more using the dropdown or text input above.
            </p>
          </div>
        )}

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
            Save Client
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;