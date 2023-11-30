import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: undefined,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

// Actions
export const { setUser } = userSlice.actions;

// Seclectors
export const getUser = (state) => state.user;

// Reducer
export default userSlice.reducer;
