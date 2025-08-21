import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    { 
      id: "ORD-001", 
      client: "John Doe", 
      product: "Casual Jacket", 
      stage: "Cutting", 
      status: "In Progress", 
      dueDate: "2025-01-15", 
      priority: "High",
      assignedTeamMember: "Alice"   //   Example assigned member
    },
    { 
      id: "ORD-002", 
      client: "Jane Smith", 
      product: "Formal Suit", 
      stage: "Stitching", 
      status: "In Progress", 
      dueDate: "2025-01-18", 
      priority: "Medium",
      assignedTeamMember: "Bob"
    },
    { 
      id: "ORD-003", 
      client: "Mike Johnson", 
      product: "Wedding Dress", 
      stage: "Designing", 
      status: "Delayed", 
      dueDate: "2025-01-12", 
      priority: "High",
      assignedTeamMember: "Charlie"
    },
  ],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newId = `ORD-${String(state.orders.length + 1).padStart(3, "0")}`;
      state.orders.push({ 
        id: newId, 
        assignedTeamMember: action.payload.assignedTeamMember || "Unassigned", //   Default if missing
        ...action.payload 
      });
    },
    updateAssignedTeamMember: (state, action) => {
      const { orderId, member } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.assignedTeamMember = member;
      }
    }
  },
});

export const { addOrder, updateAssignedTeamMember } = ordersSlice.actions;
export default ordersSlice.reducer;
