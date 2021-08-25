import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col, Table} from "react-bootstrap";
import { Parallax } from 'react-scroll-parallax';
import {useState, useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {getPuntersTips} from '../../services/puntersTipsServices';

const PuntersTips = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [puntersTips, setPuntersTips] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getPuntersTips()
                setPuntersTips(res.data.data)
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
                <title>Punters Tips | ConvertedCode</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <img className="punters-tips-img" src="./assets/images/punters-tips.png" alt="Punters Tips" />
                    </Col>
                </Row>
                <Row className="mt-3 pt-5">
                    <Col lg={12}>
                        <Parallax
                            tagOuter="figure"
                            y={[20, -30]}
                            x={[0, 0]}
                        >
                        <div className="punters-tips-table-section">
                            <div className="date-search">
                                <div className="date-sort">
                                    <div className="form-group row">
                                        <label for="date" className="col-sm-2 date-label">Date</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control sort-date" name="date" id="date"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="search">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="iconify" data-icon="bx:bx-search" data-inline="false"></span>
                                        </div>
                                        <input type="text" className="form-control search-input" placeholder="Search Punter or bookie" />
                                    </div>
                                </div>
                            </div>
                            <div className="punters-tips-table ml-n2">
                                <Table striped hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                        <th> <span className="punter">Punters</span></th>
                                        <th>Bet Code</th>
                                        <th>Bookie</th>
                                        <th>Odds</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {puntersTips.map(data => (
                                        <tr key={data.id}>
                                            <td>@{data.punter}</td>
                                            <td> <a href={data.betcode}>View Code</a> </td>
                                            <td> {data.bookie} </td>
                                            <td> {data.odds} </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        </Parallax>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg={4}>
                        <div className="pagination-nav">
                            <span className="prev">
                                <span className="iconify" data-icon="ant-design:caret-left-outlined" data-inline="false"></span>
                                Prev
                            </span>
                            <span className="current">1</span>
                                <span className="next">Next <span className="iconify" data-icon="ant-design:caret-right-outlined" data-inline="false"></span>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-carousel-slider">
                    <img className="punters-tips-img" src="/assets/images/punters-tips.png" alt="Punters Tips" />
                </div>
                <div className="mobile-date-search mt-4">
                    <div className="date-sort">
                        <div className="form-group row">
                            <label for="date" className="col-sm-2 date-label">Date</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control sort-date" name="date" id="date"/>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="iconify" data-icon="bx:bx-search" data-inline="false"></span>
                            </div>
                            <input type="text" className="form-control search-input" placeholder="Search Punter or bookie" />
                        </div>
                    </div>
                </div>
                <div className="punters-tips-table ml-n2">
                    <Table striped hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th> <span className="punter">Punters</span></th>
                                <th>Bet Code</th>
                                <th>Bookie</th>
                                <th>Odds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puntersTips.map(data => (
                            <tr key={data.id}>
                                <td>@{data.punter}</td>
                                <td> <a href={data.betcode}>View Code</a> </td>
                                <td> {data.bookie} </td>
                                <td> {data.odds} </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination-nav mt-3 mb-3">
                    <span className="prev">
                        <span className="iconify" data-icon="ant-design:caret-left-outlined" data-inline="false"></span>
                        Prev
                    </span>
                    <span className="current">1</span>
                        <span className="next">Next <span className="iconify" data-icon="ant-design:caret-right-outlined" data-inline="false"></span>
                    </span>
                </div>
            </div>
            </>
        }
        </Frame>
    )
}

export default PuntersTips
