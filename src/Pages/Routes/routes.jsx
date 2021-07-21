import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import MatchReviews from '../MatchReviews/MatchReviews';
import MatchReview from '../MatchReviews/MatchReview';
import PuntersTips from '../PuntersTips/PuntersTips';
import AvailableOptions from '../AvailableOptions/AvailableOptions';
import AvailableLeagues from '../AvailableLeagues/AvailableLeagues';
import BetTerminologies from '../BetTerminologies/BetTerminologies';
import ErrorPage from '../ErrorPage/ErrorPage';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/about-us">
                    <AboutUs />
                </Route>
                <Route path="/faq">
                    <FAQ />
                </Route>
                <Route path="/privacy-policy">
                    <PrivacyPolicy />
                </Route>
                <Route path="/terms-conditions">
                    <TermsAndConditions />
                </Route>
                <Route path="/bet-terminologies">
                    <BetTerminologies />
                </Route>
                <Route path="/available-leagues">
                    <AvailableLeagues />
                </Route>
                <Route path="/available-options">
                    <AvailableOptions />
                </Route>
                <Route path="/match-review">
                    <MatchReview />
                </Route>
                <Route path="/match-reviews">
                    <MatchReviews />
                </Route>
                <Route path="/punters-tips">
                    <PuntersTips />
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route>
                   <ErrorPage />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
