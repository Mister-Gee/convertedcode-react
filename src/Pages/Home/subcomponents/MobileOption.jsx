const MobileOption = ({children, text}) => {
    return (
        <div className="mobile-option-wrapper">
            <div className="icon">
                {children}
            </div>
            <div className="body">
               {text}
            </div>
        </div>
    )
}

export default MobileOption
