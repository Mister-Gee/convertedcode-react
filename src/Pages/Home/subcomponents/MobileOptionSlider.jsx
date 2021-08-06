import MobileOption from "./MobileOption";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BarCodeIcon, BulbIcon, ConvertIcon, StarCheckIcon } from "../../Components/SVGicon"

const MobileOptionSlider = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <div className="mt-4 mb-4">
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                containerClass="option-container-mobile"
            >
                <MobileOption text="Punters Tips">
                    <BulbIcon 
                        color="#FFFFFF"
                    />
                </MobileOption>
                <MobileOption text="Free Bet Codes">
                    <BarCodeIcon />
                </MobileOption>
                <MobileOption text="Convert Codes">
                    <ConvertIcon />
                </MobileOption>
                <MobileOption text="Match Reviews">
                    <StarCheckIcon 
                        color="#FFFFFF"
                    />
                </MobileOption>
            </Carousel>
        </div>
    )
}

export default MobileOptionSlider
