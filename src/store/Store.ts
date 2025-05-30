import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../feature/Slice/userSlice'
import userAddressReducer from '../feature/Slice/userAddressSlice'
import adminSearchReducer from '../feature/Slice/adminSearchSlice'

export const store = configureStore({
  reducer: {
    currUser:userReducer,
    useraddress:userAddressReducer,
    searchRequired:adminSearchReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

