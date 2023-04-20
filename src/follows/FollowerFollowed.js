import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {findFollowedThunk, findFollowerThunk} from "./follows-thunks";



function FollowerFollowed(props) {
    const username = props.username;
    // const {follower, followed} = useSelector((state) => state.follows);
    const [follower, setFollower] = useState(null);
    const [followed, setFollowed] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFollowInformation = async () => {

        const followerInfo = await dispatch(findFollowerThunk(username));
        const followedInfo = await dispatch(findFollowedThunk(username));
        console.log('username');
        console.log(username);
        console.log(follower);
        console.log(followed);
        setFollowed(followedInfo.payload);
        setFollower(followerInfo.payload);
    }

    useEffect(async () => {
        await getFollowInformation();

    }, []);

    return (
        <div>
            <h1>Follow Information</h1>

            {username && ( (follower && followed) || getFollowInformation()) &&
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