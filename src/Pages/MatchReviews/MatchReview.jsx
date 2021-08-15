import Frame from "../Components/Frame";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import {useEffect, useState} from 'react';
import {getMatchReviewByID} from '../../services/matchReviewServices';
import ContentLoader from '../Components/ContentLoader';
import { dateConverter } from '../../utils/Functions';
import {Container, Row, Col} from 'react-bootstrap';

const MatchReview = () => {
    const {id} = useParams()
    const [matchReview, setMatchReview] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getMatchReviewByID(id)
                setMatchReview(res.data)
                setIsLoading(false)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetch()
        },[id])

    console.log(matchReview)

    return (
        <Frame>
            {isLoading ?
            <ContentLoader />
            :
            <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{matchReview.title} | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row>
                    <Col lg={12}>
                        <div className="header-container mt-5 mb-3">
                            <div className="match-review-image">
                                <img src={`https://www.convertedcode.com/${matchReview.image_dir}`} alt={matchReview.title} />
                            </div>
                            <div className="sub-header-wrapper">
                                <div className="author-date">
                                    <div className="author">
                                        {matchReview.author}
                                    </div>
                                    <div className="date">
                                        {dateConverter(matchReview.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="mr-body-container mt-3">
                            <h3 className="title"> {matchReview.title} </h3>
                            <div className="match-review-content pl-2 pr-4">
                                <p dangerouslySetInnerHTML={{__html: matchReview.content}} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-image-holder">
                    <img src={`https://www.convertedcode.com/${matchReview.image_dir}`} alt={matchReview.title} />
                </div>
                <div className="mobile-author-date">
                    <div className="author">
                        {matchReview.author}
                    </div>
                    <div className="date">
                        {dateConverter(matchReview.created_at)}
                    </div>
                </div>
                <div className="mr-body-container mt-3">
                    <h3 className="title"> {matchReview.title} </h3>
                    <div className="match-review-content pl-2 pr-4">
                        <p dangerouslySetInnerHTML={{__html: matchReview.content}} />
                    </div>
                </div>
            </div>
            </>
            }
        </Frame>
    )
}

export default MatchReview
