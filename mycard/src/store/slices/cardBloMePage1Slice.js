// src/redux/slices/cardBloMePage1Slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Change this if your Frappe backend URL differs
const BASE_URL = "/api/resource";

// Async thunk to fetch Card Blo Me Page1 doc
export const fetchCardBloMePage1 = createAsyncThunk(
  "cardBloMePage1/fetch",
  async (docName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Card Blo Me Page1/${docName}`, {
        withCredentials: true, // in case cookies/session are used
      });

      console.log("data...... in slice", docName, response)
      return response.data.data; // frappe returns { data: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cardBloMePage1Slice = createSlice({
  name: "cardBloMePage1",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCardBloMePage1: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    updateCardBloMePage1: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardBloMePage1.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null; 
      })
      .addCase(fetchCardBloMePage1.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardBloMePage1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doc";
      });
  },
});

export const { resetCardBloMePage1, updateCardBloMePage1 } = cardBloMePage1Slice.actions;
export default cardBloMePage1Slice.reducer;

