import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk (
  'login',
  async (value) => {
    try {
      const res = await axiosInstance.post('login', value)
      return res.data
    }
    catch (e) {
      throw (e)
    }
  }
)