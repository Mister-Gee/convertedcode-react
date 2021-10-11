import Frame from "../Components/Frame";
import {Helmet} from "react-helmet";

const Disclaimer = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Disclaimer | ConvertedCode</title>
            </Helmet>
            <div className="mobile-wrapper">
                <div className="mobile-bet-term-header">
                    <h1 className="mobile-term-header-text">Disclaimer</h1>
                </div>
                <div className="match-review-content pl-2 pr-4">
                <div className="disclamer-section">
                <div className="disclamer-body">
                    <h3 className="title">
                        <strong>Disclamer:</strong> Reasons your games might not be 100% converted or convert all
                    </h3>
                    <ol>
                        <li>If options, teams, matches or leagues selected are not available in your destination bookies, it will be exempted from the final conversion.</li>
                        <li>We can only convert what is available on your secondary bookie website (Teams {"&"} Option).</li>
                        <li>If your game is not converting, check your secondary bookie website to see if its available.</li>
                        <li>Always verify your Converted bookie code for abnormal odds, you can check with your primary code to fact check if you convert the correct option.</li>
                    </ol>
                </div>
            </div>
                </div>
            </div>
        </Frame>
    )
}

export default Disclaimer
