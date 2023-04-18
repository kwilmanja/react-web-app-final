import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, Autocomplete, LoadScript} from '@react-google-maps/api';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
const GOOGLE_KEY = 'AIzaSyBAuQ1rbrQNRsMNx3hNQqXskxkf6vE8F6c';

function Map() {

    const { address } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(decodeURIComponent(address));
    const [results, setResults] = useState([]);
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    useEffect(() => {
        // searchNapster();
        if (address) {
            setSearch(address);
            searchTrails();
        }
    }, [address]);

    const searchTrails = async () => {
        // const results = await searchForTrails(search);
        const results = [latLng];
        setResults(results);
        navigate(`/search/${search}`);
    };


    const newAddress = () => {
        const newAddress = encodeURIComponent(search);
        navigate(`/search/${newAddress}`);
    }

    const handleGeocodeClick = () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}&key=${GOOGLE_KEY}`;
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

    const { isLoaded } =
        useJsApiLoader({
            googleMapsApiKey: GOOGLE_KEY,
            libraries: ['places']
                                       });

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194
    };

    const options = {
        zoom: 10
    };

    // if(!isLoaded){
    //     return <h1>Loading...</h1>;
    // }

    return (
        <div>
            {/*<GoogleMap*/}
            {/*    mapContainerStyle={mapContainerStyle}*/}
            {/*    center={center}*/}
            {/*    zoom={options.zoom}*/}
            {/*    options={{*/}
            {/*        streetViewControl: false,*/}
            {/*    }}*/}
            {/*>*/}
            {/*        <Marker position={center}/>*/}
            {/*    </GoogleMap>*/}


            {/*<Autocomplete>*/}
                <input className="form-control form-control-lg" type="text"
                       id="inputLarge" placeholder="Destination"
                       value={search}
                />
            {/*</Autocomplete>*/}
            <button className="btn btn-primary" type="button" id="button-addon2"
            // onClick={}
            >Submit</button>

            <ul className="list-group">
                {
                    results.map(trail => <h1>{trail.lat}</h1>)
                }
            </ul>


            {/*{latLng.lat && latLng.lng && (*/}
            {/*    <div>*/}
            {/*        Latitude: {latLng.lat}, Longitude: {latLng.lng}*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    );
}

export default Map;