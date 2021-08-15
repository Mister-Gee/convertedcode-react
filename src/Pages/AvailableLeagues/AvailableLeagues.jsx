import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col, Table} from "react-bootstrap";
import { useState, useEffect } from 'react';
import {getAvailableLeagues} from '../../services/availableLeagueServices';
import ContentLoader from '../Components/ContentLoader';


const AvailableLeagues = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [leagues, setLeagues] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getAvailableLeagues()
                setLeagues(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, 
    [])

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Available Leagues | ConvertedCode</title>
            </Helmet>
            {isLoading ?
            <ContentLoader/>
            :
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <div className="bet-term-wrapper">
                            <span className="head">
                                Available
                            </span>
                            <span className="tail">
                                 Leagues
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 pt-5">
                    <Col lg={12}>
                        <div className="punters-tips-table-section">
                            <div className="date-search">
                                <div className="date-sort">
                                    <div className="form-group row">
                                        <label for="date" className="col-sm-2 date-label">Sort</label>
                                        <div className="col-sm-10">
                                            <select className="form-control sort-date" name="date" id="date">
                                            {[5, 10, 20, 30].map(data => (
                                                <option value={data}>{data}</option>
                                            ))}
                                            
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="search">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="iconify" data-icon="bx:bx-search" data-inline="false"></span>
                                        </div>
                                        <input type="text" className="form-control search-input" placeholder="Search Available Options" />
                                    </div>
                                </div>
                            </div>
                            <div className="punters-tips-table ml-n2">
                                <Table striped hover variant="dark" size="sm">
                                    <thead>
                                        <tr>
                                        <th>Sports</th>
                                        <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {leagues.map(data => (
                                            <tr key={data.id}>
                                                <td>{data.league}</td>
                                                <td>{data.status === "true" ? <span className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
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
                                <span className="next">Next <span class="iconify" data-icon="ant-design:caret-right-outlined" data-inline="false"></span>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
            }
        </Frame>
    )
}

export default AvailableLeagues
