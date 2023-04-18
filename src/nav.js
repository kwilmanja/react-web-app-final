import {Link} from "react-router-dom";

function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">The Philosopher Index</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor01" aria-controls="navbarColor01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                                <span className="visually-hidden">(current)</span>

                            </li>
                            <li>
                                <form className="d-flex">
                                    <input className="form-control me-sm-2" type="search"
                                           placeholder="Search"/>
                                    <button className="btn btn-secondary my-2 my-sm-0" type="submit"
                                            fdprocessedid="bsldw">Search
                                    </button>
                                </form>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/details">Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>


        </div>
    );
}

export default Nav;