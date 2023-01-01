import React, { Component } from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";
import Navbar2 from "./Navbar2";
import Signup from "./Signup.jsx";
import Login from "./login";
import Account from "./account";

window.React = React;

 const App = () => {
    const isLogged = window.localStorage.getItem("loggedIn");
    return (
        <Router>
           {isLogged ? <Navbar2/> : <Navbar/> }
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