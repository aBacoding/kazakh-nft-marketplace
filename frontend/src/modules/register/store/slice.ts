import { createSlice } from '@reduxjs/toolkit'

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearUser: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setUser, clearUser } = registerSlice.actions

export default registerSlice
