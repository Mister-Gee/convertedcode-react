import {Link} from 'react-router-dom';
const ConvertForm = () => {
    return (
        <div className="converter-wrapper">
            <div className="converter-container">
                <h3 className="title">Convert Your Booking Code</h3>
                <div className="title-underline"></div>
                <div className="converter-form">
                    <div className="form-group">
                        <label htmlFor="betcode">Booking Code:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="betcode"
                            placeholder="Enter Booking Code Here"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="convertFrom">Convert From:</label>
                        <select className="form-control" id="convertFrom">
                            <option value="Bet9ja">Bet9ja</option>
                            <option value="Betking">Betking</option>
                            <option value="SportyBet">SportyBet</option>
                            <option value="22Bet">22Bet</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="convertTo">Convert To:</label>
                        <select className="form-control" id="convertFrom">
                            <option value="Bet9ja">Bet9ja</option>
                            <option value="Betking">Betking</option>
                            <option value="SportyBet">SportyBet</option>
                            <option value="22Bet">22Bet</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Agree to our <Link to="/terms-conditions">Terms {"&"} Conditions</Link>
                        </label>
                    </div>
                    <button className="btn-green btn-convert">Convert Code</button>
                </div>
            </div>
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
    )
}

export default ConvertForm;
