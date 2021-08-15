import Loader from "react-js-loader";

const ContentLoader = () => {
    return (
        <div className="loader">
            <Loader 
                type="bubble-ping" 
                bgColor={"#2F970C"} 
                size={100} 
            />
        </div>
    )
}

export default ContentLoader
