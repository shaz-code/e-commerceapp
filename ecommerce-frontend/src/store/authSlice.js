// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.role = user.role
      state.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('role', user.role)
    },
    logout: (state) => {
      state.token = null
      state.role = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer