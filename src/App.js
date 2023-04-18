import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router";
// import Home from "./Home";
//import store from "./redux/store";
import { Provider } from "react-redux";
import Nav from "./nav";
import Home from "./home/Home";
import Search from "./search/Search";

function App() {
  return (
      <div className="container-fluid">
        {/*<Provider store={store}>*/}
            <BrowserRouter>

              <Nav/>

              <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/search/*" element={<Search />} />

              </Routes>
            </BrowserRouter>
        {/*</Provider>*/}
      </div>
  );
}

export default App;