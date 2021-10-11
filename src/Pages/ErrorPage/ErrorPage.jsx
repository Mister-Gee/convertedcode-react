import { Helmet } from "react-helmet";
import {useHistory} from 'react-router-dom';
import Frame from "../Components/Frame";
import {Container, Row, Col} from 'react-bootstrap';


const ErrorPage = () => {
    const history = useHistory()
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>404 | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col>
                        <div className="error">
                            <div className="errorText">
                                <span>404 Error:</span> Page Not Found
                            </div>
                            <div className="goBack">
                                <span onClick={() => history.goBack()}>Go Back to Home</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="match-review-content pl-2 pr-4">
                    <div className="error">
                        <div className="errorText">
                            <span>404 Error:</span> Page Not Found
                        </div>
                        <div className="goBack">
                            <span onClick={() => history.goBack()}>Go Back to Previous Page</span>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    )
}

export default ErrorPage
