import {Link} from 'react-router-dom';

const MobileConvertForm = ({close}) => {
    return (
        <div className="mobile-converter-wrapper">
            <div className="mobile-converter-container">
                <div className="header">
                    <h3 className="title">Convert Your Booking Code</h3>
                    <div className="icon" onClick={close}>
                    <span className="iconify" data-icon="pepicons:times"></span>
                    </div>
                </div>
                <div className="converter-form">
                    <div className="form-group">
                        <label for="betcode">Booking Code:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="betcode"
                            placeholder="Enter Booking Code Here"
                        />
                    </div>
                    <div class="form-group">
                        <label for="convertFrom">Convert From:</label>
                        <select class="form-control" id="convertFrom">
                            <option value="Bet9ja">Bet9ja</option>
                            <option value="Betking">Betking</option>
                            <option value="SportyBet">SportyBet</option>
                            <option value="22Bet">22Bet</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="convertTo">Convert To:</label>
                        <select class="form-control" id="convertFrom">
                            <option value="Bet9ja">Bet9ja</option>
                            <option value="Betking">Betking</option>
                            <option value="SportyBet">SportyBet</option>
                            <option value="22Bet">22Bet</option>
                        </select>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                        <label class="form-check-label" for="defaultCheck1">
                            Agree to our <Link to="/terms-conditions">Terms {"&"} Conditions</Link>
                        </label>
                    </div>
                    <button className="btn-green btn-convert">Convert Code</button>
                </div>
            </div>
        </div>
    )
}

export default MobileConvertForm;
