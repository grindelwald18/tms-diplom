import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { IBooksLIst, IBookInfo } from '../models'
import { requestNewBooks } from '../services/books'
import { requestSearchBooks } from '../services/search'
import { addBookToLocalStorage, getBooksFromLocalStorage, addBookToBasket, getBooksFromBasket} from '../utils/workWithLocalStorage'

const initialState: IBooksLIst = {
  list: [] ,
  isLoading: false,
  error: null,
  limit: 10,
  pagesCount: null
}

export const fetchBooks = createAsyncThunk('new/fetchBooks', async (_, { rejectWithValue }) => {
    try {
      return await requestNewBooks()
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  })

export const fetchSearchBooks = createAsyncThunk('search/fetchBooks', async (params: { search: string, page: string }, { rejectWithValue }) => {
    try {
      const { search, page } = params
      return await requestSearchBooks(search, page)
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
    },
    addToBasket: (state, action) => {
      const foundBook = state.list.find((book) => book.isbn13 === action.payload)
      if (foundBook) {
        if (foundBook.inBasket) {
          foundBook.inBasket = false
          addBookToBasket(foundBook)
        } else {
          foundBook.inBasket = true
          addBookToBasket(foundBook)
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
        const bookFromBAsket = getBooksFromBasket();
        const books = action.payload.books?.map((book: IBookInfo) => {
          const matchingBook = booksFromLocalStorage.find((b: IBookInfo) => b.isbn13 === book.isbn13);
          const matchingBookFromBasket = bookFromBAsket.find((b: IBookInfo) => b.isbn13 === book.isbn13);
          if (matchingBook) {
            return {
              ...book,
              isLike: matchingBook.isLike,
              isReade: matchingBook.isReade,
              inBasket: matchingBookFromBasket?.inBasket ?? false,
            };
          } else {
            return {
              ...book,
              isLike: false,
              isReade: false,
              inBasket: matchingBookFromBasket?.inBasket ?? false,
            };
          }
        });

        state.list = books;
        state.isLoading = false;
        state.error = null;
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
        const books = action.payload.books?.map((book: IBookInfo) => {
          const matchingBook = booksFromLocalStorage.find((b: IBookInfo) => b.isbn13 === book.isbn13);
          if (matchingBook) {
            return {
              ...book,
              isLike: matchingBook.isLike,
              isReade: matchingBook.isReade,
              inBasket: matchingBook.inBasket
            };
          } else {
            return {
              ...book,
              isLike: false,
              isReade: false,
              inBasket: false
            };
          }
        });

        state.list = books;
        state.isLoading = false
        state.pagesCount = Math.ceil(action.payload.total / state.limit)
        state.error = null
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const { likeBook, readeBook, addToBasket } = booksSlice.actions
export const booksReducer = booksSlice.reducer
