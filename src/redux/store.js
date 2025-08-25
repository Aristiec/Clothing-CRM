import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import clientsReducer from "./clientsSlice";
import teamReducer from "./teamSlice";
import usersReducer from "./userSlice"; 
import notificationsReducer from "./notificationsSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    clients:clientsReducer, 
    teams: teamReducer,
    users:usersReducer, 
    notifications: notificationsReducer
  },
});

export default store;
