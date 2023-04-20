import { createSlice } from "@reduxjs/toolkit";
import {
    createReviewThunk,
    deleteReviewThunk, findReviewsFromTrailIDThunk, findReviewsFromUsernameThunk,
    findReviewThunk,
    updateReviewThunk
} from "./review-thunks.js";


const reviewSlice = createSlice({
                                  name: "reviews",
                                  initialState: {listedReviews: [], singleReview: null },
                                  reducers: {},
                                  extraReducers: {
                                      [createReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews.push(payload);
                                      },
                                      [findReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.singleReview = payload;
                                      },
                                      [updateReviewThunk.fulfilled]: (state, { payload }) => {
                                          // state.listedReviews.replace(payload);
                                      },
                                      [deleteReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews.remove(payload);
                                      },
                                      [findReviewsFromTrailIDThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = payload;
                                      },
                                      [findReviewsFromUsernameThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = payload;
                                      },



                                  },
                              });
export default reviewSlice.reducer;