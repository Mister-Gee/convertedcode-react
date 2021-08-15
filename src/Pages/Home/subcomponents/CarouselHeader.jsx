import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselHeader = () => {
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
            >
                <div className='slideshow-wrapper'>
                <img src='./assets/images/header.png' alt="slider"/>
                    <p className='title'>Legend 1</p>
                </div>
                <div className='slideshow-wrapper'>
                <img src='./assets/images/header.png' alt="slider"/>
                    <p className='title'>Legend 2</p>
                </div>
                <div className='slideshow-wrapper'>
                <img src='./assets/images/header.png' alt="slider"/>
                    <p className='title'>Legend 3</p>
                </div>
            </Carousel>
    )
}

export default CarouselHeader
