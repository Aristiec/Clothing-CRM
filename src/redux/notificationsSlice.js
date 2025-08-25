// src/redux/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [
    {
      id: 1,
      stage: "Designing",
      message: "Design sketches have been finalized and fabrics selected.",
      timestamp: "2025-08-20 10:15 AM",
    },
    {
      id: 2,
      stage: "Cutting",
      message: "Fabric cutting is in progress as per the approved designs.",
      timestamp: "2025-08-20 11:00 AM",
    },
    {
      id: 3,
      stage: "Stitching",
      message: "Stitching will begin once cutting is completed.",
      timestamp: "2025-08-20 11:45 AM",
    }
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
      });
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.status = "Completed";
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
