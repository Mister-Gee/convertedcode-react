import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState, useEffect } from 'react';
import {getLatestAvailableLeague} from '../../../services/availableLeagueServices';
import {getLatestAvailableOptions} from '../../../services/availableOptionServices';
import Loader from "react-js-loader";

const OptionSection = () => {
    const [isLeagueLoading, setIsLeagueLoading] = useState(true)
    const [isOptionLoading, setIsOptionLoading] = useState(true)

    const [leagues, setLeagues] = useState("")
    const [options, setOptions] = useState("")

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getLatestAvailableLeague()
                setLeagues(res.data.data)
                setIsLeagueLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, 
    [])

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getLatestAvailableOptions()
                setOptions(res.data.data)
                setIsOptionLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, 
    [])

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
                        {isOptionLoading 
                            ?
                            <div className={"mr-loader"}>
                                <Loader type="bubble-scale" bgColor={"#2F970C"} size={50} />
                            </div>
                            :
                            options.map(data => (
                            <tr key={data.id}>
                                <td>{data.option}</td>
                                <td>{data.bet9ja === "true" ? <span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{fontSize: 14, color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                                <td>{data.betking === "true" ? <span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{fontSize: 14, color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                                <td>{data.sportybet === "true" ? <span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{fontSize: 14, color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                                <td>{data.bet22 === "true" ? <span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{fontSize: 14, color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                            </tr>
                            ))
                            }
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
                        {isLeagueLoading 
                            ?
                            <div className={"mr-loader"}>
                                <Loader type="bubble-scale" bgColor={"#FFFFFF"} size={50} />
                            </div>
                            :
                            leagues.map(data => (
                                <tr key={data.id}>
                                    <td>{data.league}</td>
                                    <td>{data.status === "true" ? <span style={{fontSize: 12}} className="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> : <span style={{fontSize: 14, color: "red"}} className="iconify" data-icon="uim:times-circle"></span>}</td>
                                </tr>
                            ))
                        }
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
