import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/booksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { IoGlobeOutline } from "react-icons/io5"
import { CiShoppingBasket } from "react-icons/ci";
import { QuantityMarker } from '../QuantityMarker';
import { getBooksFromLocalStorage, getBooksFromBasket } from '../../utils/workWithLocalStorage';

export function Header() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.books.list)
  const booksInStorage = getBooksFromLocalStorage()
  const booksInBasket = getBooksFromBasket()
  const [amountLike, setAmountLike] = useState(0)
  const [amountReade, setAmountReade] = useState(0)
  const [amountBasket, setAmountBasket] = useState(0)

  // const amountLike =  books?.filter((book: any) => book.isLike).length
  // const amountReade = books?.filter((book: any) => book.isReade).length

  useEffect(() => {
    setAmountLike(booksInStorage?.filter((book: any) => book.isLike).length)
    setAmountReade(booksInStorage?.filter((book: any) => book.isReade).length)
  }, [booksInStorage])

  useEffect(() => {
    setAmountBasket(booksInBasket?.length)
  }, [booksInBasket])

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function handleChangeSearch (event: any) {
      setSearch(event.target.value)
  }

  function handleSubmit (event: any) {
      event.preventDefault()
      navigate(`/books/search/${search}`)
  }

  return (
    <nav className="navbar border-bottom mb-3">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center gap-2">Book Land <IoGlobeOutline className='fs-4'/></span>
        <div className="navbar-nav flex-row align-items-center">
          <NavLink className="nav-link px-2" aria-current="page" to="/">New Books</NavLink>
          <form className="d-flex align-items-center ms-3" role="search" onSubmit={handleSubmit}>
            <input type="search" className="form-control me-1 w-75" placeholder='Book title' onChange={handleChangeSearch} value={search} />
            <button type="submit" className="btn btn-warning">Search</button>
          </form>
          <NavLink className="nav-link px-2 position-relative" to="/books/like">Like Books {amountLike ? <QuantityMarker quantity={amountLike}/>: null}</NavLink>
          <NavLink className="nav-link px-2 position-relative" to="/books/reade">Read Books {amountReade ? <QuantityMarker quantity={amountReade}/>: null}</NavLink>
          <NavLink className="nav-link px-2 position-relative" to="/basket"><CiShoppingBasket className='fs-4'/>{amountBasket ? <QuantityMarker quantity={amountBasket}/>: null}</NavLink>
        </div>
      </div>
    </nav>
  );
}
