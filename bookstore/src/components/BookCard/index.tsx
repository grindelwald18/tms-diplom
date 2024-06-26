import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { IBookInfo } from "../../models"
import { BsBookmark, BsBookmarkCheck } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { likeBook, readeBook} from "../../redux/booksSlice";
import './style.scss'
export function BookCard(props: IBookInfo) {

  const dispatch = useDispatch<AppDispatch>()

  const checkLike = () => {
    if (props.isLike) {
      return <AiFillLike className='fs-3'/>
    } else {
      return <AiOutlineLike className='fs-3'/>
    }
  }

  const checkIsRead = () => {
    if (props.isReade) {
      return <BsBookmarkCheck className='fs-4'/>
    } else {
      return <BsBookmark className='fs-4'/>
    }
  }

  return(
    <div className="my-card overflow-hidden d-flex flex-column border-1 gap-3">
      <img src={`${props.image}`} className="book-image"/>
      <Link to={`/book/${props.isbn13}`} key={props.isbn13} className="card-body">
        <h3 className="card-title main-title">{props.title}</h3>
      </Link>
        <div className="card-text">{props.subtitle}</div>
        <div className="d-flex justify-content-between">
          <div className="card-text price">Price: {props.price}</div>
          <div className="d-flex gap-2 align-items-center">
            <div onClick={() => dispatch(readeBook(props.isbn13))} className="cursor-pointer">{checkIsRead()}</div>
            <div onClick={() => dispatch(likeBook(props.isbn13))} className="cursor-pointer">{checkLike()}</div>
          </div>
        </div>
    </div>
    )
}
