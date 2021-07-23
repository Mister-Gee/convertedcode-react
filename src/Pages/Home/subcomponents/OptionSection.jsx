import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

const OptionSection = () => {
    return (
        <div className="option-container">
           <div className="option-header">
               <div className="option-header-text">Available Conversion Option <div className="triangle"></div></div>
            </div> 
            <div className="option-table">
                <Scrollbars
                    autoHide={false}
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={250}
                    thumbMinSize={30}
                >
                    <Table variant="dark">
                        <thead>
                            <tr>
                                <th>Option</th>
                                <th>Bet9ja</th>
                                <th>Betking</th>
                                <th>SportyBet</th>
                                <th>22Bet</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1x2</td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                            </tr>

                            <tr>
                                <td>Double Chance</td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                            </tr>

                            <tr>
                                <td>Over/Under</td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                            </tr>
                            
                            <tr>
                                <td>DNB</td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                            </tr>

                            <tr>
                                <td>Handicap</td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                                <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                            </tr>
                        </tbody>
                    </Table>
                </Scrollbars>
                <div className="table-btn-section">
                    <Link to="./available-options" className="btn-green">View All</Link>
                </div>
            </div>
            <div className="img-container">
                <img src="./assets/images/sportsgrene.png" alt="sport" />
            </div>
            <div className="sports-section">
                <h3 className="sport-title">
                    Available Sports And Leagues
                </h3>
                <Table striped hover variant="light">
                    <thead>
                        <tr>
                        <th>Sports</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Football</td>
                            <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                        </tr>

                        <tr>
                            <td>EliteSerien (Norway)</td>
                            <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                        </tr>

                        <tr>
                            <td>Allsvenskan (Sweden)</td>
                            <td><span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span></td>
                        </tr>

                        <tr>
                            <td>BasketBall</td>
                            <td><span className="coming-soon">Coming Soon</span></td>
                        </tr>

                        <tr>
                            <td>Hockey</td>
                            <td><span className="coming-soon">Coming Soon</span></td>
                        </tr>
                    </tbody>
                </Table>
                <div className="table-btn-section">
                    <Link to="./available-leagues" className="btn-green">View All</Link>
                </div>
            </div>
        </div>
    )
}

export default OptionSection
