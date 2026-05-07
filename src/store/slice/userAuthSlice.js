import { createSlice } from "@reduxjs/toolkit";
import { registerUser , loginUser , logout , getUser } from "../actions/action";
import axios from "axios";

const initialState = {
    loading:false,
    error:null,
    success:false,
    isAuthenticated:false,
    user:{}
}
const userauthslice = createSlice({
    name:"registerInfo",
    initialState,
   
    extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // logIn
      .addCase(loginUser.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading = false
        state.user = action.payload
        state.success = true;
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload;
      })

      // Get User
       .addCase(getUser.pending , (state)=>{
        state.loading = true
      })
      .addCase(getUser.fulfilled , (state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getUser.rejected , (state,action)=>{
        state.loading = false
        state.isAuthenticated=false
      })
      
      // Logout
      .addCase(logout.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(logout.fulfilled,(state,action)=>{
        state.loading = false
        state.isAuthenticated = false
        state.user = {}
        
      })
      .addCase(logout.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload;
      })
  }

})

export const {register}=userauthslice.actions
export default userauthslice.reducer