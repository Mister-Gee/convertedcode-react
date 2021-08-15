import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import {login} from '../../../services/authServices';
import { useState } from '@hookstate/core';
import store from '../../../store/store';
import jwt_decode from 'jwt-decode';

const SignInForm = ({signupAction, forgotPasswordaction}) => {
    let history = useHistory();

    const {user} = useState(store)

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)
    const {authDrawer} = useState(store)

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
                authDrawer.set(false)
                setTimeout(() => {
                    alertNotification.set(false)
                    history.push({
                        pathname: "/dashboard"
                    })
                }, 1500)   
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

    return (
        <div className="auth-form">
            <div className="auth-form-header">
                <h3>Log in to your account</h3>
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
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="form-control"
                            />
                            <small id="passwordHelpBlock" className="form-text text-danger">
                                    {errors.email && touched.email && errors.email}
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="pwd"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pwd}
                                className="form-control"
                            />
                            <small id="passwordHelpBlock" className="form-text text-danger">
                                {errors.pwd && touched.pwd && errors.pwd}
                            </small>
                        </div>
                        <span className="forgot-pwd" onClick={forgotPasswordaction}>Forgot Password</span>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-green auth--btn"
                        >
                            {isSubmitting 
                                ?
                                <Spinner animation="border" size="md" />
                                :
                                "Log In"
                            }
                        </button>
                        <div className="auth-misc-link">
                        Don’t have an Account?<span className="signup" onClick={signupAction}>  Create account</span>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
