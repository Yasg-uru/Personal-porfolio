import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice/slice"

const store = configureStore({
  reducer: {
   project:projectReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
