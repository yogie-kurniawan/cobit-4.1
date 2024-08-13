import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  admin: {},
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

export const getAdmin = createAsyncThunk("admins/getAdmin", async (id) => {
  try {
    const response = await API.get(`/admins/${id}`);
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
      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = "Gagal menangkap data!";
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.admin = {};
        state.loading = false;
        state.error = true;
        state.message = "Gagal menangkap data!";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload.data.admin);
        state.loading = false;
        state.message = action.payload.data.message;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const updatedAdmin = action.payload.data.admin;
        const index = state.admins.findIndex(
          (admin) => admin._id === updatedAdmin._id
        );

        if (index !== -1) {
          state.admins[index] = updatedAdmin;
        }
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
