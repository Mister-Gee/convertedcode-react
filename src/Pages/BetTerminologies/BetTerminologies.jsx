import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import TerminologiesCard from "./Subcomponents/TerminologiesCard";
import {Link} from "react-router-dom";

const BetTerminologies = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Bet Terminologies | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <div className="bet-term-wrapper">
                            <span className="head">
                                Bet
                            </span>
                            <span className="tail">
                                 Terminologies
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5 ml-3 mr-n5 pl-5">
                    <Col lg={4} className="mb-4">
                        <TerminologiesCard />
                    </Col>
                    <Col lg={4} className="mb-4">
                        <TerminologiesCard />
                    </Col>
                    <Col lg={4} className="mb-4">
                        <TerminologiesCard />
                    </Col>
                </Row>
                <Row >
                    <Col lg={12} className="btn-container">
                        <Link to="./" className="btn-green load-more-btn">Load More</Link>
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default BetTerminologies
