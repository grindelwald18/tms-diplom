import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchBook } from '../redux/bookSlice';
import { IBookPreview } from '../models';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
export function Book() {
  const { id: bookId } = useParams()
  const book = useSelector((state: RootState) => state.book.item) as IBookPreview
  console.log(book)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBook(String(bookId)))
  }, [dispatch, bookId])

  return (
    <div className="container d-flex flex-column justify-content-center w-75">
      <Link to='/' className='text-decoration-none'> <IoMdArrowRoundBack className='fs-4 my-4' /></Link>
      <h1>{book.title}</h1>
      <div className="d-flex my-3">
        <div className="card-img w-50">
          <img src={`${book.image}`} className="book-image w-75 h-75"/>
        </div>
        <div className="card-info d-flex flex-column gap-4 mt-5 w-50">
          <div className="card-price-rating d-flex justify-content-between">
           <h3 className="card-price">Price: {book.price}</h3>
           <h3 className="card-rating">Rating: {book.rating}</h3>
          </div>
          <div className="card-author d-flex justify-content-between">
            <h4>Authors</h4>
            <div>{book.authors}</div>
          </div>
          <div className="card-publisher d-flex justify-content-between">
            <h4>Publisher</h4>
            <div>{book.publisher}</div>
          </div>
          <div className="card-language d-flex justify-content-between">
            <h4>Language</h4>
            <div>English</div>
          </div>
          <button className="btn btn-warning">Add to cart</button>
        </div>
      </div>
      <div className="card-description">{book.subtitle}</div>
    </div>
  );
}
