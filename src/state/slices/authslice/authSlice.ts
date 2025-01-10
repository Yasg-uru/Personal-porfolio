import axiosInstance from "@/helper/axiosInstanc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InitialState } from "./type";
interface validationError {
  message: string;
}
type axiosError = AxiosError<validationError>;
const initialState:InitialState = {
    isLoading:false ,
};

export const createAccount = createAsyncThunk(
  "auth/register",
  async (FormData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", FormData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;
      if (err.response && err.response.data && err.response.data.message)
        return rejectWithValue(err.response.data.message);
      return rejectWithValue("failed to register please try again later");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
builder.addCase(createAccount.fulfilled,(state)=>{
    state.isLoading=false;
}).addCase(createAccount.pending,(state)=>{
    state.isLoading=true ;
}).addCase(createAccount.rejected,(state)=>{
    state.isLoading=false;
})
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
