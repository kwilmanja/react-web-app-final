import {findFollowedThunk, findFollowerThunk, unfollowUserThunk, followUserThunk,
    findFollowThunk} from "./follows-thunks.js";

const {createSlice} = require("@reduxjs/toolkit");

const followsSlice = createSlice({
        name: 'follows',
        initialState: {
            currentFollower: [],
            currentFollowed: []
        },
        reducers: {},
        extraReducers: {
            [followUserThunk.fulfilled]: (state, {payload}) => {
                //state.currentFollowed.push(payload);
            },
            [unfollowUserThunk.fulfilled]: (state, {payload}) => {
                //state.currentFollowed.remove(payload);
            },
            [findFollowerThunk.fulfilled]: (state, {payload}) => {
                const followerNames = payload.map((user) => user.follower);
                state.currentFollower = (followerNames);
            },
            [findFollowedThunk.fulfilled]: (state, {payload}) => {
                const followedNames = payload.map((user) => user.followed);
                state.currentFollowed = (followedNames);
            },
            // [findFollowThunk.fulfilled]: (state, {payload}) => {},
        }
    });

export default followsSlice.reducer;