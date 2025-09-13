import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import cardBloMePage1 from './slices/cardBloMePage1Slice'
import userReducer from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import authSlice from './slices/authSlice';

// Configure persist for user slice
const userPersistConfig = {
  key: 'user',
  storage,
  // Only persist currentUser, not loading states or userList
  whitelist: ['currentUser']
};

// Create persisted user reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Root reducer
const rootReducer = combineReducers({
  user: persistedUserReducer,
  cart: cartSlice,
    // auth: authSlice,
    cardBloMePage1: cardBloMePage1,
  // add other reducers here...
});

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//     // auth: authSlice,
//     cardBloMePage1: cardBloMePage1,
//     user: userReducer
//   },
// });


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);