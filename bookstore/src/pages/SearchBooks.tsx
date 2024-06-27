import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { fetchSearchBooks } from "../redux/booksSlice"
import { BookCard } from "../components/BookCard"
import { buildPaginationScheme } from "../utils/buildPaginationScheme"

export function SearchBooks() {
  const books = useSelector((state: RootState) => state.books.list)
  const error = useSelector((state: RootState) => state.books.error)
  const isLoading = useSelector((state: RootState) => state.books.isLoading)
  const dispatch = useDispatch<AppDispatch>()
  const { search } = useParams<{search: string}>()
  const { currentPage } = useParams<{currentPage: string}>()
  const pagesCount = useSelector((state: RootState) => state.books.pagesCount)
  const page = currentPage? currentPage : '1'

  useEffect(() => {
    dispatch(fetchSearchBooks({ search: search || '', page: page }))
  }, [dispatch, search, currentPage])

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

  function renderPagination () {
    if (!pagesCount) return null

    const paginationScheme = buildPaginationScheme(page, pagesCount)

    return (
      <ul className="pagination">
        {paginationScheme.map((item, index) => {
          if (item === '...') {
            return (
              <li className="page-item" key={index}>
                <span className="page-link">...</span>
              </li>
            )
          }

          return (
            <li className="page-item" key={index}>
              <Link className="page-link" to={`/books/search/${search}/${item}`}>
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <h1 className="text-center">Search results for "{search}"</h1>
      <div className="d-flex flex-wrap justify-content-between gap-3" >
        {renderBooks()}
      </div>
      <div className="wrapper-pagination mt-4 d-flex justify-content-center">
        {renderPagination()}
      </div>
    </>
  )
}
