import {createPuntersTips} from '../../../services/puntersTipsServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';
import React from 'react';

const PuntersTipsForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        punter: "",
        betcode: "",
        bookie: "",
        odds: ""
    }
    
    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("punter", value.punter)
            data.append("betcode", value.betcode)
            data.append("bookie", value.bookie)
            data.append("odds", value.odds)
            let res = await createPuntersTips(data)
            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Punters Tips Posted Successfully")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)  
            }
            else{
                alertType.set("danger")
                alertMessage.set("An Error Occured")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)  
            }
        }   
        catch(err) {
                alertType.set("danger")
                alertMessage.set("An Error Occured")
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)
        }
    }

    const validationSchema = Yup.object({
        punter: Yup.string().required("Punter Name is required"),
        betcode: Yup.string().required("Bet Code is required"),
        bookie: Yup.string().required("Bookie is required"),
        odds: Yup.string().required("Odd is required")
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
                setFieldValue
                /* and other goodies */
            }) => (
                <form className="pt-3 pl-5 pr-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Punter" 
                            name="punter"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.punter}
                        />
                        <small className="form-text text-danger">
                            {errors.punter && touched.punter && errors.punter}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Bet Code" 
                            name="betcode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.betcode}
                        />
                        <small className="form-text text-danger">
                            {errors.betcode && touched.betcode && errors.betcode}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Bookie" 
                            name="bookie"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bookie}
                        />
                        <small className="form-text text-danger">
                            {errors.bookie && touched.bookie && errors.bookie}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Odds" 
                            name="odds"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.odds}
                        />
                        <small className="form-text text-danger">
                            {errors.odds && touched.odds && errors.odds}
                        </small>
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
                            "Post"
                        }
                        </button>
                    </div>
                </form>
            )}
            </Formik>
    )
}

export default PuntersTipsForm
