import { Col, Container, Row } from "react-bootstrap";
import OfferComponent from "./OfferComponent";
import OfferComponentImg from "./OfferComponentImg";

const OfferForYou = () => {
    return (
        <div className="offer-section">
            <h3 className="title"><span>Offer for you</span></h3>
            <Container className="offer-body">
                <Row>
                    <Col lg={6} className="mb-3">
                        <OfferComponent 
                            icon="bx:bx-refresh"
                            title="Bet Code Conversions"
                            body="The fastest and most reliable bet slip converter. This tool allows you to convert as many betcodes from one betting platform to another."
                        />
                    </Col>
                    <Col lg={6} className="mb-3">
                        <OfferComponent 
                            icon="uil:qrcode-scan"
                            title="Free Bet Codes"
                            body="Find and enjoy the coolest and latest free bet codes. Just sign up to claim your reward. Offer exists for all users!"
                        />
                    </Col>
                    <Col lg={6}>
                        <OfferComponent 
                            icon="teenyicons:bulb-on-outline"
                            title="Punters Tips"
                            body="Saving your precious time by bringing together all the daily bet codes from your favourite Punter (tipster) and Africa Finest tipsters. This page will save you the stress of navigating the internet for daily best bet codes"
                        />
                    </Col>
                    <Col lg={6}>
                        <OfferComponentImg
                            img="./assets/images/star.png"
                            title="Match Reviews"
                            body="We breakdown each match by considering the stats of the team's previous matches, 
                            and provide you the mostly likely outcome. This allows you to make the best possible decision before you place your bet."
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OfferForYou;
