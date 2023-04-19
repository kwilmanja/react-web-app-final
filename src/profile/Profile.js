import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/auth-thunks.js";
import {findFollowedThunk, findFollowerThunk} from "../follows/follows-thunks.js";
import TrailCard from "../results/TrailCard";


function Profile() {
    const { currentUser } = useSelector((state) => state.auth);
    const {follower, followed} = useSelector((state) => state.follows);

    const [profile, setProfile] = useState(currentUser);
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = async () => {
        // const profile = await userService.profile();
        const action = await dispatch(profileThunk());
        if(!action.payload){
            navigate("/login");
        }
        setProfile(action.payload);
    };

    useEffect(() => {
        getProfile();
        dispatch(findFollowerThunk(profile.username));
        dispatch(findFollowedThunk(profile.username));
    }, []);

    const edit = () => {
        setEditing(true);
    };

    const save = () => {
        dispatch(updateUserThunk(profile));
        setEditing(false);
    };


    return (
        <div>
            {profile && (
                <div>
                    <h1>{profile.username}'s Profile</h1>

                    {editing ?
                     <div>
                         <div>
                             <label>First Name: </label>
                             <input type="text"
                                    value={profile.firstName}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            firstName: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>
                         <div>
                             <label>Last Name: </label>
                             <input type="text"
                                    value={profile.lastName}
                                    onChange={(event) => {
                                        const newProfile = {
                                            ...profile,
                                            lastName: event.target.value,
                                        };
                                        setProfile(newProfile);
                                    }}
                             />
                         </div>

                         <div>
                             <div className="d-inline">
                                 <label htmlFor="exampleSelect1" className="mr-2">Level</label>
                                 <select className="form-select" id="exampleSelect1" onChange={(event) => {
                                     const newProfile = {
                                         ...profile,
                                         level: event.target.value,
                                     };
                                     setProfile(newProfile);
                                 }}>
                                     <option>Beginner</option>
                                     <option>Moderate</option>
                                     <option>Advanced</option>
                                     <option>Expert</option>
                                 </select>
                             </div>

                         </div>

                     </div>
                             :
                     <div>
                         <h1>First Name: {profile.firstName}</h1>
                         <h1>Last Name: {profile.lastName}</h1>
                         <h1>Level: {profile.level}</h1>

                     </div>
                    }




                    {editing ?
                     <button onClick={save}>Save</button> :
                     <button onClick={edit}>Edit</button>
                    }

                    <button
                        onClick={() => {
                            dispatch(logoutThunk());
                            navigate("/login");
                        }}>
                        Logout</button>


                    <h2>Following: </h2>
                    {followed &&
                     followed.map(follow => <h1>{follow.followed}</h1>)}
                    <h2>Followers: </h2>
                    {follower &&
                     follower.map(follow => <h1>{follow.follower}</h1>)}



                </div>
            )}

        </div>
    );

}
export default Profile;