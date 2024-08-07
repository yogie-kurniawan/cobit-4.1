import api from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

export const getAdmins = createAsyncThunk("admins/getAdmins", async () => {
  try {
    const response = await axios.get(`${api}/admins`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (data) => {
    try {
      const response = await axios.post(`${api}/admins/create`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateAdmins = createAsyncThunk(
  "admins/updateAdmin",
  async (id, data) => {
    try {
      const response = await axios.patch(`${api}/admins/${id}/update`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id) => {
    try {
      const response = await axios.delete(`${api}/admins/${id}/delete`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (Admin) => Admin._id !== action.payload
        ); // Remove the deleted question
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
