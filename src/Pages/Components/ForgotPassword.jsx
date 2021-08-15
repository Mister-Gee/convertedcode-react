import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';


const ForgotPassword = () => {
    const initialValues = {
        email: ""
    }

    const onSubmit = async (value) => {
        console.log(value)
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
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
                    <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="input login-input"
                    />
                    {/* <small id="passwordHelpBlock" className="form-text text-danger">
                            {errors.email && touched.email && errors.email}
                    </small> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-green btn-login"
                    >
                        {isSubmitting 
                            ?
                            <Spinner animation="border" size="sm" />
                            :
                            "Reset"
                        }
                    </button>
                </form>
            )}
        </Formik>

    )
}

export default ForgotPassword
