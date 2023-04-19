import {useParams} from "react-router";

function Details() {

    const {trailID} = useParams();


    return (
        <div>
            <h1> {trailID}</h1>
        </div>
    );
}

export default Details;