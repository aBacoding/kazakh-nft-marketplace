import { combineReducers } from '@reduxjs/toolkit'
import registerSlice from '@/modules/register/store/slice'
import loginSlice from '@/modules/login/store/slice'

export const reducers = combineReducers({
  [registerSlice.name]: registerSlice.reducer,
  [loginSlice.name]: loginSlice.reducer,
})
