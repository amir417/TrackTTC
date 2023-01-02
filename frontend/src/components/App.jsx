import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";
import VerifiedNavbar from "./VerifiedNavbar.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login";
import Account from "./Account";

window.React = React;

const App = () => {
    const isLogged = window.localStorage.getItem("loggedIn");
    return (
        <Router>
           {isLogged ? <VerifiedNavbar/> : <Navbar/> }
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={isLogged ? <Account/> : <Signup/>}/>
                <Route path="/login" element={isLogged ? <Account/> : <Login/>}/>
                <Route path="/account" element={isLogged ? <Account/> : <Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;