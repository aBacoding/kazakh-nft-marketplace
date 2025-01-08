import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginFormData } from '@/entities/login/card/model/types'

interface LoginState {
  user: LoginFormData | null
}

const initialState: LoginState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginFormData>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, clearUser } = loginSlice.actions

export default loginSlice
