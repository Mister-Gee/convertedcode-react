import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import TerminologiesCard from "./Subcomponents/TerminologiesCard";
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {getBetTerms} from '../../services/betTermsServices';


const BetTerminologies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [betTerms, setBetTerms] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getBetTerms()
                setBetTerms(res.data.data)
                console.log(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[])

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Bet Terminologies | ConvertedCode</title>
            </Helmet>
            {isLoading ?
            <ContentLoader/>
            :
            <>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <div className="bet-term-wrapper">
                            <span className="head">
                                Bet
                            </span>
                            <span className="tail">
                                 Terminologies
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5 ml-3 mr-n5 pl-5">
                    {betTerms.map(data => (
                        <Col lg={4} className="mb-4" key={data.id}>
                            <TerminologiesCard 
                                id={data.id}
                                title={data.title}
                                content={data.content}
                            />
                        </Col>
                    ))} 
                </Row>
                <Row >
                    <Col lg={12} className="btn-container">
                        <Link to="./" className="btn-green load-more-btn">Load More</Link>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-bet-term-header">
                    <h1 className="mobile-term-header-text">Bet <br /> <span>Terminologies</span></h1>
                </div>
                <div className="mobile-bet-term-body">
                    {betTerms.map(data => (
                        <TerminologiesCard 
                            key={data.id}
                            id={data.id}
                            title={data.title}
                            content={data.content}
                        />
                    ))}
                </div>
                <div className="load-more">
                    <Link to="./" className="btn-green load-more-btn">Load More</Link>
                </div>
            </div>
            </>
            }
        </Frame>
    )
}

export default BetTerminologies
