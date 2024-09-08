import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
  message: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await API.get(`/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
export const getUser = createAsyncThunk("users/getUser", async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  try {
    const response = await API.post(`/users/create`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (id, data) => {
    try {
      const response = await API.patch(`/users/${id}/update`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await API.delete(`/users/${id}/delete`);
    return response.data;
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
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = "Gagal menangkap data!";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.error = true;
        state.message = "Gagal menangkap data!";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message;
      });
  },
});

export default userSlice.reducer;
