import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategoryList = createAsyncThunk(
  'getCategory',
  async () => {
    try {
      const res = await axiosInstance.get("/getAllCategories")
      return res.data
    }
    catch (e) {
      throw e
    }
  }
)

export const getBrandList = createAsyncThunk(
  'getBrands',
  async () => {
    try {
      const res = await axiosInstance.get("/getAllBrands")
      return res.data
    }
    catch (e) {
      throw e
    }
  }
)