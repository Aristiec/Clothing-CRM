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
      assignedTeamMember: "Alice",
      image: null
    },
    { 
      id: "ORD-002", 
      client: "Jane Smith", 
      product: "Formal Suit", 
      stage: "Stitching", 
      status: "In Progress", 
      dueDate: "2025-01-18", 
      priority: "Medium",
      assignedTeamMember: "Bob",
      image: null
    },
    { 
      id: "ORD-003", 
      client: "Mike Johnson", 
      product: "Wedding Dress", 
      stage: "Designing", 
      status: "Delayed", 
      dueDate: "2025-01-12", 
      priority: "High",
      assignedTeamMember: "Charlie",
      image: null
    },
  ],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newId = `ORD-${String(state.orders.length + 1).padStart(3, "0")}`;
      
      let imageUrl = null;
      if (action.payload.image instanceof File) {
        imageUrl = URL.createObjectURL(action.payload.image);
      }

      state.orders.push({ 
        id: newId, 
        assignedTeamMember: action.payload.assignedTeamMember || "Unassigned",
        ...action.payload,
        image: imageUrl
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
