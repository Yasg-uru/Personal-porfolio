import axiosInstance from "@/helper/axiosInstanc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InitialState } from "./type";
const initialState: InitialState = {
  isLoading: false,
  projects: [],
  projectDetails: null,
  realTimeLoading: false,
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
export const addComment = createAsyncThunk(
  "project/addComment",
  async (data: { projectId: string; comment: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/project/addcomment`, data, {
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
export const addReplyOnComment = createAsyncThunk(
  "project/replyoncomment",
  async (
    {
      projectId,
      commentId,
      replyText,
    }: { projectId: string; commentId: string; replyText: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/project/addreply/${projectId}/${commentId}`,
        { replyText },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;
      if (err.response && err.response.data && err.response.data.message)
        return rejectWithValue(err.response.data.message);
      return rejectWithValue(
        "failed to reply on project please try again later"
      );
    }
  }
);
export const likeOnReply = createAsyncThunk(
  "project/likeOnReply",
  async (
    {
      projectId,
      commentId,
      replyId,
    }: { projectId: string; commentId: string; replyId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/project/like-unlike-reply/${projectId}/${commentId}/${replyId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(
        "Failed to like the reply. Please try again later."
      );
    }
  }
);
export const likeOnComment = createAsyncThunk(
  "project/likeOnComment",
  async (
    { projectId, commentId }: { projectId: string; commentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/project/like-unlike/${projectId}/${commentId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(
        "Failed to like the comment. Please try again later."
      );
    }
  }
);
export const dislike = createAsyncThunk(
  "project/handleDislike",
  async (
    { projectId, commentId }: { commentId: string; projectId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/project/handledislike/${projectId}/${commentId}`,
        {},
        {
          withCredentials: true, // Assuming we need cookies for authentication
        }
      );
      return response.data; // Assuming the response contains updated comment data
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(
        "Failed to toggle dislike. Please try again later."
      );
    }
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
      })
      .addCase(addComment.fulfilled, (state) => {
        state.realTimeLoading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.realTimeLoading = true;
      })
      .addCase(addComment.rejected, (state) => {
        state.realTimeLoading = false;
      });
  },
});
export const {} = projectSlice.actions;
export default projectSlice.reducer;
