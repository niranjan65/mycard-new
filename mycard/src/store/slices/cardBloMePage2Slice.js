import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/resource";

// Async thunk to fetch Card Blo Me Page2 doc
export const fetchCardBloMePage2 = createAsyncThunk(
  "cardBloMePage2/fetch",
  async (docName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Card Blo Me Page2/${docName}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cardBloMePage2Slice = createSlice({
  name: "cardBloMePage2",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCardBloMePage2: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    updateCardBloMePage2: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardBloMePage2.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchCardBloMePage2.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardBloMePage2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doc";
      });
  },
});

export const { resetCardBloMePage2, updateCardBloMePage2 } = cardBloMePage2Slice.actions;
export default cardBloMePage2Slice.reducer;