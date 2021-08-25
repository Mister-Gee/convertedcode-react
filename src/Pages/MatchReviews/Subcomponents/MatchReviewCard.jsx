import { Link } from "react-router-dom";

const MatchReviewCard = ({imageLink, id, title, content, dateTime, author, state}) => {
    return (
        <div className="match-review-card-container card-container">
            <div className="image">
                <img src={`https://api.convertedcode.com/storage/${imageLink}`} alt={title}/>
            </div>
            <div className="title">
                <Link to={`./match-review/${id}`}> 
                    {title} 
                </Link>
            </div>
            <div className="desc">{content}...</div>
            <div className="author-date">
              {author}  <span className="divider"></span> {dateTime}
            </div>
        </div>
    )
}

export default MatchReviewCard
