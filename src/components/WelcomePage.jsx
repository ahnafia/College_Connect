import React from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';


const WelcomePage = ({ profileInfo }) => {
    const navigate = useNavigate();


    const isLoggedIn = profileInfo.username && profileInfo.email && profileInfo.password;


    return (
        <><div className="welcome-page">
            <header className="navbar">
            <h1 className="welcome-title">College Connect</h1>
                <div className="navbar-center">
                    <a href="/message" className="nav-link">MESSAGES</a>
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/profile" className="nav-link">PROFILE</a>
                    <a href="/" className="nav-link">RECs</a>
                </div>
                {!isLoggedIn && (
                    <div className="navbar-right">
                        <a href="/signup" className="nav-auth">SIGN UP</a>
                        <a href="/login" className="nav-auth">LOG IN</a>
                    </div>
                )}
            </header>

        </div><div className="welcome-content">
            </div></>
        
    );
}


export default WelcomePage;


