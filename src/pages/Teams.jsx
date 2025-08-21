import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Search, Eye, Edit } from "lucide-react";

const Teams = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const teamMembers = useSelector((state) => state.teams.teamMembers);

  const filteredTeams = teamMembers.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-500">Manage all team members</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Phone", "Role", "Specialties", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 tracking-wide uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTeams.map((member, index) => (
              <motion.tr
                key={member.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: index * 0.03 }}
                className="group border-b last:border-b-0 hover:bg-gray-50/70"
              >
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.email}</td>
                <td className="px-4 py-3">{member.phone}</td>
                <td className="px-4 py-3">{member.role}</td>
                <td className="px-4 py-3">
                  {Array.isArray(member.specialties)
                    ? member.specialties.join(", ")
                    : member.specialties}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <Eye className="h-4 w-4" />
                    </button>
                    {userRole === "admin" && (
                      <button className="p-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition">
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;