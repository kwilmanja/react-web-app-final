import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findReviewsFromUsernameThunk} from "./review-thunks";



function UserReviews({username}) {
    const [userReviews, setUserReviews] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserReviews = async () => {
        const reviewsInfo = await dispatch(findReviewsFromUsernameThunk(username));
        setUserReviews(reviewsInfo.payload);
    }



    useEffect(() => {
        getUserReviews();
    }, []);

    return (
        <div>
            <h1>User Reviews</h1>


            {userReviews &&
             (
                 <div>
                     <ul>
                         {userReviews.map(review =>
                            <li>{review.content}</li>)
                         }
                     </ul>


                 </div>
             )}

        </div>
    );

}
export default UserReviews;