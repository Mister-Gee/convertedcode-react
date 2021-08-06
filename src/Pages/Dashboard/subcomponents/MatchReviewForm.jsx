const MatchReviewForm = () => {
    return (
        <form className="pt-3 pl-5 pr-5">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Title" />
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Message" rows="5"></textarea>
            </div>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
            </div>
            <div className="mr-btn">
                <button type="submit" className="btn-green form-btn">Post</button>
            </div>
        </form>
    )
}

export default MatchReviewForm
