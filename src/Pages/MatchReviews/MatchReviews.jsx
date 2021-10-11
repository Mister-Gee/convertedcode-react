import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import MatchReviewCard from "./Subcomponents/MatchReviewCard";
// import Banner from "./Subcomponents/Banner";
import {useState, useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {reduceContentDisplay, dateConverter } from '../../utils/Functions';
import {getMatchReviews} from '../../services/matchReviewServices';
// import MatchReviewCarousel from "./Subcomponents/MatchReviewCarousel";

const MatchReviews = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [matchReviews, setMatchReviews] = useState([])
    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    function goToNextPage() {
        if(page < totalPages){
            setPage(page + 1)
        }
     }
   
    function goToPreviousPage() {
        if(page > 1){
            setPage(page - 1)
        }
     }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getMatchReviews(page)
                setMatchReviews(res.data.data)
                setTotalPages(res.data.links.length - 2)
                setCurrentPage(res.data.current_page)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[page])

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Match Reviews | ConvertedCode</title>
            </Helmet>
            {isLoading ?
            <ContentLoader/>
            :
            <>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    {/* <Col lg={12}>
                        <Banner />
                    </Col> */}
                    <Col lg={12} className="section-image">
                        <img className="punters-tips-img" src="./assets/images/match-review.jpg" alt="Match Reviews" />
                    </Col>
                </Row>
                <Row className="mt-2  pl-5">
                    {matchReviews.map(data => (
                    <Col lg={4} className="pl-5 pr-5 mb-4" key={data.id}>
                        <MatchReviewCard 
                            author={data.author}
                            dateTime={dateConverter(data.created_at)}
                            content={reduceContentDisplay(data.content)}
                            title={data.title}
                            id={data.id}
                            imageLink={data.image_dir}
                        />
                    </Col>
                    ))}
                </Row>
                <Row>
                    <Col lg={12} className="btn-container">
                        {page > 1 &&
                        <span onClick={goToPreviousPage} className="btn-green load-more-btn">Previous</span>
                        }
                        <span className="pageNum white">{page !== totalPages && currentPage}</span>
                        {page !== totalPages &&
                        <span onClick={goToNextPage} className="btn-green load-more-btn">Next</span>
                        }
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-carousel-slider">
                    {/* <MatchReviewCarousel 
                        width="100%"
                    />
                    <h1 className="mobile-matchreview-header-text">Match <br /> <span>Reviews</span></h1> */}
                    <img className="punters-tips-img" src="./assets/images/match-review.jpg" alt="Match Reviews" />
                </div>
                <div className="mobile-matchreview-body">
                {matchReviews.map(data => (
                        <MatchReviewCard 
                            key={data.id}
                            author={data.author}
                            dateTime={dateConverter(data.created_at)}
                            content={reduceContentDisplay(data.content)}
                            title={data.title}
                            id={data.id}
                            imageLink={data.image_dir}
                        />
                    ))}
                </div>
                <div className="load-more">
                    {page > 1 &&
                    <span onClick={goToPreviousPage} className="btn-green load-more-btn">Previous</span>
                    }
                    <span className="pageNum white">{page !== totalPages && currentPage}</span>
                    {page !== totalPages &&
                    <span onClick={goToNextPage} className="btn-green load-more-btn">Next</span>
                    }
                </div>
            </div>
            </>
            }
        </Frame>

    )
}

export default MatchReviews
