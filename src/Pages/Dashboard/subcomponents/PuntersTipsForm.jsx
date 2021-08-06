const PuntersTipsForm = () => {
    return (
        <form className="pt-3 pl-5 pr-5">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Punter" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Bet Code" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Bookie" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Odds" />
            </div>
            <div className="mr-btn">
                <button type="submit" className="btn-green form-btn">Post</button>
            </div>
        </form>
    )
}

export default PuntersTipsForm
