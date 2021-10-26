import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import MatchReviews from '../MatchReviews/MatchReviews';
import MatchReview from '../MatchReviews/MatchReview';
import PuntersTips from '../PuntersTips/PuntersTips';
import AvailableOptions from '../AvailableOptions/AvailableOptions';
import AvailableLeagues from '../AvailableLeagues/AvailableLeagues';
import BetTerminologies from '../BetTerminologies/BetTerminologies';
import Terminology from '../BetTerminologies/Terminology';
import ErrorPage from '../ErrorPage/ErrorPage';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';
import Dashboard from '../Dashboard/Dashboard';
import SubscriptionPlans from '../SubscriptionPlans/SubscriptionPlans';
import Support from '../Support/Support';
import Register from '../Register/Register';
import Disclaimer from '../Disclaimer/Disclaimer';

const Routes = () => {
    return (
        <Switch>
            <Route path="/disclaimer">
                <Disclaimer />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/support">
                <Support />
            </Route>
            <Route path="/subscription-plans">
                <SubscriptionPlans />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
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
            <Route path="/terminology/:id">
                <Terminology />
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
            <Route path="/stat/:id">
                <MatchReview />
            </Route>
            <Route path="/hot-stats">
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
    )
}

export default Routes;
