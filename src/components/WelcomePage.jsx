import { Link } from "react-router-dom";
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchProfile, getSimiliar } from "../api/UserService";
import {getTokenFromCookie,} from "../api/CookieFunctions";
import StudentFlashcards from "./StudentFlashcards";


const WelcomePage = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);
    const [buttonState, setButtonState] = useState('initial');
    const [matches, setMatches] = useState([]);
    const [username, setUsername] = useState("")

    const FindSimilar = () => {
        const token = getTokenFromCookie();

        fetchProfile(token).then(response => {
            setUsername(response.data.username)
            getSimiliar(response.data.username).then(students => {
                students = students.data
                setMatches(students)
            }); 
        });
        setButtonState('afterClick');
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowButton(true), 500);
        return () => clearTimeout(timer);
    }, []);




    return (
        <><><div className="welcome-page">
            <header className="navbar">
                <h1 className="welcome-title">College Connect</h1>
                <div className="navbar-center">
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/profile" className="nav-link">PROFILE</a>
                    <a href="/REQs" className="nav-link">REQs</a>
                    <a href="/Connections" className='nav-link'>CONNECTIONS</a>
                </div>
                <div className="navbar-right">
                    <a href="/signup" className="nav-auth">SIGN UP</a>
                    <a href="/login" className="nav-auth">LOG IN</a>
                </div>
            </header>
        </div></><div className="Connect-Button">
                {buttonState === 'initial' && (
                    <button className="fade-in" onClick={() => FindSimilar()}>
                        Start Connecting?
                    </button>
                )}
                {buttonState === 'afterClick' && (
                    <div>
                        <StudentFlashcards students={matches} username={username} />
                    </div>
                )}
            </div></>




    );
}


export default WelcomePage;


