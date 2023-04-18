import axios from "axios";
import {useParams} from "react-router";
import {useState} from "react";

const GOOGLE_KEY = 'AIzaSyBAuQ1rbrQNRsMNx3hNQqXskxkf6vE8F6c';




function Geocode() {
    const { address } = useParams();
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    console.log('Address' + address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
    axios
        .get(url)
        .then((response) => {
            if (response.data.status === "OK") {
                const { lat, lng } = response.data.results[0].geometry.location;
                console.log({lat, lng});
                setLatLng({lat, lng });
            } else {
                console.error(`Geocode error: ${response.data.status}`);
            }
        })
        .catch((error) => {
            console.error(`Geocode error: ${error.message}`);
        });
    return(
        <div>
            <h1>latLng.lat</h1>
            <h1>latLng.lnd</h1>
        </div>
    );

}

export default Geocode;