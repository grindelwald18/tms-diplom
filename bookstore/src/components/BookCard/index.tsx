import { Link } from "react-router-dom"
import { IBookInfo } from "../../models"
import './style.scss'
export function BookCard(props: IBookInfo) {

  const handleClickImage = () => {
    console.log(props.isbn13)
  }

  return(
    <div className="my-card overflow-hidden d-flex flex-column border-1 gap-3">
      <img onClick={handleClickImage} src={`${props.image}`} className="book-image"/>
      <Link to={`/book/${props.isbn13}`} key={props.isbn13} className="card-body">
        <h3 className="card-title main-title">{props.title}</h3>
        <div className="card-text">{props.subtitle}</div>
        <div className="card-text price">Price: {props.price}</div>
      </Link>
    </div>
    )
}
