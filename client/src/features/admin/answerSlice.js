import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  loading: false,
  error: null,
};

export const getAnswers = createAsyncThunk("answers/getAnswers", async () => {
  try {
    const response = await API.get("/answers");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const Answerslice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
  },
});

export default Answerslice.reducer;
