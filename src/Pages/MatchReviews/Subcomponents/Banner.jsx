import MatchReviewCarousel from "./MatchReviewCarousel"

const Banner = () => {
    return (
        <div className="banner-wrapper">
            <div className="carousel-section">
                <MatchReviewCarousel 
                    width="90%"
                />
            </div>
            <div className="title-header">
                <span className="head">
                    Match
                </span>
                <br />
                <span className="tail">
                    Review
                </span>
            </div>
        </div>
    )
}

export default Banner
