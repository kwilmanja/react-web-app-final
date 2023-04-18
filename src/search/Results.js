import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, Autocomplete, LoadScript} from '@react-google-maps/api';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
const GOOGLE_KEY = 'AIzaSyBAuQ1rbrQNRsMNx3hNQqXskxkf6vE8F6c';

function Results() {

    const {address} = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    const searchTrails = async () => {
        // const results = await searchForTrails(search);
        const results = [latLng.lat, latLng.lng];
        setResults(results);
    };

    const handleGeocode = () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
        axios
            .get(url)
            .then((response) => {
                if (response.data.status === "OK") {
                    const { lat, lng } = response.data.results[0].geometry.location;
                    setLatLng({ lat, lng });
                } else {
                    console.error(`Geocode error: ${response.data.status}`);
                }
            })
            .catch((error) => {
                console.error(`Geocode error: ${error.message}`);
            });
    };

    handleGeocode();
    searchTrails().then(r => console.log(results));

    return (
        <div>

            <ul className="list-group">
                {
                    results.map(trail => <li>{trail}</li>)
                }
            </ul>

        </div>
    );
}

export default Map;