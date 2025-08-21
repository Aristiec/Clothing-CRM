import { createSlice } from "@reduxjs/toolkit";

// Initial sample users data
const initialUsers = [
  {
    id: "USER-1",
    email: "admin@company.com",
    role: "admin",
    createdAt: "2024-01-15T10:30:00.000Z",
    status: "active",
  },
  {
    id: "USER-2",
    email: "subadmin@company.com", 
    role: "subadmin",
    createdAt: "2024-02-20T14:15:00.000Z",
    status: "active",
  },
  {
    id: "USER-3",
    email: "team1@company.com",
    role: "team",
    createdAt: "2024-03-10T09:45:00.000Z",
    status: "active",
  },
  {
    id: "USER-4",
    email: "team2@company.com",
    role: "team", 
    createdAt: "2024-03-25T16:20:00.000Z",
    status: "active",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: initialUsers,
    loading: false,
    error: null,
  },
  reducers: {
    // Add new user
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: action.payload.id || `USER-${Date.now()}`,
        createdAt: action.payload.createdAt || new Date().toISOString(),
        status: action.payload.status || "active",
      };
      state.users.push(newUser);
    },

    // Update existing user
    updateUser: (state, action) => {
      const { id, ...updateData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...updateData,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Delete user
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },

    // Toggle user status (active/inactive)
    toggleUserStatus: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.status = user.status === "active" ? "inactive" : "active";
        user.updatedAt = new Date().toISOString();
      }
    },

    // Update user role
    updateUserRole: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.role = newRole;
        user.updatedAt = new Date().toISOString();
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset users to initial state
    resetUsers: (state) => {
      state.users = initialUsers;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  addUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  updateUserRole,
  setLoading,
  setError,
  clearError,
  resetUsers,
} = userSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);
export const selectUsersByRole = (state, role) =>
  state.users.users.filter((user) => user.role === role);
export const selectActiveUsers = (state) =>
  state.users.users.filter((user) => user.status === "active");
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

// Statistics selectors
export const selectUserStats = (state) => {
  const users = state.users.users;
  return {
    total: users.length,
    active: users.filter((user) => user.status === "active").length,
    inactive: users.filter((user) => user.status === "inactive").length,
    admins: users.filter((user) => user.role === "admin").length,
    subadmins: users.filter((user) => user.role === "subadmin").length,
    team: users.filter((user) => user.role === "team").length,
  };
};

export default userSlice.reducer;