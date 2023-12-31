import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login,signout } from "../api/Auth_api";

const initialState = {
  admin: null,
  status: "idle",
};

export const loginAsync = createAsyncThunk("Auth/login", async (userInput) => {
  const data = await login(userInput);
  return data;
});
export const signoutAsync = createAsyncThunk("Auth/signout", async (userid) => {
  const data = await signout(userid);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload;
        toast.success(`🦄 Welcome, ${action.payload.username}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        toast.error(action.error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .addCase(signoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = null;
        toast.success(action.payload.username, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .addCase(signoutAsync.rejected, (state, action) => {
        state.status = "idle";
        toast.error(action.error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  },
});

// export const { increment } = authSlice.actions;

export default authSlice.reducer;
