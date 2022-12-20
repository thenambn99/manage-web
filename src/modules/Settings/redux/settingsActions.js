import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllUsers = createAsyncThunk (
  'getUsers',
  async () => {
    try {
      const res = await axiosInstance.get("getAllUsers")
      return res.data
    }
    catch (e) {
      throw e
    }
  }

)