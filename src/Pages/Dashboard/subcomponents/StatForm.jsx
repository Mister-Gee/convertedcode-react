import {postStat} from '../../../services/statService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';


const StatForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        content: "",
    }

    const onSubmit = async (value) => {
        try{
            let res = await postStat(value)
            console.log(res)
            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Stat Posted")
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
        content: Yup.string().required("Content is required")
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
                            placeholder="Stat" 
                            name="content"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content}
                        />
                        <small className="form-text text-danger">
                            {errors.content && touched.content && errors.content}
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
                            "Post Stat"
                            }
                        </button>
                    </div>
                </form>
                )}
            </Formik>
    )
}

export default StatForm
