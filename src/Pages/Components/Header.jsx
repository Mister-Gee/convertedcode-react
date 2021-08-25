import { NavLink, Link, useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Nav, NavDropdown, Spinner } from 'react-bootstrap';
import React,{ useContext, useEffect } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { HamburgerBarsIcon} from './SVGicon';
import {login, logout} from '../../services/authServices';
import { useState } from '@hookstate/core';
import store from '../../store/store';
import AlertNortification from './AlertNortification';
import jwt_decode from 'jwt-decode';
import {getFromLocalStorage} from '../../utils/Functions';
import { getUserPlan } from '../../services/dashboardService';
import ForgotPassword from './ForgotPassword';

const Header = () => {
    let history = useHistory();

    const [returnToken, setReturnToken] = React.useState(null)
    const [forgotPassword, setForgotPassword] = React.useState(false)
    const [userName, setUserName] = React.useState("")

    const {user} = useState(store)
    const {conversionUnit} = useState(store)
    const {totalConversions} = useState(store)
    const {conversionPlan} = useState(store)

    useEffect(() => {
       const token = getFromLocalStorage("returnToken")
        if(token){
            const decoded = jwt_decode(token)
            setUserName(decoded[0].username)
            user.set(decoded[0])
            setReturnToken(token)
        }
        else{
            setReturnToken(null)
        }
    },[returnToken])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getUserPlan(user.get().id)
                totalConversions.set(res.data.totalConversions)
                conversionPlan.set(res.data.conversionPlan)
                conversionUnit.set(res.data.conversionUnit)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }, [])

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)



    const initialValues = {
        email: "",
        pwd: ""
    }
    
    const onSubmit = async (value) => {
        try{
            let res = await login(value)
            const status = res.status
            const data = res.data
            if(status === 201 && data != null){
                localStorage.setItem("accessToken", data.token)
                localStorage.setItem("returnToken", data.returnToken)
                const decoded = jwt_decode(data.returnToken)
                user.set(decoded[0])
                alertType.set("success")
                alertMessage.set("Login Successful")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                    history.push({
                        pathname: "/dashboard"
                    })
                }, 1500)   
                setReturnToken(data.returnToken)
            }
            else{
                alertType.set("danger")
                alertMessage.set("Invalid Email or Password")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)  
            }
        }
        catch(err) {
                alertType.set("danger")
                alertMessage.set("Invalid Email or Password")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        pwd: Yup.string().required("Password is required")
    })

    const { toggleMenu } = useContext(MenuContext);

    const [navOpen, setNavOpen] = React.useState(false)
    const handleMenuToggle = () => {
        setNavOpen(!navOpen)
        toggleMenu();
    }

    const handleLogout = async () => {
        try{
            let res = await logout()
            if(res.status === 200){
                localStorage.removeItem("accessToken")
                localStorage.removeItem("returnToken")
                user.set({})
                alertType.set("success")
                alertMessage.set(res.data.message)
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1500)
                setReturnToken(null)
                history.push({
                        pathname: "/"
                    })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // if(isLoggedin){
    //     return <Redirect to="/dashboard" />
    // }
    // else if(!isLoggedin){
    //     return <Redirect to="/" />
    // }

    return (        
        <>
        <header className="desktop-header">
            <AlertNortification 
                alertType={alertType.get()}
                notification={alertNotification.get()}
                message={alertMessage.get()}
            />
            <div className="header-wrapper">
                <div className="logo-section">
                    <img src="/assets/images/logo-color.png" alt="converted code" />
                    <div className="logo-name">Converted<span>Code</span></div>
                </div>
                <div className="header-nav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/punters-tips">Punters Tips</NavLink>
                    <NavLink to="/match-reviews">Match Reviews</NavLink>
                    <NavLink to="/bet-terminologies">Bet Terminologies</NavLink>
                </div>
                <div className="auth-section">
                    <div className="user-wrapper">
                        {
                            returnToken
                            ?
                            <span>
                            <div className="user-details">
                                <div className="user mb-3">
                                    <div className="username white user-link-size  ml-3"> {userName} </div>
                                </div>
                                <div className="user-links">
                                    <div className="account">
                                        {/* <Link to="/account" className="primary-color user-link-size"> Account </Link> */}
                                        <Nav>
                                            <NavDropdown
                                                id="nav-dropdown-dark-example"
                                                title="Account"
                                                menuVariant="dark"
                                                className="primary-color user-link-size"
                                            >
                                                <NavDropdown.Item as={Link} to="./dashboard">Dashboard</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item as={Link} to="./subscription-plans">Subcription Plans</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item as={Link} to="./support">Support</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </div>
                                    <div className="link-border"></div>
                                    <div className="logout  user-link-size">
                                        <Link 
                                            to="#"
                                            className="primary-color logout-link"
                                            onClick={() => {
                                                handleLogout()
                                            }}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </span>
                        :
                        <span>
                           {forgotPassword 
                           ?
                           <ForgotPassword />
                           :
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
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="input login-input"
                                        />
                                        {/* <small id="passwordHelpBlock" className="form-text text-danger">
                                             {errors.email && touched.email && errors.email}
                                        </small> */}
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="pwd"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.pwd}
                                            className="input login-input"
                                        />
                                        {/* <small id="passwordHelpBlock" className="form-text text-danger">
                                            {errors.pwd && touched.pwd && errors.pwd}
                                        </small> */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-green btn-login"
                                        >
                                            {isSubmitting 
                                                ?
                                                <Spinner animation="border" size="sm" />
                                                :
                                                "Login"
                                            }
                                        </button>
                                    </form>
                                )}
                            </Formik>
                            }
                            <div className="auth-links">
                                <span 
                                    className="secondary-color link"
                                    onClick={() => setForgotPassword(!forgotPassword)}
                                >
                                    {forgotPassword ? "Login?" : "Forgotten Password?"}
                                </span>
                                <Link to="/register" className="primary-color link">Register</Link>
                            </div>
                        </span>
                    }
                    </div>
                </div>

            </div>
        </header>
        <header className="mobile-header">
            <AlertNortification 
                alertType={alertType.get()}
                notification={alertNotification.get()}
                message={alertMessage.get()}
            />
            <div className="mobile-header-wrapper">
                <div className="drawer-icon" onClick={handleMenuToggle}>
                    {/* {navOpen ? <CancelIcon/> : <HamburgerBarsIcon />}    */}
                    <HamburgerBarsIcon />
                </div>
                <div className="logo-section">
                    <img src="/assets/images/logo-color.png" alt="converted code" />
                    <div className="logo-name">Converted<span>Code</span></div>
                </div>
                <div className="search-icon">
                    <div className="icon">
                        <span className="iconify" data-icon="ic:baseline-search"></span>
                    </div>
                </div>
            </div>
        </header>
        {/* { isLoggedin ? <Redirect to="/dashboard" /> : <Redirect to="/" /> } */}
        </>
    )
}

export default Header;
