import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const PuntersTips = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Punters Tips | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4">
                    <Col lg={12}>
                        <img className="punters-tips-img" src="./assets/images/punters-tips.png" alt="Punters Tips" />
                    </Col>
                </Row>
                <Row className="mt-3 pt-5">
                    <Col lg={12}>
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
                                        <tr>
                                            <td>@FarindokibetTip</td>
                                            <td> <Link to="/">View Code</Link> </td>
                                            <td> SportBet </td>
                                            <td> 10 </td>
                                        </tr>
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
        </Frame>
    )
}

export default PuntersTips
