import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";
import {Container, Row, Col, Table} from "react-bootstrap";
import { Parallax } from 'react-scroll-parallax';
import React, {useEffect} from 'react';
import ContentLoader from '../Components/ContentLoader';
import {getPuntersTips, searchPunter} from '../../services/puntersTipsServices';
import {convertDbDateTimeToDate} from '../../utils/Functions';
import { useState } from '@hookstate/core';
import store from '../../store/store';

const PuntersTips = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [puntersTips, setPuntersTips] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [totalPages, setTotalPages] = React.useState(0)


    const [searchInput, setSearchInput] = React.useState("")
    const [isSearched, setIsSearched] = React.useState(false)

    const [rerender, setSetRerender] = React.useState(false)

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const handleSearch = async(e) => {
        if(e.key === 'Enter'){
            if(searchInput !== ""){
                setIsLoading(true)
                const res = await searchPunter(searchInput)
                if(res.status === 200){
                    setPuntersTips(res.data.data)
                    setTotalPages(1)
                    setCurrentPage(0)
                    setIsSearched(true)
                    setIsLoading(false)
                }
                else{
                    setIsLoading(false)
                    alertType.set("danger")
                    alertMessage.set("No Search Result Found")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)
                    }, 1500)  
                }
            }
        }
    }

    const search = async() => {
        if(searchInput !== ""){
                setIsLoading(true)
                const res = await searchPunter(searchInput)
                if(res.status === 200){
                    setPuntersTips(res.data.data)
                    setTotalPages(1)
                    setCurrentPage(0)
                    setIsSearched(true)
                    setIsLoading(false)
                }
                else{
                    setIsLoading(false)
                    alertType.set("danger")
                    alertMessage.set("No Search Result Found")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)
                    }, 1500)  
                }
            }
    }

    const cancel = () => {
        setSetRerender(!rerender)
        setIsSearched(false)
        setSearchInput("")
    }

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
                const res = await getPuntersTips(page)
                setPuntersTips(res.data.data)
                setTotalPages(res.data.links.length - 2)
                setCurrentPage(res.data.current_page)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[page, rerender])
    
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
                        <img className="punters-tips-img" src="./assets/images/punters-tips.jpg" alt="Punters Tips" />
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
                                        {isSearched ?
                                        <div className="input-group-prepend" onClick={cancel}>
                                            <span className="iconify" data-icon="pepicons:times"></span>
                                        </div>
                                        :
                                        <div className="input-group-prepend" onClick={search}>
                                            <span className="iconify" data-icon="bx:bx-search" data-inline="false"></span>
                                        </div>
                                        }
                                        <input 
                                            type="text" 
                                            className="form-control search-input" 
                                            placeholder="Search Punter or bookie" 
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            onKeyDown={(e) => handleSearch(e)}
                                        />
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
                                        <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {puntersTips.map(data => (
                                        <tr key={data.id}>
                                            <td>@{data.punter}</td>
                                            <td> <a href={data.betcode}>View Code</a> </td>
                                            <td> {data.bookie} </td>
                                            <td> {data.odds} </td>
                                            <td> {convertDbDateTimeToDate(data.date_time)} </td>
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
                            {page > 1 &&
                            <span className="prev" onClick={goToPreviousPage}>
                                <span className="iconify" data-icon="ant-design:caret-left-outlined" data-inline="false"></span>
                                Prev
                            </span>
                            }
                            <span className="current">{page !== totalPages && currentPage}</span>
                            {page !== totalPages &&
                                <span className="next" onClick={goToNextPage}>Next <span className="iconify" data-icon="ant-design:caret-right-outlined" data-inline="false"></span>
                            </span>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="mobile-wrapper">
                <div className="mobile-carousel-slider-punter">
                    <img className="punters-tips-img" src="/assets/images/punters-tips.jpg" alt="Punters Tips" />
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
                            {isSearched ?
                                <div className="input-group-prepend" onClick={cancel}>
                                    <span className="iconify" data-icon="pepicons:times"></span>
                                </div>
                                :
                                <div className="input-group-prepend" onClick={search}>
                                    <span className="iconify" data-icon="bx:bx-search" data-inline="false"></span>
                                </div>
                            }
                            <input 
                                type="text" 
                                className="form-control search-input" 
                                placeholder="Search Punter or bookie" 
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => handleSearch(e)}
                            />
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
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puntersTips.map(data => (
                            <tr key={data.id}>
                                <td>@{data.punter}</td>
                                <td> <a href={data.betcode}>View Code</a> </td>
                                <td> {data.bookie} </td>
                                <td> {data.odds} </td>
                                <td> {convertDbDateTimeToDate(data.date_time)} </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination-nav mt-3 mb-3">
                    {page > 1 &&
                    <span className="prev"  onClick={goToPreviousPage}>
                        <span className="iconify" data-icon="ant-design:caret-left-outlined" data-inline="false"></span>
                        Prev
                    </span>
                    }
                    <span className="current">{page !== totalPages && currentPage}</span>
                    {page !== totalPages &&
                        <span className="next"  onClick={goToNextPage}>Next <span className="iconify" data-icon="ant-design:caret-right-outlined" data-inline="false"></span>
                    </span>
                    }
                </div>
            </div>
            </>
        }
        </Frame>
    )
}

export default PuntersTips
