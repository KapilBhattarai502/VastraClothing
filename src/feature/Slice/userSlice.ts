import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string | null;
  role: string | null;
}

interface InitialStateType {
  user: UserState | null;
}

const initialState: InitialStateType = {
  user: null
};

export const userSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
