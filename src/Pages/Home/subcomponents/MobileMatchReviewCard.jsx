import {Link} from 'react-router-dom';

const MobileMatchReviewCard = () => {
    return (
        <div className="mobile-card-container">
            <div className="image">
                <img src="./assets/images/match.png" alt="match"/>
            </div>
            <div className="title">  <Link to="./match-review"> Belgium vs Russia</Link></div>
            <div className="desc">This is the sixth meeting between Belgium and Russia at a ma...</div>
            <div className="author-date">
              Gbenga  <span className="divider"></span>  2021-06-19 19:43:25
            </div>
        </div>
    )
}

export default MobileMatchReviewCard
