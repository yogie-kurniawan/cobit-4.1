import API from "../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  processes: [],
  loading: false,
  error: null,
};

export const getProcesses = createAsyncThunk(
  "processes/getProcesses",
  async () => {
    try {
      const response = await API.get(`/processes`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);

export const createProcess = createAsyncThunk(
  "processes/createProcess",
  async (data) => {
    try {
      const response = await API.post(`/processes/create`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);

export const updateProcess = createAsyncThunk(
  "processes/updateProcess",
  async (id, data) => {
    try {
      const response = await API.patch(`/processes/${id}/update`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);
export const deleteProcess = createAsyncThunk(
  "processes/deleteProcess",
  async (id) => {
    try {
      const response = await API.delete(`/processes/${id}/delete`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return { status: "error", message: error.response.message };
      }
      return { status: "error", message: error.message };
    }
  }
);

const Processeslice = createSlice({
  name: "processes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProcesses.fulfilled, (state, action) => {
        state.processes = action.payload.processes;
      })
      .addCase(deleteProcess.fulfilled, (state, action) => {
        state.processes = state.processes.filter(
          (question) => question._id !== action.payload.id
        ); // Remove the deleted question
        state.loading = false;
      })
      .addCase(createProcess.fulfilled, (state, action) => {
        state.processes.push(action.payload.process);
        state.loading = false;
      });
  },
});

export default Processeslice.reducer;
