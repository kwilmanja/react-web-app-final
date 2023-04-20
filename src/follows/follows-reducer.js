import {findFollowedThunk, findFollowerThunk, unfollowUserThunk, followUserThunk,
    findFollowThunk} from "./follows-thunks.js";

const {createSlice} = require("@reduxjs/toolkit");

const followsSlice = createSlice({
        name: 'follows',
        initialState: {
            follower: [],
            followed: []
        },
        extraReducers: {
            [followUserThunk.fulfilled]: (state, {payload}) => {
                state.follower.push(payload);
            },
            [unfollowUserThunk.fulfilled]: (state, {payload}) => {
                state.follower.remove(payload);
            },
            [findFollowerThunk.fulfilled]: (state, {payload}) => {
                state.follower = (payload);
            },
            [findFollowedThunk.fulfilled]: (state, {payload}) => {
                state.followed = (payload);
            },
            [findFollowThunk.fulfilled]: (state, {payload}) => {},
        }
    });

export default followsSlice.reducer;