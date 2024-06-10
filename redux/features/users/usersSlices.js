import { createSlice } from '@reduxjs/toolkit';

const initialState = [{ 
    UID: "",
    email: "",
    username: "",
    profilePicture:"",
    numberOfFollowers: 0,
    numberOfFollowing: 0,
    balance: 0,
    userCompleteReg: false
}];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      state.push(action.payload);
    }
  }
});

export const { createUser } = usersSlice.actions;
export default usersSlice.reducer;
