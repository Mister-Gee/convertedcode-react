const OfferComponent = ({icon, title, body}) => {
    return (
        <div className="offers">
            <div className="icon">
                <span className="iconify" data-icon={icon} data-inline="false"></span>
            </div>
            <div className="title">{title}</div>
            <div className="body">{body}</div>
        </div>
    )
}

export default OfferComponent
