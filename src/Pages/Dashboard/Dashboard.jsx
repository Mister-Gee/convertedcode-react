import { Helmet } from "react-helmet";
import {useHistory} from 'react-router-dom';
import Frame from "../Components/Frame";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import DashboardCard from "./subcomponents/DashboardCard";
import React,  {useEffect} from 'react';
import MatchReviewForm from "./subcomponents/MatchReviewForm";
import PuntersTipsForm from "./subcomponents/PuntersTipsForm";
import BetTermForm from "./subcomponents/BetTermForm";
import AvailableLeagueForm from "./subcomponents/AvailableLeagueForm";
import AvailableOptionForm from "./subcomponents/AvailableOptionForm";
import SubscriptionPlanTable from "../Components/SubscriptionPlanTable";
import {getFromLocalStorage} from '../../utils/Functions';
import { useState } from '@hookstate/core';
import store from '../../store/store';


const Dashboard = () => {
    let history = useHistory()
    const [key, setKey] = React.useState('match-review');

    useEffect(() => {
        const token = getFromLocalStorage("returnToken")
        if(!token){
            history.push({
                pathname: "/"
            })
        } 
    } ,[])
    
    const {user} = useState(store)
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | ConvertedCode</title>
            </Helmet>
            <>
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
                {user.get().isAdmin === "true"
                &&
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
                                <Tab eventKey="bet-term" title="Bet Terminology">
                                    <BetTermForm />
                                </Tab>
                                <Tab eventKey="available-league" title="Available League">
                                    <AvailableLeagueForm />
                                </Tab>
                                <Tab eventKey="available-option" title="Available Option">
                                    <AvailableOptionForm />
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
                }
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <SubscriptionPlanTable />
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-cards mt-3">
                    <DashboardCard 
                        title="Available Conversion Units"
                        value={200}
                        icon="ci:refresh-02"
                    />
                    <DashboardCard 
                        title="Total Conversions done"
                        value={12}
                        icon="bi:patch-check-fill"
                    />
                    <DashboardCard 
                        title="Current Plan"
                        value="Weekend Plan"
                        icon="icon-park-outline:tag"
                    />
                </div>
                {user.get().isAdmin === "true"
                &&
                <div className="admin-post mt-3 mb-2">
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
                        <Tab eventKey="bet-term" title="Bet Terminology">
                            <BetTermForm />
                        </Tab>
                        <Tab eventKey="available-league" title="Available League">
                            <AvailableLeagueForm />
                        </Tab>
                        <Tab eventKey="available-option" title="Available Option">
                            <AvailableOptionForm />
                        </Tab>
                    </Tabs>
                </div>
                }
                <div className="sub-plans mt-3">
                    <SubscriptionPlanTable />
                </div>
            </div>
            </>
        </Frame>
    )
}

export default Dashboard
