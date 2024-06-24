import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { IBooksLIst } from '../models'
import { requestNewBooks } from '../services/books'

const initialState: IBooksLIst = {
  list: [] ,
  isLoading: false,
  error: null,
  limit: 6,
  pagesCount: null
}

export const fetchBooks = createAsyncThunk('new/fetchBooks', async (_, { rejectWithValue }) => {
    try {
      return await requestNewBooks()
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  })

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = action.payload.books
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const booksReducer = booksSlice.reducer
