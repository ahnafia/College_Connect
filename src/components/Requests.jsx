import React, { useState, useEffect } from 'react';
import { getMatches, fetchProfile, getStudent, accept } from '../api/UserService';
import { getTokenFromCookie } from "../api/CookieFunctions";
import './Requests.css';

const Requests = () => {
    const [matches, setMatches] = useState(new Map());
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [expandedMatch, setExpandedMatch] = useState(null);

    useEffect(() => {
        const token = getTokenFromCookie();
        
        fetchProfile(token)
            .then(profileResponse => {
                const fetchedUsername = profileResponse.data.username;
                setUsername(fetchedUsername);
    
                return getMatches(fetchedUsername);
            })
            .then(matchesResponse => {
                const matchUsernames = matchesResponse.data;
                const userDetailsMap = new Map();
    
                
                const promises = matchUsernames.map(matchUsername => 
                    getStudent(matchUsername).then(userDetails => {
                        userDetailsMap.set(matchUsername, userDetails.data);
                    })
                );
    
                
                return Promise.all(promises).then(() => userDetailsMap);
            })
            .then(userDetailsMap => {
                setMatches(new Map(userDetailsMap)); 
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Unable to fetch matches or details.");
            });
    }, []);
    

    const handleViewClick = (matchId) => {
        setExpandedMatch(expandedMatch === matchId ? null : matchId);
    };

    
    const handleAcceptClick = (matchId) => {
        accept(username, matchId)
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
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
            <h2 className='title'>Connection Requests</h2>
            <div className="matches-list-container">
                {matches.size > 0 ? (
                    <ul className="matches-list">
                        {[...matches.entries()].map(([key, value]) => (
                            <li key={key} className="match-item">
                                <div className="match-header">
                                    <span className="match-name">{value.username}</span>
                                    <div className="button-container">
                                        <button className="skip-button">Skip</button>
                                        <button
                                            className="view-button"
                                            onClick={() => handleViewClick(key)}
                                        >
                                            {expandedMatch === key ? "Hide" : "View"}
                                        </button>
                                        <button className="accept-button" onClick={() => handleAcceptClick(key)} >Accept</button>
                                    </div>
                                </div>
                                {expandedMatch === key && (
                                    <div className="user-details">
                                        <p><strong>Bio:</strong> {value.bio}</p>
                                        <p><strong>Contact Info:</strong> Must Accept to Reveal!</p>
                                        <p><strong>Education:</strong> {value.education}</p>
                                        <p><strong>Extracurriculars:</strong> {value.extracurriculars}</p>
                                        <p><strong>Interests:</strong> {value.interests}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No matches found.</p>
                )}
            </div>
        </>
    );



};

export default Requests;
