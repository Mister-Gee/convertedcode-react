import { Link } from "react-router-dom";
import HomeMatchReviewCard from "./HomeMatchReviewCard";
import {useState, useEffect} from 'react';
import {getLatestMatchReviews} from '../../../services/matchReviewServices';
import {reduceContentDisplay, dateConverter } from '../../../utils/Functions';
import Loader from "react-js-loader";


const HomeMatchReview = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [matchReviews, setMatchReviews] = useState([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getLatestMatchReviews()
                setMatchReviews(res.data.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    } ,[])

    return (
        <div className="match-review-home offer-section">
            <h3 className="title"><span>Latest</span></h3>
            <div className="header-link mb-3">
                <div className="header">Hot Stats</div>
                <div className="link"> <Link to="./hot-stats">View All</Link> </div>
            </div>
            <div className="match-review-section">
            {isLoading 
                ?
                <div className={"mr-loader"}>
                    <Loader type="bubble-scale" bgColor={"#2F970C"} size={50} />
                </div>
                :
                matchReviews.map(data => (
                    <div className="card-wrapper" key={data.id}>
                        <HomeMatchReviewCard 
                            author={data.author}
                            dateTime={dateConverter(data.created_at)}
                            content={reduceContentDisplay(data.content)}
                            title={data.title}
                            id={data.id}
                            imageLink={data.image_dir}
                            state={data}
                        />
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default HomeMatchReview
