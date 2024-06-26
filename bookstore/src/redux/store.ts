import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from './booksSlice'
import { bookReducer } from './bookSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
