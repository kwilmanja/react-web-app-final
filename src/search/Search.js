import { Link } from "react-router-dom";
import {getPhilosophers, testAPI} from "./service";
import Map from "./Map";
import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import Geocode from "./Geocode";
import Results from "./Results";


function Search() {



    const { address } = useParams();


    return (
        <div>
            <h1>Search</h1>

            <Map/>
            {/*<Results/>*/}

            {/*<Geocode/>*/}
            {/*<button onClick={searchPhilosophers}>hello world</button>*/}
        </div>
    );
}

export default Search;