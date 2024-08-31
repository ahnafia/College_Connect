import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountInfo, logIn } from '../api/AuthenticationService';


const Login = ({ setProfileInfo }) => {
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
            await logIn(userInfo);
            const { data } = await getAccountInfo(userInfo.email)
            setProfileInfo(data);
            navigate('/'); // Redirect to the dashboard or home page after login
        } catch (error) {
            console.error('Error during login:', error);
        }


       
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};


export default Login;


