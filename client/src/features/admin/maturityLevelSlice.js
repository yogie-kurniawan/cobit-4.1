import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  maturityLevels: [],
  loading: false,
  error: null,
};

export const getMaturityLevels = createAsyncThunk(
  "maturityLevels/getMaturityLevels",
  async () => {
    try {
      const response = await API.get(`/maturity-levels`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const MaturityLevelSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaturityLevels.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
  },
});

export default MaturityLevelSlice.reducer;
