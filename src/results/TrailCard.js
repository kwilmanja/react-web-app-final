import React from "react";
import {Link} from "react-router-dom";
const TrailCard = ({trail}) => {


    const cardSize = {
        "height": "500px",
        "width": "500px"
    };

    const photoSize = {
        "height": "100px",
        "width": "100px"
    };


    return(
        <div className="col">
            <Link to={'/details/' + trail.id}>
                <div className="card text-white bg-primary mb-3" style={cardSize}>
                    <div className="card-header">{trail.city}, {trail.region} - {trail.length} miles</div>
                    <div className="card-body">
                        <h4 className="card-title">{trail.name} - {trail.id}</h4>
                        <p className="card-text">{trail.description}</p>
                        <img style={photoSize} className="float-end rounded-3" src={trail.thumbnail}/>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default TrailCard;