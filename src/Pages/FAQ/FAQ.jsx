import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";

const FAQ = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>FAQ | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <div className="faq-wrapper">
                            <span className="head">
                                FAQ
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default FAQ
