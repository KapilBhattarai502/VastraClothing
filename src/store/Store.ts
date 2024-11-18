import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../feature/Slice/userSlice'

export const store = configureStore({
  reducer: {
    currUser:userReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

