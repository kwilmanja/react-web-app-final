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


function Profile() {
    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});
    const [editing, setEditing] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const getProfile = async () => {
    //     const action = await dispatch(profileThunk());
    //     if (!action.payload) {
    //         navigate("/login");
    //     }
    //     setProfile(action.payload);
    // };


    const edit = () => {
        setProfile(currentUser);
        setEditing(true);
    };

    const save = () => {
        dispatch(updateUserThunk(profile));
        setEditing(false);
    };


    return (

        <div>
            {currentUser && (
                <div>
                    <h1>{currentUser.username}'s Profile</h1>

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
                                 <select className="form-select" id="exampleSelect1"
                                         value={profile.level}
                                         onChange={(event) => {
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
                         <h1>First Name: {currentUser.firstName}</h1>
                         <h1>Last Name: {currentUser.lastName}</h1>
                         <h1>Level: {currentUser.level}</h1>

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


                    <FollowerFollowed profile={profile}/>


                </div>
            )}

        </div>
    );

}
export default Profile;