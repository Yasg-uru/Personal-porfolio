import axiosInstance from "@/helper/axiosInstanc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InitialState } from "./type";
const initialState: InitialState = {
  isLoading: false,
  projects: [],
  projectDetails: null,
};
interface ValidationError {
  message: string;
}
type axiosError = AxiosError<ValidationError>;
export const getProjects = createAsyncThunk(
  "project/getprojects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/project/projects", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;
      if (err.response && err.response.data && err.response.data.message)
        return rejectWithValue(err.response.data.message);
      return rejectWithValue("failed to load the projects");
    }
  }
);
export const getprojectDetailsById = createAsyncThunk(
  "project/getdetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/project/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {}
  }
);
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        state.isLoading = false;
      })
      .addCase(getProjects.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getprojectDetailsById.fulfilled, (state, action) => {
        state.projectDetails = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getprojectDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getprojectDetailsById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {} = projectSlice.actions;
export default projectSlice.reducer;
