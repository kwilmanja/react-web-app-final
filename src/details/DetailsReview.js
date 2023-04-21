import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteReviewThunk, findReviewsFromTrailIDThunk} from "../reviews/review-thunks";

function DetailsReview({review}) {

    const {currentUser} = useSelector((state) => state.auth);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);

    

    const dispatch = useDispatch();



    const formatDate = (reviewDate) => {
        const date = new Date(reviewDate);
        const now = Date.now();

        const diffInMs = Math.abs(now - date);
        const diffInHours = Math.floor(diffInMs / (60 * 60 * 1000));

        if(diffInHours < 24){
            return (diffInHours) + "h ago";
        } else {
            return "on " + date.toLocaleDateString();

        }
    }





    return(
        <div>

     {/*<li>*/}
     {/*   <h1>{review.username}</h1>*/}
     {/*   <h3>{review.content}</h3>*/}
     {/*   {currentUser && (currentUser.isAdmin || currentUser.username === review.username) && (*/}
     {/*       <button className="btn btn-primary float-end" type="button" id="button-addon2"*/}
     {/*               onClick={async () => {*/}
     {/*                   await dispatch(deleteReviewThunk(review._id));*/}
     {/*                   dispatch(findReviewsFromTrailIDThunk(review.trailID));*/}
     {/*               }}>Delete</button>*/}
     {/*   )}*/}

     {/*</li>*/}

            {review && (review.public || currentFollowed.includes(review.username)
            || (currentUser && currentUser.username === review.username)) &&
             <div>
                 {currentUser && (currentUser.username === review.username
                                  || currentUser.role === "admin") &&
                  <div>

                      <button className="btn btn-danger float-end" type="button" id="button-addon2"
                              onClick={async () => {
                                  await dispatch(deleteReviewThunk(review._id));
                                  dispatch(findReviewsFromTrailIDThunk(review.trailID));
                              }}>Delete</button>
                      <button className="btn btn-warning float-end" type="button" id="button-addon2"
                              onClick={async () => {
                                  await dispatch(deleteReviewThunk(review._id));
                                  dispatch(findReviewsFromTrailIDThunk(review.trailID));
                              }}>Edit</button>
                  </div>
                 }

                <figure>
                    <blockquote className="blockquote">
                        <p className="mb-0">{review.content}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        {review.username} {review.published ? formatDate(review.published) : ''}
                    </figcaption>
                </figure>
             </div>
            }


        </div>
    );
}

export default DetailsReview;