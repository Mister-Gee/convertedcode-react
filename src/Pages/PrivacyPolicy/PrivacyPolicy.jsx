import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";

const PrivacyPolicy = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Privacy Policy | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <div className="bet-term-wrapper">
                            <span className="head">
                                Privacy
                            </span>
                            <span className="tail">
                                 Policy
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default PrivacyPolicy
