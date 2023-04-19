import {createAsyncThunk} from "@reduxjs/toolkit";
import {findFollowed, findFollower, followUser, unfollowUser} from "./follows-service.js";

export const followUserThunk = createAsyncThunk(
    'followUser',
    async (userID) => await followUser(userID)
)

export const unfollowUserThunk = createAsyncThunk(
    'unfollowUser',
    async (userID) => await unfollowUser(userID)
)

export const findFollowerThunk = createAsyncThunk(
    'findFollowerUser',
    async (userID) => await findFollower(userID)
)

export const findFollowedThunk = createAsyncThunk(
    'findFollowedUser',
    async (userID) => await findFollowed(userID)
)