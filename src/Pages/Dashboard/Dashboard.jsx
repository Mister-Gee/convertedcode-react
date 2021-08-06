import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import DashboardCard from "./subcomponents/DashboardCard";
import {useState} from 'react';
import MatchReviewForm from "./subcomponents/MatchReviewForm";
import PuntersTipsForm from "./subcomponents/PuntersTipsForm";
import SubscriptionPlanTable from "../Components/SubscriptionPlanTable";

const Dashboard = () => {
    const [key, setKey] = useState('match-review');

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={4}>
                        <DashboardCard 
                            title="Available Conversion Units"
                            value={200}
                            icon="ci:refresh-02"
                        />
                    </Col>
                    <Col lg={4}>
                        <DashboardCard 
                            title="Total Conversions done"
                            value={12}
                            icon="bi:patch-check-fill"
                        />
                    </Col>
                    <Col lg={4}>
                        <DashboardCard 
                            title="Current Plan"
                            value="Weekend Plan"
                            icon="icon-park-outline:tag"
                        />
                    </Col>
                </Row>
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <div className="admin-post">
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="match-review" title="Match Review">
                                    <MatchReviewForm />
                                </Tab>
                                <Tab eventKey="punters-tips" title="Punters Tips">
                                    <PuntersTipsForm />
                                </Tab>
                                {/* <Tab eventKey="contact" title="Contact">
                                    
                                </Tab> */}
                            </Tabs>
                        </div>
                    </Col>
                </Row>
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <SubscriptionPlanTable />
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default Dashboard
