import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselHeader = () => {

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    
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
                <div className=''>
                <img src='./assets/images/bannerNew2.png' alt="slider"/>
                    {/* <p className='title'>Welcome To <span className="primary-color">Converted</span><span className="secondary-color">Code</span></p> */}
                </div>
                <div className=''>
                <img src='./assets/images/bannerNew3.png' alt="slider"/>
                    {/* <p className='title'>Welcome To <span className="primary-color">Converted</span><span className="secondary-color">Code</span></p> */}
                </div>
                <div className=''>
                <img src='./assets/images/bannerNew1.png' alt="slider"/>
                    {/* <p className='title'>Welcome To <span className="primary-color">Converted</span><span className="secondary-color">Code</span></p> */}
                </div>
                <div className='slideshow-wrapper' onClick={() => openLink("https://refpasrasw.world/C?tag=d_1172377m_47939c_&site=1172377&ad=47939&urlred=https%3A%2F%2F22betkjs.com%2Fp%2Fsports-general%2Findex_en.php")}>
                <img src='https://refpasrasw.world/img/AdAgent_15/30c7e7fd-4dfb-44fc-9533-7c7930cfd7bc.png' alt="slider"/>
                    <p className='title'></p>
                </div>
                <div className='slideshow-wrapper' onClick={() => openLink("https://refpasrasw.world/C?tag=d_1172377m_47941c_&site=1172377&ad=47941&urlred=https%3A%2F%2Flinks22.com%2Fbonus%2Frules%2Freload-sport%2F")}>
                <img src='https://refpasrasw.world/img/AdAgent_15/b4751667-cf95-4dca-b9c3-d7111410370a.png' alt="slider"/>
                    <p className='title'></p>
                </div>
            </Carousel>
    )
}

export default CarouselHeader
