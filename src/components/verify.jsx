import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccount } from '../api/AuthenticationService';




const VerifyAccount = () => {
    const [verificationInfo, setVerificationInfo] = useState({ email: '', verificationCode: '' });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setVerificationInfo({
            ...verificationInfo,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            verifyAccount(verificationInfo)
            navigate('/login'); // Redirect to login after successful verification
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={verificationInfo.email} onChange={handleChange} required />
            <input type="text" name="verificationCode" placeholder="Verification Code" value={verificationInfo.verificationCode} onChange={handleChange} required />
            <button type="submit">Verify Account</button>
        </form>
    );
};


export default VerifyAccount;
