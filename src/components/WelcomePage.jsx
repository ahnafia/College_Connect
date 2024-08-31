

import React from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';


const WelcomePage = ({ profileInfo }) => {
    const navigate = useNavigate();


    const isLoggedIn = profileInfo.username && profileInfo.email && profileInfo.password;


    return (
        <div className="welcome-page">
            <div className="navbar">
                <div className="navbar-center">
                    <a href="/" className="nav-link">MESSAGES {profileInfo.username}</a>
                    <a href="/" className="nav-link">GROUPS</a>
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/" className="nav-link">PROFILE</a>
                    <a href="/" className="nav-link">RECs</a>
                    <a href="/" className="nav-link">CONTACT</a>
                </div>
                {!isLoggedIn && (
                    <div className="navbar-right">
                        <button className="nav-button" onClick={() => navigate('/signup')}>SIGNUP</button>
                        <button className="nav-button" onClick={() => navigate('/login')}>LOGIN</button>
                    </div>
                )}
            </div>


            <div className="welcome-content">
                <h1 className="welcome-title">College Connect</h1>
                <p className="welcome-subtitle">Connecting students across campuses</p>
            </div>
        </div>
    );
}


export default WelcomePage;


