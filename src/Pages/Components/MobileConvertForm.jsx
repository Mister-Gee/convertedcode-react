import {Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import { Formik } from 'formik';
import {Table} from 'react-bootstrap';
import * as Yup from 'yup';
import { useState } from '@hookstate/core';
import {convert} from '../../services/conversionService' 
import store from '../../store/store';
import { io } from 'socket.io-client';
import Loader from "react-js-loader";
import {dayToString} from '../../utils/Functions';
import {saveConversion} from '../../services/reportServices';
import {getLatestStat} from '../../services/statService';
import Marquee from "react-fast-marquee";


const MobileConvertForm = ({close}) => {
    const { REACT_APP_CONVERTEDCODE_SOCKET_URL } = process.env;

    const [tc, setTc] = React.useState(false)
    const [tcError, setTcError] = React.useState("")

    const [stat, setStat] = React.useState("")

    const [convertDrawer, setConvertDrawer] = React.useState(false)
    const [conversionState, setConversionState] = React.useState(false)
    const [initError, setInitError] = React.useState("")

    const [totalGames, setTotalGames] = React.useState("")
    const [totalGamesConverted, setTotalGamesConverted] = React.useState("")
    const [game, setGame] = React.useState("")
    const [betCode, setBetCode] = React.useState("")
    const [gameStatus, setGameStatus] = React.useState("")
    const [conversionError, setConversionError] = React.useState("")
    const [unavailableGamesAndOptions, setUnavailableGamesAndOptions] = React.useState([])

    const[isConverting, setIsConverting] = React.useState(false)

    const {user} = useState(store)

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)
    const {conversionUnit} = useState(store)
    const {conversionPlan} = useState(store)

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await getLatestStat()
                setStat(res.data.content)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[])

    const initialValues = {
        code: "",
        from: "Bet9ja",
        to: "Bet9ja" 
    }
    
    const todaysDateObject = new Date()
    const today = todaysDateObject.getDay()
    const dd = String(todaysDateObject.getDate()).padStart(2, '0')
    const mm = String(todaysDateObject.getMonth() + 1).padStart(2, '0')
    const yyyy = todaysDateObject.getFullYear()

    const onSubmit =  async (data) => {
         setConversionState(false)
        setConversionError("")
        setGame("")
        setTotalGames("")
        setTotalGamesConverted("")
        setBetCode("")
        setGameStatus("")
        setUnavailableGamesAndOptions([])
        setInitError("")
        setIsConverting(true)
        setConvertDrawer(true)
        if(user.get().username){
            if(tc){
              if(conversionUnit.get() > 0){
                    if(data.from !== data.to){
                            if(((conversionPlan.get() === "Weekends" || conversionPlan.get() === "Weekend") && (today === 5 || today === 6 || today === 0)) || conversionPlan.get() === "Daily Bonus" ||  conversionPlan.get() === "Daily" || conversionPlan.get() === "Monthly" || conversionPlan.get() === "1 Month" || conversionPlan.get() === "Premium" || conversionPlan.get() === "Ghost Plan" || conversionPlan.get() === "Ghost Plan II" || conversionPlan.get() === "Admin Plan"){

                              const conversionDetails = {
                                bookie_from: data.from,
                                bookie_to: data.to,
                                bet_code: data.code,
                                day: dayToString(today),
                                date: `${dd}/${mm}/${yyyy}`
                              }

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
                              await saveConversion(conversionDetails)
                              socket.on('error', function(data) {
                                  setConversionError(data['error'])
                                  alertType.set("danger")
                                  alertMessage.set("Conversion Error")
                                  alertNotification.set(true)
                                  socket.disconnect()
                                  setTimeout( () => {
                                      alertNotification.set(false)  
                                  }, 3000)
                                  setIsConverting(false)
                              })
                              socket.on('game', async (data) => {
                                  setTotalGames(data['game'])
                                  await convert(user.get().id)
                                  conversionUnit.set(conversionUnit.get() - 1)
                                  setIsConverting(false)
                              })
                              socket.on('my response', function(data) {
                                  setGame(" ")
                                  setGameStatus(" ")
                                  setGame(data['my response']) 
                                  setIsConverting(false)
                              })
                              socket.on('status', function(data) {
                                  setGameStatus(" ")
                                  setGameStatus(data['status'])
                                  setIsConverting(false)
                              })
                              socket.on('totalsuccess', function(data) {
                                  setTotalGamesConverted(data['totalsuccess'])
                                  setIsConverting(false)
                              })
                              socket.on('bcode', function(data) {
                                  setBetCode(data['bcode'])
                                  setConversionState(true)
                                  setIsConverting(false)
                              })
                              socket.on('unavailable', function(data) {
                                  setUnavailableGamesAndOptions(data['unavailableGamesAndOptions'])
                                  setIsConverting(false)
                              })
                              socket.on('disconnect', () => {
                                  alertType.set("success")
                                  alertMessage.set("Conversion Completed")
                                  alertNotification.set(true)
                                  setTimeout(() => {
                                      alertNotification.set(false)  
                                  }, 3000)
                              })
                            }
                            else{
                                setConvertDrawer(true)
                                setInitError("Conversion restricted: Your Plan only limited to weekends")
                                setIsConverting(false)
                            }
                    }
                    else{
                        setConvertDrawer(true)
                        setInitError("You can't convert to the same bookie")
                        setIsConverting(false)  
                    }
              } 
              else{
                setConvertDrawer(true)
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
        <>
        {!convertDrawer ?
        <div className="mobile-converter-wrapper">
            <div className="mobile-converter-container">
                <div className="header">
                    <h3 className="title">Convert Your Booking Code</h3>
                    <div className="icon" onClick={close}>
                    <span className="iconify" data-icon="pepicons:times"></span>
                    </div>
                </div>
                <div className="auth-form mob-converter">
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
                            {/* <label for="betcode">Booking Code:</label> */}
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
                            {/* <label for="convertFrom">Convert From:</label> */}
                            <select 
                                className="form-control" 
                                name="from"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.from}
                            >
                                <option defaultValue disabled>Convert From</option>
                                <option value="Bet9ja">Bet9ja</option>
                                <option value="Betking">Betking</option>
                                <option value="Sportybet">SportyBet</option>
                                <option value="22Bet">22Bet</option>
                                <option value="1xBet">1xBet</option>
                                <option value="Betwinner">Betwinner</option>
                                <option value="Melbet" disabled>Melbet (Coming Soon)</option>
                            </select>
                            <small id="passwordHelpBlock" className="form-text text-danger">
                                {errors.from && touched.from && errors.from}
                            </small>
                        </div>
                        <div className="form-group">
                            {/* <label for="convertTo">Convert To:</label> */}
                            <select 
                                className="form-control" 
                                name="to"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.to}
                            >
                                <option defaultValue disabled>Convert To</option>
                                <option value="Bet9ja">Bet9ja</option>
                                <option value="Betking">Betking</option>
                                <option value="Sportybet">SportyBet</option>
                                <option value="22Bet">22Bet</option>
                                <option value="1xBet" disabled>1xBet (Coming Soon)</option>
                                <option value="Betwinner" disabled>Betwinner (Coming Soon)</option>
                                <option value="Melbet" disabled>Melbet (Coming Soon)</option>
                            </select>
                            <small id="passwordHelpBlock" className="form-text text-danger">
                                {errors.to && touched.to && errors.to}
                            </small>
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="defaultCheck1" 
                                checked={tc}
                                onChange={(e) => setTc(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Agree to our <Link to="/terms-conditions">Terms {"&"} Conditions</Link>
                            </label>
                            <small id="passwordHelpBlock" className="form-text text-danger">
                                {tcError}
                            </small>
                        </div>
                        <button type="submit" className="btn-green auth--btn">Convert Code</button>
                        </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        :
        <div className="mobile-converter-wrapper">
            <div className="mobile-converter-container">
                <div className="header">
                    <h3 className="title">{conversionState ? "Done" : "Converting..."}</h3>
                    <div className="icon" onClick={close}>
                    <span className="iconify" data-icon="pepicons:times"></span>
                    </div>
                </div>
                <div className="auth-form mob-converter">
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
                    <div className="text"><span>Game: </span> {game} <span>{gameStatus === "success" ? 
                    <span><span className="iconify success" data-icon="ant-design:check-outlined"></span></span>
                    :
                    gameStatus === "fail" ?
                    <span><span className="iconify fail" data-icon="clarity:times-line"></span></span>
                    :
                    ""
                     }
                     </span>
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
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Match</th>
                                    <th>Option</th>
                                    <th>Selection</th>
                                </tr>
                            </thead>
                            <tbody>
                        {unavailableGamesAndOptions.map(data => (
                            <tr>
                                <td>{data.Team1} vs {data.Team2}</td>
                                <td>{data.Option}</td>
                                <td>{data.Selection}</td>
                            </tr>
                        ))}
                         </tbody>
                         </Table>
                    </div>
                    }
                    <div className="initerror" dangerouslySetInnerHTML={{__html: initError}}>
                    </div>
                    
                    </>
                    }
                    <Marquee
                        className="stat-container"
                        gradient={false}
                    >
                        <p className="stat-content">{stat}</p>
                    </Marquee>
                    <span className="gobackConv mt-5" onClick={() => setConvertDrawer(false)}><span className="iconify" data-icon="ic:outline-arrow-back-ios-new"></span> Go back/Cancel</span>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default MobileConvertForm;
