import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PageCarousel = (props) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlay={props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container mrcc"
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
              deviceType={props.deviceType}
              dotListClass="mrcdls"
              itemClass="mrci"
            >
              <div>
                  <img src='./assets/images/matchreview.png' alt="slider"/>
              </div>
              <div>
                  <img src='./assets/images/matchreview.png' alt="slider"/>
              </div>
              <div>
                  <img src='./assets/images/matchreview.png' alt="slider"/>
              </div>
              <div>
                  <img src='./assets/images/matchreview.png' alt="slider"/>
              </div>
            </Carousel>
    )
}

export default PageCarousel
