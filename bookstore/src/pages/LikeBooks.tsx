import { useSelector } from "react-redux"
import { RootState } from '../redux/store'
import { getBooksFromLocalStorage } from '../utils/workWithLocalStorage'
import { BookCard } from "../components/BookCard"
import { IBookInfo } from "../models"
export function LikeBooks() {

  const books = getBooksFromLocalStorage().filter((book:IBookInfo ) => book.isLike)
  const error = useSelector((state: RootState) => state.books.error);
  const isLoading = useSelector((state: RootState) => state.books.isLoading);



  function renderBooks() {
    if (error) {
      return <div className="text-center fs-5 mt-5">{error}</div>;
    }

    if (isLoading) {
      return <div className="text-center fs-5 mt-5">Loading...</div>;
    }

    return books.map((book: IBookInfo) => {
      return (
        <BookCard
          key={book.isbn13}
          isbn13={book.isbn13}
          image={book.image}
          title={book.title}
          subtitle={book.subtitle}
          price={book.price}
          isLike={book.isLike}
          isReade={book.isReade}
        />
      );
    });
  }

  return (
    <>
      <h2 className="text-center">Like books</h2>
      <div className="d-flex flex-wrap justify-content-between gap-3">{renderBooks()}</div>
    </>
  );
}
