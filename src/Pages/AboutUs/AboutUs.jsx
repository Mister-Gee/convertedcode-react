import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import PageHeader from "../Components/PageHeader";

const AboutUs = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About Us | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <PageHeader 
                            title="About Us"
                        />
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default AboutUs
