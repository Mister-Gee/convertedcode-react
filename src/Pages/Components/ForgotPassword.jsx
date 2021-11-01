import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import {forgotPassword} from "../../services/authServices";
import { useState } from '@hookstate/core';
import store from '../../store/store';


const ForgotPassword = () => {
    const initialValues = {
        email: ""
    }

    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const onSubmit = async (value) => {
        try{
            const res = await forgotPassword(value)
            if(res.status === 200){
                alertType.set("success")
                alertMessage.set("Reset Link Sent to your Email")
                alertNotification.set(true)
                setTimeout( () => {
                    alertNotification.set(false)  
                }, 3000)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
    })
    return (
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-green btn-login"
                    >
                        {isSubmitting 
                            ?
                            <Spinner animation="border" size="sm" />
                            :
                            "Reset"
                        }
                    </button>
                </form>
            )}
        </Formik>

    )
}

export default ForgotPassword
