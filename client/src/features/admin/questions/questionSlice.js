import api from "../../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    try {
      const response = await axios.get(`${api}/questions`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (data) => {
    try {
      const response = await axios.post(`${api}/questions/create`, data);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (id, data) => {
    try {
      const response = await axios.post(`${api}/questions/${id}/update`, data);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id) => {
    try {
      const response = await axios.delete(`${api}/questions/${id}/delete`);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
  },
});

export default questionSlice.reducer;
