import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/modules/Login/redux/authSlice'
import settingsSlice from '@/modules/Settings/redux/settingsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})