import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {createReviewThunk, findReviewsFromTrailIDThunk} from "../reviews/review-thunks";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks";
import {Link} from "react-router-dom";

function Details() {

    const {currentUser} = useSelector((state) => state.auth);
    const {listedReviews} = useSelector((state) => state.reviews);

    const {trailID} = useParams();
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findTrailReviews();
    }, []);


    const post = () => {
        const review ={
            content: content,
            username: currentUser.username,
            trailID: trailID
        }

        dispatch(createReviewThunk(review));
        findTrailReviews()
    }

    const findTrailReviews = () => {
        dispatch(findReviewsFromTrailIDThunk(trailID));
    }



    return (
        <div>
            <h1> {trailID}</h1>

            <div>
                {currentUser && (
                    <div>
                        <label>Write a Review: </label>
                        <input type="text"
                               value={content}
                               onChange={(event) => {
                                   setContent(event.target.value);
                               }}
                        />

                        <button onClick={post}>
                            Submit</button>

                    </div>

                )}
            </div>

            <div>

                <ul>
                    {listedReviews.map(review => <li>
                       <h1 onClick={navigate(`/profile/${review.username}`)}>{review.username}</h1>
                        <h3>{review.content}</h3>
                    </li>
                    )}

                </ul>


            </div>

        </div>
    );
}

export default Details;