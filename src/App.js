import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router";
// import Home from "./Home";
import store from './reducers/store';
import { Provider } from "react-redux";
import Nav from "./nav";
import Home from "./home/Home";
import Search from "./search/Search";
import Results from "./results/Results";
import Details from "./details/Details";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Register from "./login/Register";
import PublicProfile from "./profile/PublicProfile";



function App() {
  return (
      <div className="container-fluid">
        <Provider store={store}>
            <BrowserRouter>

              <Nav/>

              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/*" element={<Search />} />
                  <Route path="/results/:address" element={<Results/>} />
                  <Route path="/details/:trailID" element={<Details/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<PublicProfile />} />

              </Routes>
            </BrowserRouter>
        </Provider>
      </div>
  );
}

export default App;