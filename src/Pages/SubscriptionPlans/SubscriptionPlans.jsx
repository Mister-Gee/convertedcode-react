import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";
import SubscriptionPlanTable from "../Components/SubscriptionPlanTable";
import {useState} from 'react';
import ContentLoader from "../Components/ContentLoader";


const SubscriptionPlans = () => {
    const[isLoading, setIsLoading] = useState(false)
    const[reload, setReload] = useState(false)


    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Subscription Plans | ConvertedCode</title>
            </Helmet>
            {isLoading ? 
            <ContentLoader /> 
            :
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <SubscriptionPlanTable 
                            reload={setReload}
                            loader={setIsLoading}
                        />
                    </Col>
                </Row>
            </Container>
            }
        </Frame>
    )
}

export default SubscriptionPlans
