import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice/slice"
import authReducer from './slices/authslice/authSlice'
const store = configureStore({
  reducer: {
   project:projectReducer,
   auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
