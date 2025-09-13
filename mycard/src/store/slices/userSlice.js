// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL (adjust to your frappe server URL)
const BASE_URL = "/api/resource";

// Fetch a single User doc by name (usually email/username)
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/User/${userId}`, {
        withCredentials: true, // if Frappe login/session cookies are used
      });

      console.log("my user ka detail", response, userId)
      return response.data.data; // frappe returns { data: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch list of users (optional, if you need it)
export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/User`, {
        withCredentials: true,
      });
      return response.data.data; // list of users
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,   // store single user info
    userList: [],        // optional: store multiple users
    loading: false,
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch single user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch list of users
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
