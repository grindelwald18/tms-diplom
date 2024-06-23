import { BookCard } from "../components/BookCard"
export function Books() {
    const book= [
        {
          "title": "An Introduction to C & GUI Programming, 2nd Edition",
          "subtitle": "",
          "isbn13": "9781912047451",
          "price": "$14.92",
          "image": "https://itbook.store/img/books/9781912047451.png",
          "url": "https://itbook.store/books/9781912047451"
        },
        {
          "title": "Snowflake: The Definitive Guide",
          "subtitle": "Architecting, Designing, and Deploying on the Snowflake Data Cloud",
          "isbn13": "9781098103828",
          "price": "$58.90",
          "image": "https://itbook.store/img/books/9781098103828.png",
          "url": "https://itbook.store/books/9781098103828"
        },
        {
          "title": "Python for Data Analysis, 3rd Edition",
          "subtitle": "Data Wrangling with pandas, NumPy, and Jupyter",
          "isbn13": "9781098104030",
          "price": "$36.18",
          "image": "https://itbook.store/img/books/9781098104030.png",
          "url": "https://itbook.store/books/9781098104030"
      }
      ]

    return (
        <div className="d-flex flex-wrap justify-content-between gap-3" >
            <BookCard key={book[0]?.isbn13} isbn13={book[0]?.isbn13} image={book[0]?.image} title={book[0].title} subtitle={book[0].subtitle} price={book[0].price} />
            <BookCard key={book[1]?.isbn13} isbn13={book[1]?.isbn13} image={book[1]?.image} title={book[1].title} subtitle={book[1].subtitle} price={book[1].price} />
            <BookCard key={book[2]?.isbn13} isbn13={book[2]?.isbn13} image={book[2]?.image} title={book[2].title} subtitle={book[2].subtitle} price={book[2].price} />
        </div>
    )
}