import Frame from "../Components/Frame";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import {useEffect, useState} from 'react';
import {getBetTermByID} from '../../services/betTermsServices';
import ContentLoader from '../Components/ContentLoader';
import {Container, Row, Col} from 'react-bootstrap';


const Terminology = () => {
    const {id} = useParams()
    const [BetTerms, setBetTerms] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getBetTermByID(id)
                setBetTerms(res.data)
                setIsLoading(false)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetch()
        },[id])

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                {isLoading ? 
                    <title>ConvertedCode</title>
                    :
                    <title>{BetTerms.title} | ConvertedCode</title>
                }
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <>
            <Container fluid className="wrapper">
                <Row>
                    <Col lg={12}>
                        <div className="mr-body-container mt-5">
                            <h3 className="title"> {BetTerms.title} </h3>
                            <div className="match-review-content pl-2 pr-4">
                                <p dangerouslySetInnerHTML={{__html: BetTerms.content}} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mr-body-container mt-3">
                    <h3 className="title"> {BetTerms.title} </h3>
                    <div className="match-review-content pl-2 pr-4">
                        <p dangerouslySetInnerHTML={{__html: BetTerms.content}} />
                    </div>
                </div>
            </div>
            </>
            }
        </Frame>
    )
}

export default Terminology
