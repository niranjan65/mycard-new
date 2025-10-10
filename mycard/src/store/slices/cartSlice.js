// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     wishlist: [],
//     totalAmount: 0,
//     totalItems: 0,
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find(item => item.name === action.payload.name);
      
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
      
//       state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
//       state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
//     },
    
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.name !== action.payload);
//       state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
//       state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
//     },
    
//     updateQuantity: (state, action) => {
//       const { itemName, quantity } = action.payload;
//       const item = state.items.find(item => item.name === itemName);
      
//       if (item) {
//         item.quantity = quantity;
//         if (quantity <= 0) {
//           state.items = state.items.filter(item => item.name !== itemName);
//         }
//       }
      
//       state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
//       state.totalAmount = state.items.reduce((sum, item) => sum + (item.standard_rate * item.quantity), 0);
//     },
    
//     addToWishlist: (state, action) => {
//       const existingItem = state.wishlist.find(item => item.name === action.payload.name);
//       if (!existingItem) {
//         state.wishlist.push(action.payload);
//       }
//     },
    
//     removeFromWishlist: (state, action) => {
//       state.wishlist = state.wishlist.filter(item => item.name !== action.payload);
//     },
    
//     clearCart: (state) => {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalItems = 0;
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   addToWishlist,
//   removeFromWishlist,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;













import { createSlice } from '@reduxjs/toolkit';

const recalcTotals = (state) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = state.items.reduce(
    (sum, item) => sum + item.standard_rate * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    wishlist: [],
    totalAmount: 0,
    totalItems: 0,
    wishlistCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.item_code === action.payload.item_code
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalcTotals(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.item_code !== action.payload
      );
      recalcTotals(state);
    },

    updateQuantity: (state, action) => {
      const { item_code, quantity } = action.payload;
      const item = state.items.find((i) => i.item_code === item_code);
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.item_code !== item_code);
        }
      }
      recalcTotals(state);
    },

    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.item_code === action.payload.item_code
      );
      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.item_code !== action.payload
      );
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existing = state.wishlist.find(
        (item) => item.item_code === product.item_code
      );
      if (existing) {
        state.wishlist = state.wishlist.filter(
          (item) => item.item_code !== product.item_code
        );
      } else {
        state.wishlist.push(product);
      }
    },

    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);
    },

    clearAll: (state) => {
      state.items = [];
      state.wishlist = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    setWishlistCountRedux: (state, action) => {
      state.wishlistCount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearCart,
  clearAll,
  setWishlistCountRedux
} = cartSlice.actions;

export default cartSlice.reducer;
