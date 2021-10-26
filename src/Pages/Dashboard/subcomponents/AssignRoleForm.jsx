import {changeUserRole} from '../../../services/authServices';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { useState } from '@hookstate/core';
import store from '../../../store/store';


const AssignRoleForm = () => {
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {alertType} = useState(store)

    const initialValues = {
        id: "",
        role: "false",
    }

    const onSubmit = async (value) => {
        try{
            let res = await changeUserRole(value)

            const status = res.status
            if(status === 201 && res.data != null){
                alertType.set("success")
                alertMessage.set("Role Changed")
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
        role: Yup.string().required("Required")
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
                        <select 
                            type="number" 
                            className="form-control" 
                            placeholder="Role" 
                            name="role"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.role}
                        >
                            <option value="false">Ordinary User</option>
                            <option value="Shop">Shop User</option>
                            <option value="Marketer">Marketer</option>
                            <option value="Editor">Editor</option>
                            <option value="Bet22">22Bet Rep</option>
                            <option value="Bet1x">1xBet Rep</option>
                            <option value="Sportybet">Sportybet Rep</option>
                            <option value="Bet9ja">Bet9ja Rep</option>
                            <option value="Betking">Betking Rep</option>
                        </select>
                        <small className="form-text text-danger">
                            {errors.role && touched.role && errors.role}
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
                            "Assign Role"
                            }
                        </button>
                    </div>
                </form>
                )}
            </Formik>
    )
}

export default AssignRoleForm
