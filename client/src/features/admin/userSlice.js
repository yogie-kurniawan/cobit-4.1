import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getQUsers", async () => {
  try {
    const response = await API.get(`/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  try {
    const response = await API.post(`/users/create`, data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (id, data) => {
    try {
      const response = await API.patch(`/users/${id}/update`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await API.delete(`/users/${id}/delete`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload); // Remove the deleted question
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
