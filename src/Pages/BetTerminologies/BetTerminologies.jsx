import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import TerminologiesCard from "./Subcomponents/TerminologiesCard";
import {useState, useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {getBetTerms} from '../../services/betTermsServices';
import {reduceContentDisplay} from '../../utils/Functions';


const BetTerminologies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [betTerms, setBetTerms] = useState([])
    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    function goToNextPage() {
        if(page < totalPages){
            setPage(page + 1)
        }
     }
   
    function goToPreviousPage() {
        if(page > 1){
            setPage(page - 1)
        }
     }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getBetTerms(page)
                setBetTerms(res.data.data)
                setTotalPages(res.data.links.length - 2)
                setCurrentPage(res.data.current_page)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [page])

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
                    {/* <Col lg={12}>
                        <div className="bet-term-wrapper">
                            <span className="head">
                                Bet
                            </span>
                            <span className="tail">
                                 Terminologies
                            </span>
                        </div>
                    </Col> */}
                    <Col lg={12}>
                        <img className="punters-tips-img" src="./assets/images/bet-term.jpg" alt="Bet Terminology" />
                    </Col>
                </Row>
                <Row className="mt-5 ml-3 mr-n5 pl-5">
                    {betTerms.map(data => (
                        <Col lg={4} className="mb-4" key={data.id}>
                            <TerminologiesCard 
                                id={data.id}
                                title={data.title}
                                content={reduceContentDisplay(data.content)}
                            />
                        </Col>
                    ))} 
                </Row>
                <Row >
                    <Col lg={12} className="btn-container">
                        {page > 1 &&
                        <span onClick={goToPreviousPage} className="btn-green load-more-btn">Previous</span>
                        }
                        <span className="pageNum white">{page !== totalPages && currentPage}</span>
                        {page !== totalPages &&
                        <span onClick={goToNextPage} className="btn-green load-more-btn">Next</span>
                        }
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="">
                    {/* <h1 className="mobile-term-header-text">Bet <br /> <span>Terminologies</span></h1> */}
                    <img className="punters-tips-img" src="./assets/images/bet-term.jpg" alt="Bet Terminology" />
                </div>
                <div className="mobile-bet-term-body">
                    {betTerms.map(data => (
                        <TerminologiesCard 
                            key={data.id}
                            id={data.id}
                            title={data.title}
                            content={reduceContentDisplay(data.content)}
                        />
                    ))}
                </div>
                <div className="load-more">
                    {page > 1 &&
                    <span onClick={goToPreviousPage} className="btn-green load-more-btn">Previous</span>
                    }
                    <span className="pageNum white">{page !== totalPages && currentPage}</span>
                    {page !== totalPages &&
                    <span onClick={goToNextPage} className="btn-green load-more-btn">Next</span>
                    }
                </div>
            </div>
            </>
            }
        </Frame>
    )
}

export default BetTerminologies
