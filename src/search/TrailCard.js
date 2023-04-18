import React from "react";
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
        // <li>hello</li>
        <div className="col">
            <div className="card text-white bg-primary mb-3" style={cardSize}>
                <div className="card-header">{trail.city}, {trail.region} - {trail.length} miles</div>
                <div className="card-body">
                    <h4 className="card-title">{trail.name} - {trail.id}</h4>
                    <p className="card-text">{trail.description}</p>
                    <img style={photoSize} className="float-end rounded-3" src={trail.thumbnail}/>

                </div>
            </div>
        </div>
    );
};
export default TrailCard;