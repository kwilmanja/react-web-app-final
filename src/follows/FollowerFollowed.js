import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findFollowedThunk, findFollowerThunk} from "./follows-thunks";
import {profileThunk} from "../users/auth-thunks";
import {Link} from "react-router-dom";
import {findUserByUsername} from "../users/auth-service";



function FollowerFollowed({username}) {
    const [follower, setFollower] = useState(null);
    const [followed, setFollowed] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFollowInformation = async () => {
        const followerInfo = await dispatch(findFollowerThunk(username));
        const followedInfo = await dispatch(findFollowedThunk(username));
        setFollowed(followedInfo.payload);
        setFollower(followerInfo.payload);
    }



    useEffect(() => {
        getFollowInformation();
    }, [username]);

    return (
        <div>
            <h1>Follow Information</h1>


            {(follower && followed) &&
             (
             <div>
                    <h2>Following: </h2>
                 <ul>
                    {followed &&
                     followed.map(follow =>
                         <li
                         onClick={async () => {
                             navigate(`/profile/${follow.followed}`);
                         }}
                         >{follow.followed}</li>
                        )}
                 </ul>
                    <h2>Followers: </h2>
                 <ul>
                    {follower &&
                     follower.map(follow => <li onClick={() => {
                         navigate(`/profile/${follow.follower}`)
                     }}
                    >{follow.follower}</li>)}
                 </ul>


                </div>
            )}

        </div>
    );

}
export default FollowerFollowed;