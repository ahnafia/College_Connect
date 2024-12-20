import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountInfo, logIn } from '../api/AuthenticationService';
import { saveTokenToCookie} from '../api/CookieFunctions';
import './login.css'; 

const Login = ({ setToken }) => {
    const [userInfo, setUserInfo] = useState({ username: '',
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
        contactInfo: ''});
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
            const response = await logIn(userInfo)
            const tokenData  = await response.data
            saveTokenToCookie(tokenData.token, tokenData.expiration)
            navigate('/'); // Redirect to the dashboard or home page after login
        } catch (error) {
            console.error('Error during login:', error);
        }


       
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className="welcome-title">College Connect</h1>
            <input className="email" type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} required />
            <input className="password" type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} required />
            <button className="login" type="submit">Login</button>
        </form>
    );
};


export default Login;


