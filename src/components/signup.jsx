
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/AuthenticationService';
import './login.css'; 

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        headline: null,
        bio: null,
        interests: null,
        lookingForSimilarInterests: null,
        goals: null,
        education: null,
        workExperiences: null,
        extracurriculars: null,
        skills: null,
        contactInfo: null
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(userInfo);
            navigate('/verify');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className="welcome-title">College Connect</h1>
            <input className="username" type="text" name="username" placeholder="Username" value={userInfo.username} onChange={handleChange} required />
            <input className="email" type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} required />
            <input className="password" type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} required />
            <button className="submit" type="submit">Sign Up</button>
        </form>
    );
};


export default SignUp;
