import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MatchReviewCarousel = () => {
    return (
            <Carousel
              dynamicHeight={true}
              showArrows={false}
              showThumbs={false}
              autoPlay={true}
              interval={5000}
              infiniteLoop={true}
              stopOnHover={true}
              preventMovementUntilSwipeScrollTolerance={true}
              width={"90%"}
            >
                <div className='slideshow-wrapper'>
                    <img src='./assets/images/matchreview.png' alt="slider"/>
                </div>
            </Carousel>
    )
}

export default MatchReviewCarousel
