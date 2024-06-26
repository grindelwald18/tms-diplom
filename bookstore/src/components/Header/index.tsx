import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoGlobeOutline } from "react-icons/io5"
import { CiShoppingBasket } from "react-icons/ci";

export function Header() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

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
          <NavLink className="nav-link px-2" to="/books/like">Like Books</NavLink>
          <NavLink className="nav-link px-2" to="/books/reade">Read Books</NavLink>
          <NavLink className="nav-link px-2" to="/basket"><CiShoppingBasket className='fs-4'/></NavLink>
        </div>
      </div>
    </nav>
  );
}
