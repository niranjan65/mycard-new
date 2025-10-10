import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/resource";

export const fetchCardBloMePage3 = createAsyncThunk(
  "cardBloMePage3/fetch",
  async (docName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Card Blo Me Page3/${docName}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cardBloMePage3Slice = createSlice({
  name: "cardBloMePage3",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCardBloMePage3: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    updateCardBloMePage3: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardBloMePage3.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchCardBloMePage3.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCardBloMePage3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doc";
      });
  },
});

export const { resetCardBloMePage3, updateCardBloMePage3 } = cardBloMePage3Slice.actions;
export default cardBloMePage3Slice.reducer;