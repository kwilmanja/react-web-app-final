import {useDispatch, useSelector} from "react-redux";
import {current} from "@reduxjs/toolkit";
import {useEffect, useState} from "react";
import {findAllReviewsThunk} from "../reviews/review-thunks";
import DetailsReview from "../details/DetailsReview";
import HomeTrailCard from "./HomeTrailCard";
import {trailSearchIDThunk} from "../trails/trail-thunks";
import {trailSearchID} from "../trails/trail-service";

export default function Home() {

    const { currentUser } = useSelector((state) => state.auth);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);

    const [trails, setTrails] = useState([]);
    const [borderArray, setBorderArray] = useState([]);
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
                dispatch(findAllReviewsThunk());
                populateBorder();
                const reviewsAction = await dispatch(findAllReviewsThunk());
                const reviews = reviewsAction.payload;
                setReviews(reviews);
                const trailIDs = collectTrailIDs(reviews);
                await findTrails(trailIDs);
        }
        fetchData();
    }, []);

    const findTrails = async (trailIDs) => {

        const newTrails = [];

        for (const trailID of trailIDs) {
            const trail = await trailSearchID(trailID);
            newTrails.push(trail.data[0]);
        }
        console.log(newTrails);

        setTrails(newTrails);

    }

    const collectTrailIDs = (reviews) => {

        const trailIDs = [];

        reviews.forEach((review) => {
            if(!trailIDs.includes(review.trailID)){
                trailIDs.push(review.trailID)
            }
        });

        return trailIDs;

    }

    const populateBorder = () => {

        const imageArray = ['bike2.jpg', 'bike3.jpg'];

        const iterations = 3;

        const newImageArray = [];

        for (let i = 0; i < iterations; i++) {
            for (let j = 0; j < imageArray.length; j++) {
                newImageArray.push(imageArray[j]);
            }
        }

        setBorderArray(newImageArray);
    }

    const image2Style = {
        "width": "100%"
    }

    return (
        <div className="row">

            <div className="col-2">
                {borderArray.map((imageName) =>
                                       <img style={image2Style} src={`images/${imageName}`} alt={'missing'}/>
                )}
            </div>

            <div className="col-8">
                {currentUser && (
                <h1>Hello {currentUser.username}</h1>)}

                <h1>Hello, welcome to React.js</h1>

                <div>
                    {trails.map((trail) =>
                                    <HomeTrailCard trail={trail} reviews={reviews}/>
                    )}

                </div>

            </div>

            <div className="col-2">
                {borderArray.map((imageName) =>
                                     <img style={image2Style} src={`images/${imageName}`} alt={'missing'}/>
                )}
            </div>

        </div>
    );
}