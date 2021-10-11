import {Formik} from 'formik';
import { useState } from '@hookstate/core';
import store from '../../../store/store';
import React from "react";
import {register} from '../../../services/authServices';
import {  Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import jwt_decode from 'jwt-decode';
import {Spinner} from 'react-bootstrap';

const SignUpForm = ({loginAction}) => {
    let history = useHistory()

    const [checkbox, setCheckbox] = React.useState(false)
    const [checkboxError, setCheckboxError] = React.useState("")

    const [pwdConfirmation, setPwdConfirmation] = React.useState("")
    const [pwdConfirmationError, setPwdConfirmationError] = React.useState("")

    const {user} = useState(store)
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)
    const {authDrawer} = useState(store)


    const initialValues = {
        email: "",
        username: "",
        gender: "",
        pwd: "",
    }
    
    const onSubmit = async (value) => {
        if(checkbox){
            if(pwdConfirmation === value.pwd){
                value.pwd_confirmation = pwdConfirmation
                try{
                    let res = await register(value)
                    const status = res.status
                    const data = res.data
                    if(status === 201 && data != null){
                        localStorage.setItem("accessToken", data.token)
                        localStorage.setItem("returnToken", data.returnToken)
                        const decoded = jwt_decode(data.returnToken)
                        user.set(decoded[0])
                        alertType.set("success")
                        alertMessage.set("Registeration Successful")
                        alertNotification.set(true)
                        authDrawer.set(false)
                        setTimeout(() => {
                            alertNotification.set(false)
                            history.push({
                                pathname: "/dashboard"
                            })
                        }, 500)   
                        // setReturnToken(data.returnToken)
                    }
                    else{
                        alertType.set("danger")
                        alertMessage.set("Error")
                        alertNotification.set(true)
                        authDrawer.set(false)
                        setTimeout(() => {
                            alertNotification.set(false)
                        }, 1500)  
                    }
                }
                catch(err) {
                    alertType.set("danger")
                    alertMessage.set("Error")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)
                    }, 1500)
                }
            }
            else{
                setPwdConfirmationError("Password Doesn't Match")
            }
        }
        else{
            setCheckboxError("Please Tick the box to accept our Terms and Conditions")
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        username: Yup.string().required("Username is required"),
        gender: Yup.string().required("Gender is required"),
        pwd: Yup.string().required("Password is required"),
    })
    return (
        <div className="auth-form">
            <div className="auth-form-header">
                <h3>Create New Account</h3>
            </div>
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
                            <input 
                                className="form-control" 
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <small className="form-text text-danger"> 
                                {errors.email && touched.email && errors.email}
                            </small>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <small className="form-text text-danger"> 
                                {errors.username && touched.username && errors.username}
                            </small>
                        </div>
                        <div className="form-group">
                            <select 
                                className="form-control" 
                                name="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender}
                            >
                                <option value="" disabled selected>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <small className="form-text text-danger"> 
                                {errors.gender && touched.gender && errors.gender}
                            </small>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="password"
                                name="pwd"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pwd}
                            />
                            <small className="form-text text-danger"> 
                                {errors.pwd && touched.pwd && errors.pwd}
                            </small>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="password"
                                name="pwdConfirmation"
                                placeholder="Confirm Password"
                                onChange={(e) => setPwdConfirmation(e.target.value)}
                                value={pwdConfirmation}
                            />
                            <small className="form-text text-danger"> 
                                {pwdConfirmationError}
                            </small>
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input auth-check"
                                htmlFor="tc"
                                type="checkbox"
                                checked={checkbox}
                                onClick={() => setCheckbox(!checkbox)}
                            />
                            <label className="form-check-label auth-check-label" htmlFor="tc">Accept our <Link to="./terms-conditions">Terms {"&"} Conditions</Link> and <Link to="./privacy-policy">Privacy Policy</Link> </label>
                            <small className="form-text text-danger"> 
                                {checkboxError}
                            </small>
                        </div>
                        <div className="form-btns">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-orange auth--btn"
                            >
                                {isSubmitting 
                                    ?
                                    <Spinner animation="border" size="md" />
                                    :
                                    "Create Account"
                                }
                            </button>
                            <div className="auth-misc-link">
                                Already have an Account?<span className="login" onClick={loginAction}>  Log In</span>
                            </div>
                        </div>
                    </form>
                    )}
                </Formik>
        </div>
    )
}

export default SignUpForm
