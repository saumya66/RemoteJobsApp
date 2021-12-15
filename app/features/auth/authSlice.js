import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  user: '',
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload.user
      state.status = action.payload.status
    },
  },
})

export const { updateUser } = authSlice.actions

export const authReducer = authSlice.reducer
