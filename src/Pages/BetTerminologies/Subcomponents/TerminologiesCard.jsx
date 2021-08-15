import {Link} from "react-router-dom";

const TerminologiesCard = ({id, title, content}) => {
    return (
        <div className="match-review-card-container card-container">
            <div className="title">  <Link to={`/terminology/${id}`}>{title}</Link></div>
            <div className="desc">{content}...</div>
        </div>
    )
}

export default TerminologiesCard
