
import React, { useEffect } from 'react';
import { useState } from 'react'
import {fetchProfile} from '../api/UserService';
import './profile.css'; // You can style this component using a CSS file
import { getTokenFromCookie } from '../api/CookieFunctions';


const ProfileUpdate = (token) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [profileInfo, setProfileInfo] = useState({
        username: '',
        email: '',
        password: '',
        headline: '',
        bio: '',
        interests: [],
        lookingForSimilarInterests: false,
        goals: [],
        education: [],
        workExperiences: [],
        extracurriculars: [],
        skills: [],
        contactInfo: ''
    });


    const steps = [
        { name: 'headline', label: 'Headline' },
        { name: 'bio', label: 'Bio' },
        { name: 'interests', label: 'Interests' },
        { name: 'lookingForSimilarInterests', label: 'Looking for Similar Interests', type: 'checkbox' },
        { name: 'goals', label: 'Goals' },
        { name: 'education', label: 'Education' },
        { name: 'workExperiences', label: 'Work Experiences' },
        { name: 'extracurriculars', label: 'Extracurriculars' },
        { name: 'skills', label: 'Skills' },
        { name: 'contactInfo', label: 'Contact Info' },
    ];


    useEffect(() => {
      const token = getTokenFromCookie()
      console.log(token)
            // Call the fetchProfile function from UserService
            fetchProfile(token).then(response => {
              console.log(response);
              setProfileInfo(response.data) // Assuming the response is in JSON format
          })
          .catch(error => {
              console.error('Error fetching token:', error);
          })
        }, []);
      
        
      
        if (!profileInfo) {
          return <div>Loading...</div>;
        }
      
        return (
            <><div className="navbar">
                <h1 className="welcome-title">College Connect</h1>
                <div className="navbar-center">
                <a href="/" className="nav-link">MESSAGES {profileInfo.username}</a>
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/profile" className="nav-link">PROFILE</a>
                    <a href="/" className="nav-link">RECs</a>
                </div>
                <div className="navbar-right">
                        <a href="/signup" className="nav-auth">SIGN UP</a>
                        <a href="/login" className="nav-auth">LOG IN</a>
                    </div>
            </div><div className="profile-container">
                    <h1>{"Hi! " + profileInfo.username}</h1>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <h2>Headline</h2>
                            <p>{profileInfo.headline || 'N/A'}</p>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Bio</h2>
                            <p>{profileInfo.bio || 'N/A'}</p>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Interests</h2>
                            <ul>
                                {(profileInfo.interests || []).map((interest, index) => (
                                    <li key={index}>{interest}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Looking for Similar Interests</h2>
                            <p>{profileInfo.lookingForSimilarInterests ? "Yes" : "No"}</p>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Goals</h2>
                            <ul>
                                {(profileInfo.goals || []).map((goal, index) => (
                                    <li key={index}>{goal}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Education</h2>
                            <ul>
                                {(profileInfo.education || []).map((edu, index) => (
                                    <li key={index}>{edu}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Work Experiences</h2>
                            <ul>
                                {(profileInfo.workExperiences || []).map((work, index) => (
                                    <li key={index}>{work}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Extracurriculars</h2>
                            <ul>
                                {(profileInfo.extracurriculars || []).map((activity, index) => (
                                    <li key={index}>{activity}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Skills</h2>
                            <ul>
                                {(profileInfo.skills || []).map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                            <button className="edit-button">Edit</button>
                        </div>

                        <div className="profile-item">
                            <h2>Contact Information</h2>
                            <p>{profileInfo.contactInfo || 'N/A'}</p>
                            <button className="edit-button">Edit</button>
                        </div>
                    </div>
                </div></>
    );
};


export default ProfileUpdate;