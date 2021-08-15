import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';

const ForgotPassowordForm = ({loginAction}) => {
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
        <div className="auth-form">
            <div className="auth-form-header">
                <h3>Forgot Password</h3>
                <p>Sorry you forgot your password,we can assist in setting a new password, enter your registered email below and we would send to you a password reset link </p>
            </div>
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
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="form-control"
                        />
                        <small id="passwordHelpBlock" className="form-text text-danger">
                                {errors.email && touched.email && errors.email}
                        </small>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-orange auth--btn"
                    >
                        {isSubmitting 
                            ?
                            <Spinner animation="border" size="md" />
                            :
                            "Reset"
                        }
                    </button>
                    <div className="auth-misc-link">
                        Already have an Account?<span className="login" onClick={loginAction}>  Log In Now</span>
                    </div>
                </form>
            )}
        </Formik>
        </div>
    )
}

export default ForgotPassowordForm
