import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/modules/Login/redux/authSlice'
import settingsSlice from '@/modules/Settings/redux/settingsSlice'
import productSlice from '@/modules/Products/redux/productSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    products: productSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})