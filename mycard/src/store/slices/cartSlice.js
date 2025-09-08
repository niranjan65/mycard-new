import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    wishlist: [],
    totalAmount: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
    },
    
    updateQuantity: (state, action) => {
      const { itemName, quantity } = action.payload;
      const item = state.items.find(item => item.name === itemName);
      
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.name !== itemName);
        }
      }
      
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
    },
    
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(item => item.name === action.payload.name);
      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },
    
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.name !== action.payload);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  addToWishlist,
  removeFromWishlist,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
