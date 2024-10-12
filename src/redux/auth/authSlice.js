import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const handleReject = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleReject)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, handleReject)
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, emai: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleReject);
  },
});

export const authReducer = authSlice.reducer;
