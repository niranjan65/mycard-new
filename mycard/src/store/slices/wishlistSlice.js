// src/store/slices/wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      // Avoid duplicates
      if (!state.wishlistItems.find(item => item.id === product.id)) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
    },
    toggleWishlistItem: (state, action) => {
      const product = action.payload;
      const existing = state.wishlistItems.find(item => item.id === product.id);
      if (existing) {
        // Remove if present
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== product.id);
      } else {
        // Add if not present
        state.wishlistItems.push(product);
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
