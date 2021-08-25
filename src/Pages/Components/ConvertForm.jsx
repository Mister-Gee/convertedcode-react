import {Link} from 'react-router-dom';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from '@hookstate/core';
import {convert} from '../../services/conversionService';
import store from '../../store/store';
import {Modal} from 'react-bootstrap';
import { io } from 'socket.io-client';
import Loader from "react-js-loader";


const ConvertForm = () => {
    const { REACT_APP_CONVERTEDCODE_SOCKET_URL } = process.env;

    const [tc, setTc] = React.useState(false)
    const [tcError, setTcError] = React.useState("")

    const [modalShow, setModalShow] = React.useState(false)
    const [initError, setInitError] = React.useState("")

    const [totalGames, setTotalGames] = React.useState("")
    const [totalGamesConverted, setTotalGamesConverted] = React.useState("")
    const [game, setGame] = React.useState("")
    const [betCode, setBetCode] = React.useState("")
    const [gameStatus, setGameStatus] = React.useState("")
    const [conversionError, setConversionError] = React.useState("")
    const [unavailableGamesAndOptions, setUnavailableGamesAndOptions] = React.useState([])

    const[isConverting, setIsConverting] = React.useState(true)

    const {user} = useState(store)

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)
    const {conversionUnit} = useState(store)


    const initialValues = {
        code: "",
        from: "Bet9ja",
        to: "Bet9ja" 
    }

    const onSubmit =  async (data) => {
        if(user.get().username){
            if(tc){
              if(conversionUnit.get() > 0){
                setConversionError("")
                setGame("")
                setTotalGames("")
                setTotalGamesConverted("")
                setBetCode("")
                setGameStatus("")
                setIsConverting(true)
                setModalShow(true)
                const socket = io(REACT_APP_CONVERTEDCODE_SOCKET_URL, { reconnection: false }, { reconnectionDelay: 100000 }, { transports: ['websocket', 'polling'] }, { forceNew: false }, { reconnectionDelayMax: 100000, })
                socket.on('connect', function() {
                    socket.emit('my event', data);
                    alertType.set("success")
                    alertMessage.set("Conversion Started...")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)  
                    }, 3000)
                })
                
                socket.on('error', function(data) {
                    setConversionError(data['error'])
                    console.log(data['error'])
                    alertType.set("danger")
                    alertMessage.set("Conversion Error")
                    alertNotification.set(true)
                    socket.disconnect()
                    setTimeout( () => {
                        alertNotification.set(false)  
                    }, 3000)
                    setIsConverting(false)
                })
                socket.on('game', function(data) {
                    setTotalGames(data['game'])
                    console.log(data['game'])
                    setIsConverting(false)
                })
                socket.on('my response', function(data) {
                    // setGame(" ")
                    // setGameStatus(" ")
                    setGame(data['my response'])
                    console.log(data['my response'])   
                    setIsConverting(false)
                })
                socket.on('status', function(data) {
                    // setGameStatus(" ")
                    setGameStatus(data['status'])
                    console.log(data['status'])
                    setIsConverting(false)
                })
                socket.on('totalsuccess', function(data) {
                    setTotalGamesConverted(data['totalsuccess'])
                    console.log(data['totalsuccess'])
                    setIsConverting(false)
                })
                socket.on('bcode', function(data) {
                    setBetCode(data['bcode'])
                    console.log(data['bcode'])
                    setIsConverting(false)
                })
                socket.on('unavailable', function(data) {
                    setUnavailableGamesAndOptions(data['unavailableGamesAndOptions'])
                    console.log(data['unavailableGamesAndOptions'])
                    setIsConverting(false)
                })
                socket.on('disconnect', async () => {
                    await convert(user.get().id)
                    alertType.set("success")
                    alertMessage.set("Conversion Completed")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)  
                    }, 3000)
                })
              } 
              else{
                setModalShow(true)
                setInitError("You have Run out of conversion Unit, <a href='./subscription-plans'>Click Here</a> to buy more units")
                setIsConverting(false)
              } 
            }
            else{
                setTcError("Kindly accept our Terms and Conditions")
            }
        }
        else{
            alertType.set("danger")
            alertMessage.set("Kindly Login or Register to Convert your Games")
            alertNotification.set(true)
            setTimeout( () => {
                alertNotification.set(false)  
            }, 3000)
        }
    }

    const validationSchema = Yup.object({
        code: Yup.string().required("Bet Code is required"),
        from: Yup.string().required("Required"),
        to: Yup.string().required("Required")

    })

    const handleCodeCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
        alertType.set("success")
        alertMessage.set("Code Copied to Clipboard")
        alertNotification.set(true)
        setTimeout(() => {
            alertNotification.set(false)
        }, 3000)
    }

    return (
        <div className="converter-wrapper">
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="converter-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Conversion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isConverting ?
                    <div className="loading-game">
                        <Loader type="bubble-scale" bgColor={"#2F970C"} size={50} />
                    </div>
                    :
                    <>
                    {conversionError &&
                    <div className="text-error text"><span>Error: </span> {conversionError}</div>
                    }
                    {totalGames &&
                    <div className="text"><span>Total Games: </span> {totalGames}</div>
                    }
                    {game &&
                    <div className="text"><span>Game: </span> {game} {gameStatus === "success" ? 
                    <span className="iconify success" data-icon="ant-design:check-outlined"></span> 
                    :
                    gameStatus === "fail" ?
                    <span className="iconify fail" data-icon="clarity:times-line"></span>
                    :
                    ""
                     }
                     </div>
                    }
                    {totalGamesConverted &&
                    <div className="text"><span>Total Games Converted: </span> {totalGamesConverted}</div>
                    }
                    {betCode &&
                    <div className="text"><span>Betcode: </span> {betCode} <span className="copy" onClick={() => handleCodeCopy(betCode)}><span className="iconify" data-icon="fluent:copy-20-filled"></span></span></div>
                    }
                    {unavailableGamesAndOptions.length > 0 &&
                    <div className="unavailable">
                        <div className="unavailable-header">Games/Options Not Found</div>
                        {unavailableGamesAndOptions.map(data => (
                            <div className="game text">
                                {data} 
                            </div>
                        ))}
                        
                    </div>
                    }
                    <div className="initerror" dangerouslySetInnerHTML={{__html: initError}}>
                    </div>
                    </>
                    }
                </Modal.Body>
                </Modal>
            <div className="converter-container">
                <h3 className="title">Convert Your Booking Code</h3>
                <div className="title-underline"></div>
                <div className="converter-form">
                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        isSubmitting,
                        handleBlur,
                        handleSubmit,
                        
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="betcode">Booking Code:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Enter Booking Code Here"
                                    name="code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.code}
                                />
                                <small id="passwordHelpBlock" className="form-text text-danger">
                                    {errors.code && touched.code && errors.code}
                                </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="convertFrom">Convert From:</label>
                                    <select 
                                        className="form-control"
                                        name="from"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.from}
                                    >                            
                                        <option value="Bet9ja">Bet9ja</option>
                                        <option value="Betking">Betking</option>
                                        <option value="Sportybet">SportyBet</option>
                                        <option value="22Bet">22Bet</option>
                                    </select>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        {errors.from && touched.from && errors.from}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="convertTo">Convert To:</label>
                                    <select 
                                        className="form-control" 
                                        name="to"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.to}
                                    >
                                        <option value="Bet9ja">Bet9ja</option>
                                        <option value="Betking">Betking</option>
                                        <option value="Sportybet">SportyBet</option>
                                        <option value="22Bet">22Bet</option>
                                    </select>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        {errors.to && touched.to && errors.to}
                                    </small>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={tc}
                                        onChange={(e) => setTc(e.target.checked)} 
                                    />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Agree to our <Link to="/terms-conditions">Terms {"&"} Conditions</Link>
                                    </label>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        {tc ? "" : tcError}
                                    </small>
                                </div>
                            <button type="submit" className="btn-green btn-convert">Convert Code</button>
                        </form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="disclamer-section">
                <div className="disclamer-body">
                    <h3 className="title">
                        <strong>Disclamer:</strong> Reasons your games might not be 100% converted or convert all
                    </h3>
                    <ol>
                        <li>If options, teams, matches or leagues selected are not available in your destination bookies, it will be exempted from the final conversion.</li>
                        <li>We can only convert what is available on your secondary bookie website (Teams {"&"} Option).</li>
                        <li>If your game is not converting, check your secondary bookie website to see if its available.</li>
                        <li>Always verify your Converted bookie code for abnormal odds, you can check with your primary code to fact check if you convert the correct option.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default ConvertForm;
