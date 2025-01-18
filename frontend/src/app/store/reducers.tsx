import { profileSlice } from '@/modules/profile'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
  [profileSlice.name]: profileSlice.reducer,
})
