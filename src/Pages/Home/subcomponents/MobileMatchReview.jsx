import MobileMatchReviewCard from "./MobileMatchReviewCard";
import {useState, useEffect} from 'react';
import {getLatestMatchReviews} from '../../../services/matchReviewServices';
import {reduceContentDisplay, dateConverter } from '../../../utils/Functions';
import Loader from "react-js-loader";

const MobileMatchReview = () => {
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
        isLoading 
            ?
            <div className={"mr-loader"}>
                <Loader type="bubble-scale" bgColor={"#2F970C"} size={50} />
            </div>
            :
            <div className="mobile-home-match-review">
                {matchReviews.map(data => (
                    <MobileMatchReviewCard 
                        key={data.id}
                        author={data.author}
                        dateTime={dateConverter(data.created_at)}
                        content={reduceContentDisplay(data.content)}
                        title={data.title}
                        id={data.id}
                        imageLink={data.image_dir}
                        state={data}
                    />
                    ))
                }
            </div>
    )
}

export default MobileMatchReview
