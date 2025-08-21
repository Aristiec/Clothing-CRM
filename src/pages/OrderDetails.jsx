import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  User,
  Mail,
  Phone,
  DollarSign,
  Package,
} from "lucide-react";
import { FaCamera } from "react-icons/fa";

const OrderDetails = ({ userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const order = useSelector((state) =>
    state.orders.orders.find((o) => o.id === id)
  );

  const relatedClients = useSelector(
    (state) =>
      state.clients?.clients?.filter(
        (client) =>
          client.selectedOrders?.includes(id) ||
          client.selectedOrders?.includes(order?.product) ||
          client.orderProduct === order?.product
      ) || []
  );

  const teamMembers = useSelector((state) => state.teams.teamMembers);
  const assignedMember = order.assignedTeam
    ? teamMembers.find((m) => m.id === order.assignedTeam)
    : null;

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Order Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(`/${userRole}/orders`)}
            className="bg-gradient-to-r from-[#04203E] to-[#06345f] text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delayed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleBack = () => {
    if (location.state?.from === "progress") {
      navigate(`/${userRole}/orders/${id}`);
    } else {
      navigate(`/${userRole}/orders`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-500 text-sm">
              View and manage order information
            </p>
          </div>
        </div>
      </div>

      {/* 50-50 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SECTION */}
        <div className="space-y-8">
          {/* Order Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="h-6 w-6 text-[#06345f]" />
              <h2 className="text-xl font-semibold text-gray-900">
                {order.id}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Product
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.product}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Current Stage
                </p>
                <p
                  onClick={() =>
                    navigate(`/${userRole}/orders/${order.id}/progress`, {
                      state: { from: "orderDetails" },
                    })
                  }
                  className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  {order.stage}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Priority
                </p>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(
                    order.priority
                  )}`}
                >
                  {order.priority}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Due Date
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-lg font-semibold text-gray-900">
                    {order.dueDate}
                  </p>
                </div>
              </div>

              {order.price && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Price
                  </p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.price}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-[#06345f]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Product Images
              </h2>
            </div>

            {order.images && order.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {order.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <FaCamera className="h-12 w-12 mb-2" />
                <p>No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-8">
          {/* Client Info */}
          {relatedClients.length > 0 ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-[#06345f]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Client Information ({relatedClients.length}{" "}
                  {relatedClients.length === 1 ? "Client" : "Clients"})
                </h2>
              </div>

              <div className="space-y-4">
                {relatedClients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Name
                        </p>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <p className="font-semibold text-gray-900">
                            {client.name}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Email
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-700">{client.email}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Phone
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-700">{client.phone}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-6 w-6 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Client Information
                </h2>
              </div>
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No clients have selected this order yet.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Client information will appear here when they select this
                  order or product.
                </p>
              </div>
            </div>
          )}

          {/* Team Assignment */}
          {/* Team Assignment */}
          {userRole !== "admin" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-[#06345f]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Team Assignment
                </h2>
              </div>

              {assignedMember ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{assignedMember.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm italic">
                      {assignedMember.role}
                    </span>
                  </div>
                  {assignedMember.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{assignedMember.email}</span>
                    </div>
                  )}
                  {assignedMember.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{assignedMember.phone}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No team member has been assigned yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
