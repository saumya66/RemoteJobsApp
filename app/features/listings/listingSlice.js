import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchListings = createAsyncThunk(
  'listing/fetchListings',
  async (thunkApi) => {
    const listing = await axios.get('https://remoteok.io/api')
    return listing.data
  }
)
const initialState = {
  loading: false,
  jobs: [],
}

export const listingSlice = createSlice({
  name: 'listing',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchListings.pending]: (state) => {
      initialState.loading = true
    },
    [fetchListings.fulfilled]: (state, { payload }) => {
      initialState.loading = false
      initialState.jobs = payload
    },
    [fetchListings.rejected]: (state) => {
      initialState.loading = false
    },
  },
})

export const listingReducer = listingSlice.reducer
