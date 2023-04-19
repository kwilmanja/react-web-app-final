import {createAsyncThunk} from "@reduxjs/toolkit";
import {findFollowed, findFollower, followUser, unfollowUser} from "./follows-service.js";

export const followUserThunk = createAsyncThunk(
    'followUser',
    async (username) => await followUser(username)
)

export const unfollowUserThunk = createAsyncThunk(
    'unfollowUser',
    async (username) => await unfollowUser(username)
)

export const findFollowerThunk = createAsyncThunk(
    'findFollowerUser',
    async (username) => await findFollower(username)
)

export const findFollowedThunk = createAsyncThunk(
    'findFollowedUser',
    async (username) => await findFollowed(username)
)