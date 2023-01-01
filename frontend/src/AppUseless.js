import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/first-page/login_component";
import SignUp from "./components/first-page/signup_component";
import UserDetails from "./components/first-page/userDetails";
import Home from "./components/user/home/home";
import UserLog from "./components/user/userlog/logger";
import Navbar from "./components/nav/nav";
import PrevLog from "./components/user/userlog/prevLog";


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn == 'true' ?  <Home/> : <Login />} />
              <Route path="/sign-in" element={isLoggedIn ?  <Home/> : <Login />}  />
              <Route path="/sign-up" element={isLoggedIn ?  <Home/> : <SignUp />}  />
              <Route path="/userData" element={isLoggedIn ? <UserDetails /> : <Login/>} />
              <Route  path="/user/home" element={isLoggedIn ? <Home /> : <Login/>} />
              <Route  path="/user/logs" element={isLoggedIn ?  <UserLog/> : <Login />} />
              <Route  path="/user/prevlogs" element={isLoggedIn ? <PrevLog /> : <Login/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;