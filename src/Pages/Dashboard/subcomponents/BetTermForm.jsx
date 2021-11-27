import {createBetTerm} from '../../../services/betTermsServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';


const BetTermForm = () => {
    const {user} = useState(store)
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        title: "",
        content: ""
    }

    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("title", value.title)
            data.append("content", value.content)
            data.append("author", user.get().username)

            let res = await createBetTerm(data)
            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Bet Terminology Posted Successfully")
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
                alertMessage.set(err.message)
                alertNotification.set(true)
                setTimeout(() => {
                    alertNotification.set(false)
                }, 1000)
        }
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Body is required")
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
                            placeholder="Title" 
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <small className="form-text text-danger">
                            {errors.title && touched.title && errors.title}
                        </small>
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control" 
                            placeholder="Message" 
                            rows="5"
                            name="content"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content}
                            ></textarea>
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
