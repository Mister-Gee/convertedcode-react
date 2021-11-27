import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";
import { postSupportMessage } from "../../services/supportService";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../store/store';

const Support = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        email: "",
        name: "",
        message: ""
    }

    const onSubmit = async (value) => {
        try{
            let res = await postSupportMessage(value)
            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Message Sent Successfully")
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
        email: Yup.string().email("Enter a Valid Email").required("Email is required"),
        message: Yup.string().required("Message is required"),
        name: Yup.string().required("Name is required")

    })

    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Support | ConvertedCode</title>
            </Helmet>
            <Container fluid className="support-wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                    <div className="punters-tips-table ml-n2">
                        <h3 className="sub-title">Help { "&" } Support</h3>
                        <p className="help-text"> Do you have a Complaint or Suggestion, Kindly drop it below. </p>
                        <div className="contact">
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
                                            placeholder="Name" 
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        <small className="form-text text-danger">
                                            {errors.name && touched.name && errors.name}
                                        </small>
                                    </div>
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
                                        <textarea 
                                            className="form-control" 
                                            placeholder="Message" 
                                            rows="5"
                                            name="message"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.message}
                                        ></textarea>
                                        <small className="form-text text-danger">
                                            {errors.message && touched.message && errors.message}
                                        </small>
                                    </div>
                                    <div className="mr-btn">
                                        <button type="submit" className="btn-green form-btn" disabled={isSubmitting}>
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
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default Support
