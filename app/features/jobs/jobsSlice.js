import { createSlice, current } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchListings = createAsyncThunk(
  'jobs/fetchListings',
  async (thunkApi) => {
    const listing = await axios
      .get('https://remoteok.io/api')
      .then((res) => res.data)
    // listing.shift() //Removes first object in array
    // listing.shift()
    return listing.slice(1)
  }
)
const initialState = {
  loading: true,
  jobs: [],
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchListings.pending]: (state) => {
      state.loading = true
    },
    [fetchListings.fulfilled]: (state, action) => {
      state.loading = false
      state.jobs = action.payload
    },
    [fetchListings.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const jobsReducer = jobsSlice.reducer
