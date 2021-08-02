import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MatchReviewCarousel = (props) => {
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
              width={"100%"}
            >
                <div className='slideshow-wrapper'>
                    <img src='./assets/images/header.png' alt="slider"/>
                </div>
            </Carousel>
    )
}

export default MatchReviewCarousel
