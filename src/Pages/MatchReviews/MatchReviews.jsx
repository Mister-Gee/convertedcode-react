import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import MatchReviewCard from "./Subcomponents/MatchReviewCard";
import {Link} from "react-router-dom";
import Banner from "./Subcomponents/Banner";
import {useState, useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {reduceContentDisplay, dateConverter } from '../../utils/Functions';
import {getMatchReviews} from '../../services/matchReviewServices';
import MatchReviewCarousel from "./Subcomponents/MatchReviewCarousel";

const MatchReviews = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [matchReviews, setMatchReviews] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getMatchReviews()
                setMatchReviews(res.data.data)
                console.log(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[])

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
                    <Col lg={12}>
                        <Banner />
                    </Col>
                </Row>
                <Row className="mt-5  pl-5">
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
                        <Link to="./" className="btn-green load-more-btn">Load More</Link>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-carousel-slider">
                    <MatchReviewCarousel 
                        width="100%"
                    />
                    <h1 className="mobile-matchreview-header-text">Match <br /> <span>Reviews</span></h1>
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
                    <Link to="./" className="btn-green load-more-btn">Load More</Link>
                </div>
            </div>
            </>
            }
        </Frame>

    )
}

export default MatchReviews
