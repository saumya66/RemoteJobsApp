import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  user: '',
  userData: {},
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action) {
      console.log('hit')
      state.user = action.payload.user
      state.userData = action.payload.userData
      state.status = action.payload.status
      console.log(current(state))
    },
  },
})

export const { updateUser } = authSlice.actions

export const authReducer = authSlice.reducer
