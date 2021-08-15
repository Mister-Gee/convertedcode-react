import {createAvailableLeague} from '../../../services/availableLeagueServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';

const BetTermForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        league: "",
        status: ""
    }

    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("league", value.league)
            data.append("status", value.status)

            let res = await createAvailableLeague(data)

            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("New League Added")
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
        league: Yup.string().required("League is required"),
        status: Yup.string().required("Required")
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
                            type="text" 
                            className="form-control" 
                            placeholder="League"
                            name="league"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.league} 
                        />
                        <small className="form-text text-danger">
                            {errors.league && touched.league && errors.league}
                        </small>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}    
                        >
                            <option value="" selected disabled>Status</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.status && touched.status && errors.status}
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

export default BetTermForm
