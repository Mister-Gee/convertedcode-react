const OfferComponent = ({img, title, body}) => {
    return (
        <div className="offers">
            <div className="icon">
                <img src={img} alt={title}/>
            </div>
            <div className="title">{title}</div>
            <div className="body">{body}</div>
        </div>
    )
}

export default OfferComponent
