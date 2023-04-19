import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
    findUserByUsernameThunk
} from "../services/auth-thunks";


function Profile() {
    const {username} = useParams();
    const [profile, setProfile] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = async () => {
        const action = await dispatch(findUserByUsernameThunk(username))
        if(!action.payload){
            console.log("Profile not found!");
            // navigate("/");
        }
        setProfile(action.payload);
    };

    useEffect(() => {
        getProfile();
    }, []);


    return (
        <div>
            {profile && (
                     <div>
                         <h1>First Name: {profile.firstName}</h1>
                         <h1>Last Name: {profile.lastName}</h1>
                         <h1>Level: {profile.level}</h1>
                     </div>
            )}

        </div>
    );

}
export default Profile;