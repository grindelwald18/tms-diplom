import { useState, useEffect  } from "react"
import { BookCard } from "../components/BookCard"
import { IBookInfo } from "../models"
import { getBooksFromBasket } from "../utils/workWithLocalStorage"

export function Basket(){
  const books = getBooksFromBasket()
  const [totalCost, setTotalCost]: [number, Function] = useState(0)
  const booksAmount = books?.length

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0
      books.forEach((book: IBookInfo) => {
        total += Number(book.price.split("$")[1])
      })
      setTotalCost(total)
    }
    calculateTotalCost()
  }, [books])

  function renderBooks () {
    return books?.map((book: IBookInfo) => {
      // setTotalCost(totalCost + Number(book.price))
      return (
        <BookCard key={book.isbn13} isbn13={book.isbn13} image={book.image} title={book.title} subtitle={book.subtitle} price={book.price} isLike={book.isLike} isReade={book.isReade}/>
      )
    })
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pb-3 gap-3 border-bottom mb-3">
        <h2 className="">Basket</h2>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-3"><div>Books amount:</div> {booksAmount}</div>
          <div className="d-flex justify-content-between gap-3"><div>Total cost:</div>   {totalCost.toFixed(2)}$</div>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between gap-3" >
        {renderBooks()}
      </div>
    </>
  )
}
