import { createSlice } from '@reduxjs/toolkit'

export const adminSearchSlice = createSlice({
  name: 'searchRequired',
  initialState: {
    search:"",
    isSearchRequired:false,
  },
  reducers: {
    searchValue: (state,action) => {
    state.search=action.payload
    },
   manageSearchRequirement:(state,action)=>{
    state.isSearchRequired=action.payload

   }
  }
})
// Action creators are generated for each case reducer function
export const { searchValue,manageSearchRequirement} = adminSearchSlice.actions

export default adminSearchSlice.reducer