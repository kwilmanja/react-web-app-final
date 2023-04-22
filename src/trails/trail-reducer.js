import { createSlice } from "@reduxjs/toolkit";
import {trailSearchLatLngThunk} from "./trail-thunks";


const trailSlice = createSlice({
                                  name: "trails",
                                  initialState: { trails: []},
                                  reducers: {},
                                  extraReducers: {

                                  },
                              });
export default trailSlice.reducer;