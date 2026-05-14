import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const domain = "https://restapis-devfolio.onrender.com/"

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, {rejectWithValue}) => {
     try {
        const link = `${domain}/api/createUser`

        const config = {
          withCredentials:true,
          headers: { "Content-Type": "application/json" }
        }

        const response = await axios.post(link, userData, config)
        return response.data
     } catch (error) {
        return rejectWithValue(
           error.response?.data || "some Thing went wrong"
        )
     }
  }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async(userCredential,{rejectWithValue})=>{
        try {
            const link = `${domain}/api/login`
            const config = {
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post(link,userCredential,config);
            return res.data;
        } catch (error) {
             return rejectWithValue(
                error.response?.data || "some thing went wrong"
              );
        }
    }
)

export const getUser = createAsyncThunk(
     "get/User",
  async (_, { rejectWithValue }) => {
    try {
      const link = `${domain}/api/me`; // ✅ your GET endpoint

      const res = await axios.get(link, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
)

export const logout = createAsyncThunk(
     "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const link = `${domain}/api/logout`; // ✅ your GET endpoint

      const res = await axios.post(link,{},{withCredentials:true});

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
)