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
import CreditUnitForm from "./subcomponents/CreditUnitForm";
import SubscriptionPlanTable from "../Components/SubscriptionPlanTable";
import {getFromLocalStorage} from '../../utils/Functions';
import {getUserPlan} from '../../services/dashboardService';
import { useState } from '@hookstate/core';
import store from '../../store/store';
import ContentLoader from "../Components/ContentLoader";
import { Bar, Line } from 'react-chartjs-2';


const Dashboard = () => {
    let history = useHistory()
    const [key, setKey] = React.useState('match-review')
    const [isLoading, setIsLoading] = React.useState(true);
    const [dashboardReload, setDashboardReload] = React.useState(false)


    useEffect(() => {
        const token = getFromLocalStorage("returnToken")
        if(!token){
            history.push({
                pathname: "/"
            })
        } 
    }, [])

    const {user} = useState(store)
    const {conversionUnit} = useState(store)
    const {totalConversions} = useState(store)
    const {conversionPlan} = useState(store)

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getUserPlan(user.get().id)
                totalConversions.set(res.data.totalConversions)
                conversionPlan.set(res.data.conversionPlan)
                conversionUnit.set(res.data.conversionUnit)
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }, [dashboardReload])

    const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
        label: 'No of Conversions',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(47, 151, 12, 0.7)',
        borderColor: 'rgb(47, 151, 12)',
        borderWidth: 1,
        },
    ],
    };

    const barChartOptions = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    };

    const lineChartData = {
    labels: ['1/10/2021', '2/10/2021', '3/10/2021', '4/10/2021', '5/10/2021', '6/10/2021'],
    datasets: [
        {
        label: 'Daily Conversions',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgba(47, 151, 12, 0.7)',
        borderColor: 'rgb(47, 151, 12)',
        },
    ],
    };

    const lineChartOptions = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
};
    
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | ConvertedCode</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={4}>
                        <DashboardCard 
                            title="Available Conversion Units"
                            value={conversionUnit.get()}
                            icon="ci:refresh-02"
                        />
                    </Col>
                    <Col lg={4}>
                        <DashboardCard 
                            title="Total Conversions done"
                            value={totalConversions.get()}
                            icon="bi:patch-check-fill"
                        />
                    </Col>
                    <Col lg={4}>
                        <DashboardCard 
                            title="Current Plan"
                            value={conversionPlan.get()}
                            icon="icon-park-outline:tag"
                        />
                    </Col>
                </Row>
                {user.get().isAdmin === "true" || user.get().isAdmin === "editor"
                ?
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
                                {user.get().isAdmin === "true" &&
                                    <Tab eventKey="credit-unit" title="Credit Unit(Manual)">
                                        <CreditUnitForm />
                                    </Tab>
                                }
                            </Tabs>
                        </div>
                    </Col>
                </Row>
                :
                ""
                }
                {user.get().isAdmin === "true" &&
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={6}>
                        <div className="admin-post">
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="admin-post">
                            <Bar data={barChartData} options={barChartOptions} />
                        </div>
                    </Col>
                </Row>
                }
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                        <SubscriptionPlanTable 
                            reload={setDashboardReload}
                            loader={setIsLoading}
                        />
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-cards mt-3">
                    <DashboardCard 
                        title="Available Conversion Units"
                        value={conversionUnit.get()}
                        icon="ci:refresh-02"
                    />
                    <DashboardCard 
                        title="Total Conversions done"
                        value={totalConversions.get()}
                        icon="bi:patch-check-fill"
                    />
                    <DashboardCard 
                        title="Current Plan"
                        value={conversionPlan.get()}
                        icon="icon-park-outline:tag"
                    />
                </div>
                {user.get().isAdmin === "true" || user.get().isAdmin === "editor"
                ?
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
                        {user.get().isAdmin === "true" &&
                            <Tab eventKey="credit-unit" title="Credit Unit(Manual)">
                                <CreditUnitForm />
                            </Tab>
                        }
                    </Tabs>
                </div>
                :
                ""
                }

                {user.get().isAdmin === "true" &&
                <>
                <div className="admin-post mt-3 mb-2">
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
                <div className="admin-post mt-3 mb-2">
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
                </>
                }
                <div className="sub-plans mt-3">
                    <SubscriptionPlanTable 
                        reload={setDashboardReload}
                        loader={setIsLoading}
                    />
                </div>
            </div>
            </>
        }
        </Frame>
    )
}

export default Dashboard
