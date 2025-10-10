import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/resource";


// Async thunk to fetch Card Blo Me Page4 doc
export const fetchCardBloMePage4 = createAsyncThunk(
  "cardBloMePage4/fetch",
  async (docName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Card Blo Me Page 4/${docName}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cardBloMePage4Slice = createSlice({
  name: "cardBloMePage4",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCardBloMePage4: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    updateCardBloMePage4: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardBloMePage4.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchCardBloMePage4.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardBloMePage4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doc";
      });
  },
});

export const { resetCardBloMePage4, updateCardBloMePage4 } = cardBloMePage4Slice.actions;
export default cardBloMePage4Slice.reducer;