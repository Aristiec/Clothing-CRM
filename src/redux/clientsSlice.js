import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [
    {
      id: "CL-001",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 555 123 4567",
      address: "123 Main Street, Springfield",
      orders: 3,
      totalSpent: "$450",
      lastOrder: "2025-01-10",
    },
    {
      id: "CL-002",
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 555 987 6543",
      address: "456 Elm Avenue, Metropolis",
      orders: 5,
      totalSpent: "$980",
      lastOrder: "2025-01-15",
    },
  ],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients.push({
        id: Date.now().toString(), // auto ID for new clients
        ...action.payload,
      });
    },
  },
});

export const { addClient } = clientsSlice.actions;
export default clientsSlice.reducer;
