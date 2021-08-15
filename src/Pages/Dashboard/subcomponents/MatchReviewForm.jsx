import {postMatchReview} from '../../../services/matchReviewServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';
import React from 'react';

const MatchReviewForm = () => {   
    const [imageName, setImageName] = React.useState(null) 
    const {user} = useState(store)
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        title: "",
        content: "",
        author: user.get().username,
        image_dir: ""
    }
    
    const onSubmit = async (value) => {
        try{
            const data = new FormData()
            data.append("title", value.title)
            data.append("content", value.content)
            data.append("image_dir", value.image_dir)
            data.append("author", value.author)
            let res = await postMatchReview(data)
            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Match Review Posted Successfully")
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
                setFieldValue
                /* and other goodies */
            }) => (
                <form className="pt-3 pl-5 pr-5" onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <div className="custom-file">
                        <input 
                            name="image_dir"
                            type="file" 
                            className="custom-file-input"
                            onChange={(e) => {
                                setImageName(e.target.files[0].name)
                                setFieldValue("image_dir", e.target.files[0]);
                            }}
                            required 
                        />
                        <label className="custom-file-label">{imageName ? imageName : "Choose File..."}</label>
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

export default MatchReviewForm
