import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getAllUsers } from "./settingsActions";

const initialState = {
  users: [],
  listLoading: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload?.result;
        state.listLoading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.listLoading = false;
        toast.error("Get all users failed", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  },
});

export default settingsSlice;
