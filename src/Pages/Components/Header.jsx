import {NavLink, Link} from 'react-router-dom';
import {Formik} from 'formik';

const Header = () => {
    const initialValues = {
        email: "",
        pwd: ""
    }
    const onSubmit = (value) => {
        console.log(value)
    }
    return (
        <header>
            <div className="header-wrapper">
                <div className="logo-section">
                    <img src="./assets/images/logo-color.png" alt="converted code"/>
                    <div className="logo-name">Converted<span>Code</span></div>
                </div>
                <div className="header-nav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/punters-tips">Punters Tips</NavLink>
                    <NavLink to="/match-reviews">Match Reviews</NavLink>
                    <NavLink to="/bet-terminologies">Bet Terminologies</NavLink>
                </div>
                <div className="auth-section">
                    <div className="user-wrapper">
                        <span style={{display: "none"}}>
                            <Formik
                                initialValues = {initialValues}
                                onSubmit = {onSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
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
                                    {errors.email && touched.email && errors.email}
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="pwd"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.pwd}
                                        className="input login-input"
                                    />
                                    {errors.pwd && touched.pwd && errors.pwd}
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="btn-green btn-login"
                                    >
                                        Submit
                                    </button>
                                    </form>
                                )}
                            </Formik>
                            <div className="auth-links">
                                <Link to="/forgotten-password" className="secondary-color link">Forgotten Password?</Link>
                                <Link to="/register" className="primary-color link">Register</Link>
                            </div>
                        </span>
                        <span>
                            <div className="user-details">
                                <div className="user mb-3">
                                    <div className="user-id white user-link-size">#12345</div>
                                    <div className="username white user-link-size  ml-2">Gbenga Fakuade</div>
                                </div>
                                <div className="user-links">
                                    <div className="account">
                                        <Link to="/account" className="primary-color user-link-size"> Account </Link>
                                    </div>
                                    <div className="link-border"></div>
                                    <div className="logout">
                                        <Link to="/logout" className="primary-color user-link-size">Logout</Link>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header
