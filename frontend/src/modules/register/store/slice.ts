import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegisterFormData } from '@/entities/register/card/model/types'

interface RegisterState {
  user: RegisterFormData | null
}

const initialState: RegisterState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<RegisterFormData>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, clearUser } = registerSlice.actions

export default registerSlice
