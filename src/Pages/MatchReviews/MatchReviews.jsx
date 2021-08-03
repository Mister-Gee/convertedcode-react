import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import MatchReviewCard from "./Subcomponents/MatchReviewCard";
import {Link} from "react-router-dom";
import Banner from "./Subcomponents/Banner";

const MatchReviews = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Match Reviews | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <Banner />
                    </Col>
                </Row>
                <Row className="mt-5  pl-5">
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                    <Col lg={4} className="pl-5 pr-5 mb-4">
                        <MatchReviewCard />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="btn-container">
                        <Link to="./" className="btn-green load-more-btn">Load More</Link>
                    </Col>
                </Row>
            </Container>
        </Frame>

    )
}

export default MatchReviews
