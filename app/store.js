import { configureStore } from '@reduxjs/toolkit'
import { listingReducer } from './features/listings/listingSlice'

export const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
})
