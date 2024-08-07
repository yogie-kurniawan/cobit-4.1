import api from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getQUsers", async () => {
  try {
    const response = await axios.get(`${api}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createUsers = createAsyncThunk(
  "users/createUser",
  async (data) => {
    try {
      const response = await axios.post(`${api}/users/create`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateUsers = createAsyncThunk(
  "users/updateUser",
  async (id, data) => {
    try {
      const response = await axios.patch(`${api}/users/${id}/update`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${api}/users/${id}/delete`);
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
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload); // Remove the deleted question
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
