//this slice is purely for setting and removing user credentials to local storage
//this will be added directly to store.js, because this is not a child of apiSlice or userSlice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

//const initialState = { userInfo: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      //state.userInfo = null
      state.userInfo = null 
      localStorage.clear()
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      //localStorage.clear();
    },

   
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;