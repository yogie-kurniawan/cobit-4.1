import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    try {
      const response = await API.get(`/questions`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (data) => {
    try {
      const response = await API.post(`/questions/create`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (id, data) => {
    try {
      const response = await API.patch(`/questions/${id}/update`, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id) => {
    try {
      const response = await API.delete(`/questions/${id}/delete`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.questions;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload
        );
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default questionSlice.reducer;
