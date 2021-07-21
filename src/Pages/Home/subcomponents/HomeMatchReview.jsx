import { Link } from "react-router-dom"
import HomeMatchReviewCard from "./HomeMatchReviewCard"

const HomeMatchReview = () => {
    return (
        <div className="match-review-home offer-section">
            <h3 className="title"><span>Latest</span></h3>
            <div className="header-link mb-3">
                <div className="header">Match Reviews</div>
                <div className="link"> <Link to="./match-reviews">View All</Link> </div>
            </div>
            <div className="match-review-section">
                <div className="card-wrapper">
                    <HomeMatchReviewCard />
                </div>
                <div className="card-wrapper">
                    <HomeMatchReviewCard />
                </div>
                <div className="card-wrapper">
                    <HomeMatchReviewCard />
                </div>
            </div>
        </div>
    )
}

export default HomeMatchReview
