import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getBrandList, getCategoryList } from "./productActions";

const initialState = {
  categoryList: [],
  brandList: [],
  listLoading: false,
};

const productSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET categoryList
      .addCase(getCategoryList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryList = action.payload?.result;
        state.listLoading = false;
      })
      .addCase(getCategoryList.rejected, (state) => {
        state.listLoading = false;
        toast.error("Get categoryList failed", {
          position: "bottom-right",
          duration: 2000,
        });
      })

      // GET brandList
      .addCase(getBrandList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getBrandList.fulfilled, (state, action) => {
        state.brandList = action.payload?.result;
        state.listLoading = false;
      })
      .addCase(getBrandList.rejected, (state) => {
        state.listLoading = false;
        toast.error("Get brandList failed", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  },
});

export default productSlice;
