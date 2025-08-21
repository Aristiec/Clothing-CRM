import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import clientsReducer from "./clientsSlice";
import teamReducer from "./teamSlice";
import usersReducer from "./userSlice"; 

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    clients:clientsReducer, 
    teams: teamReducer,
    users:usersReducer, 
  },
});

export default store;
