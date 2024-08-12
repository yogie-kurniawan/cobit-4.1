import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  gaps: [],
  loading: false,
  error: null,
};

export const getGaps = createAsyncThunk("gaps/getGaps", async () => {
  try {
    const response = await API.get(`/gaps`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const GapSlice = createSlice({
  name: "gaps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGaps.fulfilled, (state, action) => {
      state.gaps = action.payload;
    });
  },
});

export default GapSlice.reducer;
