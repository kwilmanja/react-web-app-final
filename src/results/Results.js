import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {trailSearchLatLng} from "./trail-service";
import TrailCard from "./TrailCard";
const GOOGLE_KEY = 'AIzaSyBAuQ1rbrQNRsMNx3hNQqXskxkf6vE8F6c';

function Results() {

    const {address} = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    // useEffect(() => {
    //     // searchNapster();
    //     if (address) {
    //         // searchTrails();
    //     }
    // }, [address]);

    const searchTrails = async (lat, lng) => {
        console.log(address);
        console.log([lat, lng]);
        const result = await trailSearchLatLng(lat, lng);
        console.log(result.data);
        setResults(result.data);
    };

    const handleGeocode = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
        axios
            .get(url)
            .then(async (response) => {
                if (response.data.status === "OK") {
                    const {lat, lng} = response.data.results[0].geometry.location;
                    await searchTrails(lat, lng);
                } else {
                    console.error(`Geocode error: ${response.data.status}`);
                }
            })
            .catch((error) => {
                console.error(`Geocode error: ${error.message}`);
            });
    };


    return (
        <div>

            <h1> Showing Results for: {address} </h1>


            {/*<div className="container mt-5">*/}
            {/*    <div className="row row-cols-1 row-cols-md-3 g-4">*/}
                {
                    results.map(trail => <TrailCard trail={trail}/>)
                }
            {/*    </div>*/}
            {/*</div>*/}



            <button type="button" onClick={handleGeocode}> show results </button>

        </div>
    );
}

export default Results;