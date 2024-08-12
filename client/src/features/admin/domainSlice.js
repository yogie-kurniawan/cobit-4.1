import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  domains: [],
  loading: false,
  error: null,
};

export const getDomains = createAsyncThunk("domains/getDomains", async () => {
  try {
    const response = await API.get(`/domains`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createDomain = createAsyncThunk(
  "domains/createDomain",
  async (data) => {
    try {
      const response = await API.post(`/domains/create`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateDomain = createAsyncThunk(
  "domains/updateDomain",
  async (id, data) => {
    try {
      const response = await API.patch(`/domains/${id}/update`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteDomain = createAsyncThunk(
  "domains/deleteDomain",
  async (id) => {
    try {
      const response = await API.delete(`/domains/${id}/delete`);
      return response;
    } catch (error) {
      throw new Error(error.message);
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
        state.domains = action.payload.domains;
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.domains = state.domains.filter(
          (question) => question._id !== action.payload
        ); // Remove the deleted question
        state.loading = false;
      });
  },
});

export default domainSlice.reducer;
