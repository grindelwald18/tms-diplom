import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { IBooksLIst } from '../models'
import { requestNewBooks } from '../services/books'
import { addBookToLocalStorage } from '../utils/workWithLocalStorage'

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
  reducers: {
    likeBook: (state, action) => {
      console.log(action.payload)
      const foundBook = state.list.find((book) => book.isbn13 === action.payload)
      if (foundBook) {
        if (foundBook.isLike) {
          foundBook.isLike = false
          addBookToLocalStorage(foundBook)
        } else {
          foundBook.isLike = true
          addBookToLocalStorage(foundBook)
        }
      }
    },
    readeBook: (state, action) => {
      console.log(action.payload)
      const foundBook = state.list.find((book) => book.isbn13 === action.payload)
      if (foundBook) {
        if (foundBook.isReade) {
          foundBook.isReade = false
          addBookToLocalStorage(foundBook)
        } else {
          foundBook.isReade = true
          addBookToLocalStorage(foundBook)
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = action.payload.books?.map((book: any) => ({ ...book, isLike: false, isReade: false }))
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const { likeBook, readeBook } = booksSlice.actions
export const booksReducer = booksSlice.reducer
