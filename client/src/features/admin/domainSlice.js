import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  domains: [],
  loading: false,
  error: null,
};

export const getDomains = createAsyncThunk(
  "domains/getDomains",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/domains`);
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

export const getDomain = createAsyncThunk(
  "domains/getDomain",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/domains/${id}`);
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

export const createDomain = createAsyncThunk(
  "domains/createDomain",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/domains/create`, data);
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

export const updateDomain = createAsyncThunk(
  "domains/updateDomain",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/domains/${id}/update`, data);
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
export const deleteDomain = createAsyncThunk(
  "domains/deleteDomain",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/domains/${id}/delete`);
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

const domainSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDomains.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.domains = action.payload?.domains || [];
          state.error = false;
          state.message = action.payload?.message || "Success";
        }
      })
      .addCase(getDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(getDomain.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.loading = false;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(getDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.domains.push(action.payload.domain);
          state.message = action.payload.message;
          state.error = false;
        }
      })
      .addCase(createDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          const updatedDomain = action.payload.domain;
          const index = state.domains.findIndex(
            (domain) => domain._id === updatedDomain._id
          );

          if (index !== -1) {
            state.domains[index] = updatedDomain;
          }
          state.loading = false;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(updateDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.status === "error") {
          state.error = true;
          state.message = action.payload.message;
        } else {
          state.domains = state.domains.filter(
            (domain) => domain._id !== action.payload.id
          );
          if (action.payload.error !== undefined) {
            state.error = true;
          } else {
            state.error = false;
          }
          state.message = action.payload.message;
        }
      })
      .addCase(deleteDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export default domainSlice.reducer;
