import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewsFromTrailIDThunk
} from "../reviews/review-thunks";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks";
import {Link} from "react-router-dom";
import {trailSearchID, trailSearchLatLng} from "../trails/trail-service";

function Details() {

    const {currentUser} = useSelector((state) => state.auth);
    const {listedReviews} = useSelector((state) => state.reviews);

    const {trailID} = useParams();
    // const [trail, setTrail] = useState();
    const [trail, setTrail] = useState({_id: trailID, name: 'MockTrail'});

    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findTrailReviews();
        findTrailByID();
    }, []);


    const post = () => {
        const review ={
            content: content,
            username: currentUser.username,
            trailID: trailID,
            trailName: trail.name
        }

        dispatch(createReviewThunk(review));
        findTrailReviews()
    }

    const findTrailByID = async () => {
        if(!trail){
            console.log("Calling API");
            const response = await trailSearchID(trailID);
            const trail = response.data[0];
            setTrail(trail);
        }
    }

    const findTrailReviews = () => {
        dispatch(findReviewsFromTrailIDThunk(trailID));
    }


    const deleteReview = (reviewID) => {
        // dispatch
        console.log('deleting review');
        console.log(reviewID);
    }

    return (
        <div>
            {trail && (
                <div>
                    <h1> {trailID} - {trail.name}</h1>

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
                               <h1>{review.username}</h1>
                                <h3>{review.content}</h3>
                               {currentUser && (currentUser.isAdmin || currentUser.username === review.username) && (
                                   <button className="btn btn-primary float-end" type="button" id="button-addon2"
                                           onClick={async () => {
                                               // console.log(review._id);
                                               await dispatch(deleteReviewThunk(review._id));
                                               findTrailReviews();
                                           }}>Delete</button>
                               )}

                            </li>
                            )}

                        </ul>


                    </div>
                </div>
                )}

        </div>
    );
}

export default Details;