import { configureStore } from '@reduxjs/toolkit'
import { jobsReducer } from './features/jobs/jobsSlice'
import { authReducer } from './features/auth/authSlice'
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
