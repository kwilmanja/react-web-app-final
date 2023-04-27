import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import FollowerFollowed from "../follows/FollowerFollowed";
import UserReviews from "../reviews/UserReview";
import {findAllReviewsThunk} from "../reviews/review-thunks";
import * as authService from "../users/auth-service";



function Profile() {
    const { username } = useParams();
    // const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const edit = () => {
        // setProfile(currentUser);
        navigate('/profile/edit');
    };

    useEffect(() => {
        async function fetchData() {
            let user;
            if(username){
                user = await authService.findUserByUsername(username);
            } else{
                user = await authService.profile();
            }

            setProfile(user);

            console.log('username change');

        }
        fetchData();
    }, [username]);


    return (

        <div>
            {profile && (
                <div>
                    <h1>{profile.username}'s Profile</h1>
                     <div>
                         <h1>First Name: {profile.firstName}</h1>
                         <h1>Last Name: {profile.lastName}</h1>
                         <h1>Level: {profile.level}</h1>
                         <h1>Privacy: {profile.public ? 'Public' : 'Private' }</h1>

                     </div>

                     <button onClick={edit}>Edit</button>

                    <hr/>
                    <FollowerFollowed username={profile.username}/>
                    <hr/>
                    <UserReviews username={profile.username}/>


                </div>
            )}

        </div>
    );

}
export default Profile;