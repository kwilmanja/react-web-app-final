import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findFollowedThunk, findFollowerThunk} from "./follows-thunks";
import {profileThunk} from "../users/auth-thunks";



function FollowerFollowed() {
    const [follower, setFollower] = useState(null);
    const [followed, setFollowed] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFollowInformation = async (username) => {
        const followerInfo = await dispatch(findFollowerThunk(username));
        const followedInfo = await dispatch(findFollowedThunk(username));
        // console.log('username');
        // console.log(username);
        // console.log(follower);
        // console.log(followed);
        setFollowed(followedInfo.payload);
        setFollower(followerInfo.payload);
    }



    useEffect(() => {
        async function fetchData() {
            try {
                const actionProfile = await dispatch(profileThunk());
                getFollowInformation(actionProfile.payload.username);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Follow Information</h1>


            {(follower && followed) &&
             (
             <div>
                    <h2>Following: </h2>
                    {followed &&
                     followed.map(follow => <h1 //onClick={navigate(`/profile/${follow.followed}`)}
                         >{follow.followed}</h1>)}
                    <h2>Followers: </h2>
                    {follower &&
                     follower.map(follow => <h1 //onClick={navigate(`/profilej/${follow.follower}`)}
                    >{follow.follower}</h1>)}



                </div>
            )}

        </div>
    );

}
export default FollowerFollowed;