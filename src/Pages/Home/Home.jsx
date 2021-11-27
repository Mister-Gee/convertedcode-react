import Frame from "../Components/Frame";
import {Container, Row, Col, Modal} from "react-bootstrap";
import ConvertForm from "../Components/ConvertForm";
import CarouselHeader from "./subcomponents/CarouselHeader";
import OptionSection from "./subcomponents/OptionSection";
import OfferForYou from "./subcomponents/OfferForYou";
import HomeMatchReview from "./subcomponents/HomeMatchReview";
import {Helmet} from "react-helmet";
import { Parallax } from 'react-scroll-parallax';
import MobileOptionSlider from "./subcomponents/MobileOptionSlider";
import MobileMatchReview from "./subcomponents/MobileMatchReview";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


const Home = () => {
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setModalShow(true)
    }, [])    
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | ConvertedCode</title>
            </Helmet>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="converter-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Disclaimer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="white paragraph">When Converting from Russian Bookies (1xbet, 22BET, Melbet and Betwinner) to local Bookies (BET9JA, Betking, SportyBet) do not expect 100% conversion, Reasons are as follows.</p>
                    <ol className="disclaimer-list">
                        <li>Markets/Options are entirely different and unavailable on local bookies, examples…. Players Shot on Target, offsides etc.</li>
                        <li>The games are currently locked.</li>
                        <li> The Sport is not available on local bookies, Example: Horse Race, Badmington, Handball etc.</li>
                    </ol>
                    <p className="white paragraph">In a case where the conversion keeps loading, check:</p>
                    <ol className="disclaimer-list">
                        <li>Your internet.</li>
                        <li>If the booking code is still valid or expire</li>
                        <li> If you are converting a sport that exist in both bookies.</li>
                    </ol>
                </Modal.Body>
                </Modal>
            <Container fluid className="wrapper">
                <Row className="pt-5">
                    <Col lg={2}>
                        <ConvertForm />
                    </Col>
                    <Col lg={8}>
                        <CarouselHeader
                            deviceType="desktop" 
                        />
                        <Parallax
                            tagOuter="figure"
                            y={[20, -25]}
                            x={[0, 0]}
                        >
                            <OfferForYou />
                            <HomeMatchReview />
                        </Parallax>
                    </Col>
                    <Col lg={2}>
                        <OptionSection />
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-carousel-slider">
                    <CarouselHeader/>
                </div>
                <div className="option-slider">
                    <MobileOptionSlider />
                </div>
                <div className="mobile-home-mr-wrapper">
                    <div className="header">
                        <div className="title">Hot Stats</div>
                        <div className="link"> <Link to="./hot-stats">View All</Link> </div>
                    </div>
                    <MobileMatchReview />
                </div>
            </div>
        </Frame>
    )
}

export default Home;
