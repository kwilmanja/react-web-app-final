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
                const reviewsAction = await dispatch(findAllReviewsThunk());
                const reversedReviews = reviewsAction.payload;
                const reviews = reversedReviews.slice();
                reviews.reverse();
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
                trailIDs.unshift(review.trailID)
            }
        });

        return trailIDs;

    }

    const background = {
        "background-image": "url('images/bike2.jpg')",
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center center"
    }

    const image2Style = {
        "width": "100%"
    }

    const header = {
        "color": "white",
        "text-shadow":
    "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000"
    }

    return (
        <div className="row" style={background}>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

            <div className="col-auto col-md-10 col-lg-8 col-xl-6">
                {currentUser && (
                <h1 className="text-center" style={header}>Hello {currentUser.username}</h1>)}

                <h1 className="text-center" style={header}>Mountain Biker Blog</h1>

                <div>
                    {trails.map((trail) =>
                                    <HomeTrailCard trail={trail} reviews={reviews}/>
                    )}

                </div>

            </div>

            <div className="col-md-1 col-lg-2 col-xl-3">

            </div>

        </div>
    );
}