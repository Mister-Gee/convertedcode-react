import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";
import MessageTable from "./Subcomponent/MessageTable";


const SupportMessage = () => {
    

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Support Messages | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <MessageTable />        
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <MessageTable />
            </div>
        </Frame>
    )
}

export default SupportMessage
