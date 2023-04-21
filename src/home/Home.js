import {useSelector} from "react-redux";
import {current} from "@reduxjs/toolkit";

export default function Home() {

    const { currentUser } = useSelector((state) => state.auth);
    // const info = useSelector((state) => state.follows);
    const {currentFollowed, currentFollower} = useSelector((state) => state.follows);

    console.log(currentFollowed);

    return (
        <div>
        {currentUser && (
            <h1>Hello {currentUser.username}</h1>




                     )}

            <h1>Hello, welcome to React.js</h1>
        </div>
    );
}