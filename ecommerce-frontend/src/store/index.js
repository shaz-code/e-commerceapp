// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'  // ← ADD THIS

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer  // ← ADD THIS
  },
  devTools: true
})