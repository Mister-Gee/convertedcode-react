import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";
import ConvertForm from "../Components/ConvertForm";
import CarouselHeader from "./subcomponents/CarouselHeader";
import OptionSection from "./subcomponents/OptionSection";
import OfferForYou from "./subcomponents/OfferForYou";
import HomeMatchReview from "./subcomponents/HomeMatchReview";
import {Helmet} from "react-helmet";
import { Parallax } from 'react-scroll-parallax';

const Home = () => {
      
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | ConvertedCode</title>
            </Helmet>
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
                            y={[10, -40]}
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
        </Frame>
    )
}

export default Home;
