import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teamMembers: [
      {
        id: "TM-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        role: "Senior Tailor",
        specialties: ["Suits", "Formal Wear"],
      },
      {
        id: "TM-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9123456780",
        role: "Pattern Maker",
        specialties: ["Dresses", "Patterns"],
      },
    ],
  },
  reducers: {
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
  },
});

export const { addTeamMember } = teamSlice.actions;
export default teamSlice.reducer;
