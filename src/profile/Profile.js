import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
    findUserByUsernameThunk
} from "../users/auth-thunks.js";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks.js";
import FollowerFollowed from "../follows/FollowerFollowed";
import UserReviews from "../reviews/UserReview";


function Profile() {
    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const edit = () => {
        setProfile(currentUser);
        navigate('/profile/edit');
    };


    return (

        <div>
            {currentUser && (
                <div>
                    <h1>{currentUser.username}'s Profile</h1>
                     <div>
                         <h1>First Name: {currentUser.firstName}</h1>
                         <h1>Last Name: {currentUser.lastName}</h1>
                         <h1>Level: {currentUser.level}</h1>
                         <h1>Privacy: {currentUser.public ? 'Public' : 'Private' }</h1>

                     </div>

                     <button onClick={edit}>Edit</button>

                    <hr/>
                    <FollowerFollowed username={currentUser.username}/>
                    <hr/>
                    <UserReviews username={currentUser.username}/>


                </div>
            )}

        </div>
    );

}
export default Profile;