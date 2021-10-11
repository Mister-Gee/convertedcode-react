import {credit} from '../../../services/conversionService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';


const CreditUnitForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        id: "",
        unit: 0,
        plan: "",
    }

    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("id", value.id)
            data.append("unit", value.unit)
            data.append("plan", value.plan)

            let res = await credit(data)

            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Unit Credited")
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
        id: Yup.string().required("id is required"),
        unit: Yup.string().required("Required"),
        plan: Yup.string().required("Required")
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
                            placeholder="User ID" 
                            name="id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.id}
                        />
                        <small className="form-text text-danger">
                            {errors.id && touched.id && errors.id}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Amount of Unit" 
                            name="unit"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.unit}
                        />
                        <small className="form-text text-danger">
                            {errors.unit && touched.unit && errors.unit}
                        </small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Conversion Plan Name" 
                            name="plan"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.plan}
                        />
                        <small className="form-text text-danger">
                            {errors.plan && touched.plan && errors.plan}
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

export default CreditUnitForm
