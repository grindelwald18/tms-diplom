import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/booksSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { IoGlobeOutline } from "react-icons/io5"
import { CiShoppingBasket } from "react-icons/ci";
import { QuantityMarker } from '../QuantityMarker';

export function Header() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const amountLike = useSelector((state: RootState) => state.books.list.filter((book) => book.isLike).length)
  const amountReade = useSelector((state: RootState) => state.books.list.filter((book) => book.isReade).length)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function handleChangeSearch (event: any) {
      setSearch(event.target.value)
  }

  function handleSubmit (event: any) {
      event.preventDefault()
      navigate(`/posts/search/${search}`)
  }

  return (
    <nav className="navbar border-bottom mb-3">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center gap-2">Book Land <IoGlobeOutline className='fs-4'/></span>
        <div className="navbar-nav flex-row align-items-center">
          <NavLink className="nav-link px-2" aria-current="page" to="/">New Books</NavLink>
          <NavLink className="nav-link px-2" to="/books/all">All Books</NavLink>
          <form className="d-flex align-items-center ms-3" role="search" onSubmit={handleSubmit}>
            <input type="search" className="form-control me-1 w-75" placeholder='Book title' onChange={handleChangeSearch} value={search} />
            <button type="submit" className="btn btn-warning">Search</button>
          </form>
          <NavLink className="nav-link px-2 position-relative" to="/books/like">Like Books <QuantityMarker quantity={amountLike}/></NavLink>
          <NavLink className="nav-link px-2 position-relative" to="/books/reade">Read Books <QuantityMarker quantity={amountReade}/></NavLink>
          <NavLink className="nav-link px-2 position-relative" to="/basket"><CiShoppingBasket className='fs-4'/></NavLink>
        </div>
      </div>
    </nav>
  );
}
