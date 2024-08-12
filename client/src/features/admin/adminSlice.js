import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

export const getAdmins = createAsyncThunk("admins/getAdmins", async () => {
  try {
    const response = await API.get("/admins");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (data) => {
    try {
      const response = await API.post("/admins/create", data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (id, data) => {
    try {
      const response = await API.patch(`admins/${id}/update`, data);
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
      const response = await API.delete(`/admins/${id}/delete`);
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
        state.admins = action.payload.admins;
      })
      .addCase(getAdmins.rejected, (state, action) => {})
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload.data.admin);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload.data.admin);
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload.data.admin
        );
        state.loading = false;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
