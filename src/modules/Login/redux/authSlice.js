import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./authActions"
// import toast from 'react-hot-toast';

const initialState = {
  dataLoading: false,
  auth: []
}

const authSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, state => {
        state.dataLoading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.auth = action.payload?.result
        state.dataLoading = false
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.dataLoading = false
        // const message = action.payload?.message
        // toast.error(message, {
        //   position: "bottom-right",
        //   duration: 2000
        // })
      })
  }
})

export default authSlice