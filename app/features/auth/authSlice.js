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
      state.user = action.payload.user
      state.userData = action.payload.userData
      state.status = action.payload.status
      // console.log(current(state))
    },
    // updateUserData(state, action) {
    //   state.userData = action.payload
    // },
  },
})

export const { updateUser } = authSlice.actions

export const authReducer = authSlice.reducer
