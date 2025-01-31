import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/entities/profile'

interface ProfileState {
  user: UserData | null
  editProfileModal: {
    state: boolean
    data: null
  }
}

const initialState: ProfileState = {
  user: null,
  editProfileModal: {
    state: false,
    data: null,
  },
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
    setEditProfileModal: (
      state,
      action: PayloadAction<{ state: boolean; data: any }>
    ) => {
      state.editProfileModal = action.payload
    },
  },
})

export const { setUser, clearUser, setEditProfileModal } = profileSlice.actions

export default profileSlice
