import {Formik} from 'formik';
import {Link} from 'react-router-dom';
import { ConvertIcon } from './SVGicon';
import {useState, useCallback} from 'react';
import Drawer from "react-bottom-drawer";
import MobileConvertForm from './MobileConvertForm';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onClose = useCallback(() => {
        setIsVisible(false);
      }, []);

    const onOpen = useCallback(() => {
        setIsVisible(true);
      }, []);

    const initialValues = {
        email: ""
    }

    const onSubmit = (value) => {
        console.log(value)
    }

    return (
        <>
        <footer className="desktop-footer">
            <div className="footer-container">
                <div className="footer-link-section">
                    <div className="logo-sub">
                        <div className="logo">
                            <img src="./assets/images/logo-white.png" alt="converted code"/>
                            <div className="logo-text">ConvertedCode</div>
                        </div>
                        <div className="subscribe">
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
                                    <div class="input-group mb-2 sub-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="form-control sub-input"
                                        />
                                        <div class="input-group-prepend">
                                            <button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="input-group-text btn-orange sub-btn"
                                            >
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                    {errors.email && touched.email && errors.email}
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="other-links">
                        <h4 className="footer-links-header">Other Links</h4>
                        <ul>
                            <li> <Link to="/about-us">About Us</Link> </li>
                            <li> <Link to="/faq">FAQ</Link> </li>
                            <li> <Link to="/terms-conditions">Terms and Conditions</Link> </li>
                            <li> <Link to="/privacy-policy"> Privacy Policy </Link> </li>
                        </ul>
                    </div>
                    <div className="other-links">
                        <h4 className="footer-links-header">Contact</h4> 
                        <ul>
                            <li> <span className="iconify primary-color mr-2" data-icon="clarity:phone-handset-solid" data-inline="false"></span> Lagos, Nigeria</li>
                            <li> <span className="iconify primary-color mr-2" data-icon="entypo:mail" data-inline="false"></span> Convertedcode@gmail.com</li>
                            <li> <span className="iconify  mr-2" data-icon="flat-color-icons:android-os" data-inline="false"></span> <Link to="/android">Download Android App</Link> </li>
                            <li> <span className="iconify mr-2" data-icon="cib:app-store-ios" data-inline="false"></span> <Link to="/ios">Download iOS App</Link> </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bga-section text-center mt-5">
                    <h4 className="bga-header">Gamble Aware</h4>
                    <div className="bga-body mb-2">Make it a habit to always tap out of your betting app before you place a bet, to give you some time to think it through and help you avoid Bet Regret.</div>
                    <img src="./assets/images/bga.png" alt="Gamble Aware"/>
                    <div className="social-icons mt-3">
                        <a href="https://t.me/joinchat/RVZGQv7w4NAPRGWj" className="icon"><span className="iconify" data-icon="bx:bxl-telegram" data-inline="false"></span></a>
                        <a href="https://twitter.com/convertedcode_1?lang=en" className="icon"><span className="iconify" data-icon="akar-icons:twitter-fill" data-inline="false"></span></a>
                        <a href="/" className="icon"><span className="iconify" data-icon="akar-icons:instagram-fill" data-inline="false"></span></a>
                    </div>
                </div>
                <div className="footer-copy-section">
                    <div className="fcs-wrapper">
                        <div className="copyright">
                            <div className="copyright-body">
                            Copyright © {new Date().getFullYear()} All rights reserved | ConvertedCodes Limited
                            </div>
                            <div className="copyright-credit">
                                Created with <span className="iconify" data-icon="el:heart" data-inline="false" style={{color: "red"}}></span> by <a href="https://wa.me/2347034511563"><span className="iconify" data-icon="fxemoji:ghost" data-inline="false"></span> Ghost</a>
                            </div>
                        </div>
                        <div className="reserved">
                            <span>All Rights Reserved</span>
                            <ul>
                                <li> <Link to="./terms-conditions" className="primary-color">Terms {"&"} Conditions</Link> </li>
                                <li className="ml-3"> <Link to="./privacy-policy" className="primary-color">Privacy Policy</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <footer className="mobile-footer">
            <div className="gamble-aware-text">
                <h3 className="header">
                    Gamble Aware
                </h3>
                <p className="body">
                    Make it a habit to always tap out of your betting app before you place a bet, to give you some time to think it through and help you avoid Bet Regret.
                </p>
            </div>
            <div className="gamble-aware-logo">
                <img src="./assets/images/bga.png" alt="Gamble Aware"/>
            </div>
            <div className="converter-icon-section">
                <div className="icon" onClick={onOpen}>
                    <ConvertIcon />
                </div>
                <div className="text" onClick={onOpen}>
                    Convert Code
                </div>
            </div>
            <Drawer
                isVisible={isVisible}
                onClose={onClose}
                duration={500}
            >
                <MobileConvertForm close={onClose}/>
            </Drawer>
        </footer>
        </>
    )
}

export default Footer;

