import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"; 
import chatReducer  from './ChatSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;