import {registerShop} from '../../../services/authServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';
import React from 'react';


const RegShopForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)
    const {user} = useState(store)

    const [pwdConfirmation, setPwdConfirmation] = React.useState("")

    const initialValues = {
        username: "",
        phone: "",
        referer_id: user.get().id,
        isAdmin: "shop",
        email: "",
        gender: "",
        pwd: "",
    }

    const onSubmit = async (value) => {
        if(pwdConfirmation === value.pwd){
            value.pwd_confirmation = pwdConfirmation
            console.log(value)
            try{
                let res = await registerShop(value)
                const status = res.status
                const data = res.data
                if(status === 201 && data != null){
                    alertType.set("success")
                    alertMessage.set("Shop Registeration Successful")
                    alertNotification.set(true)
                    setTimeout(() => {
                        alertNotification.set(false)
                    }, 1500)   
                }
                else{
                    alertType.set("danger")
                    alertMessage.set("Error")
                    alertNotification.set(true)
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
            alertType.set("danger")
            alertMessage.set("Password Doesn't Match")
            alertNotification.set(true)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        username: Yup.string().required("Username is required"),
        phone: Yup.string().required("Phone Number is required"),
        gender: Yup.string().required("Gender is required"),
        pwd: Yup.string().required("Password is required"),
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
                <form className="pt-3 pl-5 pr-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
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
                            type="text" 
                            className="form-control" 
                            placeholder="UserName" 
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        <small className="form-text text-danger">
                            {errors.username && touched.username && errors.username}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Phone Number" 
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                        />
                        <small className="form-text text-danger">
                            {errors.phone && touched.phone && errors.phone}
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
                    </div>
                    <div className="mr-btn">
                        <button 
                            type="submit" 
                            className="btn-green form-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting 
                            ?
                            <Spinner animation="border" size="sm"/>
                            :
                            "Register Shop"
                            }
                        </button>
                    </div>
                </form>
                )}
            </Formik>
    )
}

export default RegShopForm
