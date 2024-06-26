import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { fetchSearchBooks } from "../redux/booksSlice"
import { BookCard } from "../components/BookCard"


export function SearchBooks() {
  const books = useSelector((state: RootState) => state.books.list)
  const error = useSelector((state: RootState) => state.books.error)
  const isLoading = useSelector((state: RootState) => state.books.isLoading)
  const dispatch = useDispatch<AppDispatch>()
  const { search }: any = useParams()
  console.log(search)

  useEffect(() => {
    dispatch(fetchSearchBooks(search))
  }, [dispatch])

  function renderBooks () {
    if (error) {
      return <div className="text-center fs-5 mt-5">{error}</div>
    }

    if (isLoading) {
      return <div className="text-center fs-5 mt-5">Loading...</div>
    }

    return books?.map((book) => {
      return (
        <BookCard key={book.isbn13} isbn13={book.isbn13} image={book.image} title={book.title} subtitle={book.subtitle} price={book.price} isLike={book.isLike} isReade={book.isReade}/>
      )
    })
  }

  return (
    <>
      <h1 className="text-center">Search results for "{search}"</h1>
      <div className="d-flex flex-wrap justify-content-between gap-3" >
        {renderBooks()}
      </div>
    </>
  )
}
