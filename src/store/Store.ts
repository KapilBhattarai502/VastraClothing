import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../feature/Slice/userSlice'
import userAddressReducer from '../feature/Slice/userAddressSlice'

export const store = configureStore({
  reducer: {
    currUser:userReducer,
    useraddress:userAddressReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

