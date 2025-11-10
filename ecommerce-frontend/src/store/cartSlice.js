// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [] // { product: "id", quantity: 1 }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const id = product._id || product // Accept both object and ID
      const existing = state.items.find(i => i.product === id)

      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ product: id, quantity })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer