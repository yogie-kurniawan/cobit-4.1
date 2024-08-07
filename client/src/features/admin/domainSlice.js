import api from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  domains: [],
  loading: false,
  error: null,
};

export const getDomains = createAsyncThunk("domains/getDomains", async () => {
  try {
    const response = await axios.get(`${api}/domains`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createDomains = createAsyncThunk(
  "domains/createDomain",
  async (data) => {
    try {
      const response = await axios.post(`${api}/domains/create`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateDomains = createAsyncThunk(
  "domains/updateDomain",
  async (id, data) => {
    try {
      const response = await axios.patch(`${api}/domains/${id}/update`, data);
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
      const response = await axios.delete(`${api}/domains/${id}/delete`);
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
        state.domains = action.payload;
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
