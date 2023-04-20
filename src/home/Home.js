import {useSelector} from "react-redux";

export default function Home() {

    const { currentUser } = useSelector((state) => state.auth);

    console.log(currentUser);

    return (
        <div>
        {currentUser && (
            <h1>Hello {currentUser.username}</h1>
                     )}

            <h1>Hello, welcome to React.js</h1>
        </div>
    );
}