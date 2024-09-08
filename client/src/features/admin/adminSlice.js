import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  admin: {},
  loading: false,
  error: null,
};

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/admins");
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ status: "error", message: error.message });
      }
    }
  }
);

export const getAdmin = createAsyncThunk(
  "admins/getAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/admins/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ status: "error", message: error.message });
      }
    }
  }
);

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post("/admins/create", data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ status: "error", message: error.message });
      }
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`admins/${id}/update`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ status: "error", message: error.message });
      }
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) throw new Error("Id tidak ada!");
      const response = await API.delete(`/admins/${id}/delete`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ status: "error", message: error.message });
      }
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
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.admins = action.payload?.admins || [];
          state.error = false;
          state.message = action.payload?.message || "Success";
        }
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.admin = action.payload.admin;
          state.loading = false;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.admins.push(action.payload.admin);
          state.loading = false;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          const updatedAdmin = action.payload.admin;
          const index = state.admins.findIndex(
            (admin) => admin._id === updatedAdmin._id
          );

          if (index !== -1) {
            state.admins[index] = updatedAdmin;
          }
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.admins = state.admins.filter(
            (admin) => admin._id !== action.payload.id
          );
          if (action.payload.error !== undefined) {
            state.error = true;
          } else {
            state.error = false;
          }
          state.message = action.payload.message;
        }
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export default adminSlice.reducer;
