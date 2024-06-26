import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { IMAXBookInfo } from '../models'
import { requestBook } from '../services/book'

const initialState: IMAXBookInfo = {
  item: {},
  isLoading: false,
  error: null
}

export const fetchBook = createAsyncThunk('fetchBook', async (isbn13: string, { rejectWithValue }) => {
    try {
      return await requestBook(isbn13)
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  })

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.item = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const bookReducer = bookSlice.reducer
