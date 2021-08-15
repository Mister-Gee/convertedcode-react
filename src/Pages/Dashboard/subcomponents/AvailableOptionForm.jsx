import {createAvailableOption} from '../../../services/availableOptionServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';


const AvailableOptionForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        option: "",
        bet22: "",
        betking: "",
        sportybet: "",
        bet9ja: ""
    }

    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("option", value.option)
            data.append("bet22", value.bet22)
            data.append("betking", value.betking)
            data.append("sportybet", value.sportybet)
            data.append("bet9ja", value.bet9ja)

            let res = await createAvailableOption(data)

            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("New Option Added")
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
        option: Yup.string().required("Option is required"),
        bet22: Yup.string().required("Required"),
        betking: Yup.string().required("Required"),
        sportybet: Yup.string().required("Required"),
        bet9ja: Yup.string().required("Required")
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
                            placeholder="Option" 
                            name="option"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.option}
                        />
                        <small className="form-text text-danger">
                            {errors.option && touched.option && errors.option}
                        </small>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="bet22"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bet22}
                        >
                            <option value="" selected disabled>22Bet</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.bet22 && touched.bet22 && errors.bet22}
                        </small>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="bet9ja"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bet9ja}
                        >
                            <option value="" selected disabled>Bet9ja</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.bet9ja && touched.bet9ja && errors.bet9ja}
                        </small>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="betking"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.betking}
                        >
                            <option value="" selected disabled>Betking</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.betking && touched.betking && errors.betking}
                        </small>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="sportybet"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sportybet}
                        >
                            <option value="" selected disabled>SportyBet</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.sportybet && touched.sportybet && errors.sportybet}
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

export default AvailableOptionForm
