import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { IBooksLIst, IBookInfo } from '../models'
import { requestNewBooks } from '../services/books'
import { requestSearchBooks } from '../services/search'
import { addBookToLocalStorage, getBooksFromLocalStorage } from '../utils/workWithLocalStorage'

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

export const fetchSearchBooks = createAsyncThunk('search/fetchBooks', async (search: string, { rejectWithValue }) => {
    try {
      return await requestSearchBooks(search)
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
})

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    likeBook: (state, action) => {
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
        const booksFromLocalStorage = getBooksFromLocalStorage();
        const books = action.payload.books?.map((book: IBookInfo) => {
          const matchingBook = booksFromLocalStorage.find((b: IBookInfo) => b.isbn13 === book.isbn13);
          if (matchingBook) {
            return { ...book, isLike: matchingBook.isLike, isReade: matchingBook.isReade };
          } else {
            return { ...book, isLike: false, isReade: false };
          }
        });

        state.list = books;
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })

      .addCase(fetchSearchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSearchBooks.fulfilled, (state, action) => {
        const booksFromLocalStorage = getBooksFromLocalStorage();
        const books = action.payload?.map((book: IBookInfo) => {
          const matchingBook = booksFromLocalStorage.find((b: IBookInfo) => b.isbn13 === book.isbn13);
          if (matchingBook) {
            return { ...book, isLike: matchingBook.isLike, isReade: matchingBook.isReade };
          } else {
            return { ...book, isLike: false, isReade: false };
          }
        });

        state.list = books;
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const { likeBook, readeBook } = booksSlice.actions
export const booksReducer = booksSlice.reducer
