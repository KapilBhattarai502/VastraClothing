import { createSlice } from '@reduxjs/toolkit'

export const userAddressSlice = createSlice({
  name: 'useraddress',
  initialState: {
    address:null
  },
  reducers: {
    addAddress: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.address=action.payload
    },
   
  }
})

// Action creators are generated for each case reducer function
export const { addAddress} = userAddressSlice.actions

export default userAddressSlice.reducer