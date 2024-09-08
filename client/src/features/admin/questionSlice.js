import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  question: {},
  loading: false,
  error: false,
  message: "",
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    try {
      const response = await API.get(`/questions`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);
export const getQuestion = createAsyncThunk(
  "questions/getQuestion",
  async (id) => {
    try {
      const response = await API.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (data) => {
    try {
      const response = await API.post(`/questions/create`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (id, data) => {
    console.log(id, data);
    try {
      const response = await API.patch(`/questions/${id}/update`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id) => {
    try {
      const response = await API.delete(`/questions/${id}/delete`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
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
        state.message = action.payload.message;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
        state.message = action.payload.message;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.message = action.payload.message;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload.question);
        state.loading = false;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
        state.message = action.payload.message;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
        state.message = action.payload.message;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const updatedQuestion = action.payload.question;
        const index = state.questions.findIndex(
          (question) => question._id === updatedQuestion._id
        );

        if (index !== -1) {
          state.questions[index] = updatedQuestion;
        }
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload.id
        );
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
        state.message = action.payload.message;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.status == "error") {
          state.error = true;
        } else {
          state.error = false;
        }
        state.message = action.payload.message;
      });
  },
});

export default questionSlice.reducer;
