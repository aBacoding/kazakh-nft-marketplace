import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/entities/profile'

interface User {
  user: UserData | null
}

const initialState: User = {
  user: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = profileSlice.actions

export default profileSlice
