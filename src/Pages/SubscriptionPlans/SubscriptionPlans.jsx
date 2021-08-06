import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";
import SubscriptionPlanTable from "../Components/SubscriptionPlanTable";

const SubscriptionPlans = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Subscription Plans | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <SubscriptionPlanTable />
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default SubscriptionPlans
