import { combineReducers } from '@reduxjs/toolkit'
import registerSlice from '@/modules/register/store/slice'

export const reducers = combineReducers({
  [registerSlice.name]: registerSlice.reducer,
})
