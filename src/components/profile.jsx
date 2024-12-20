
import React, { useEffect } from 'react';
import { useState } from 'react'
import { fetchProfile, updateProfile } from '../api/UserService';
import './profile.css'; 
import { getTokenFromCookie } from '../api/CookieFunctions';
import ProfileEditModal from './ProfileEditModal';


const ProfileUpdate = (token) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [profileInfo, setProfileInfo] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        interests: "",
        lookingForSimilarInterests: false,
        education: '',
        extracurriculars: "",
        contactInfo: ''
    });


    const steps = [
        { name: 'bio', label: 'Bio' },
        { name: 'interests', label: 'Interests' },
        { name: 'lookingForSimilarInterests', label: 'Looking for Similar Interests', type: 'checkbox' },
        { name: 'education', label: 'Education' },
        { name: 'extracurriculars', label: 'Extracurriculars' },
        { name: 'contactInfo', label: 'Contact Info' },
    ];


    useEffect(() => {
        const token = getTokenFromCookie()
        console.log(token)
        fetchProfile(token).then(response => {
            console.log(response);
            setProfileInfo(response.data)
        })
            .catch(error => {
                console.error('Error fetching token:', error);
            })
    }, []);



    if (!profileInfo) {
        return <div>Loading...</div>;
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleProfileUpdate = (updatedProfile) => {
        console.log(JSON.stringify(updatedProfile))
        updateProfile(profileInfo.username, updatedProfile);
        setIsEditModalOpen(false);
    };

    return (
        <div>
            {/* Navbar at the top */}
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

            {/* Profile Content below the navbar */}
            <div className="profile-container">
                <header className="profile-header">
                    <h1>{profileInfo.username || 'Username'}</h1>
                    <p>{profileInfo.bio || 'No bio available'}</p>
                </header>

                <section className="profile-section">
                    <h2>Intersts</h2>
                    <p>{profileInfo.interests || 'No contact information provided'}</p>
                </section>

                {profileInfo.lookingForSimilarInterests && (
                    <section className="profile-section">
                        <p>Looking to connect with people with similar interests!</p>
                    </section>
                )}

                <section className="profile-section">
                    <h2>Education</h2>
                    <p>{profileInfo.education || 'No contact information provided'}</p>
                </section>

                <section className="profile-section">
                    <h2>Extracurriculars</h2>
                    <p>{profileInfo.extracurriculars || 'No contact information provided'}</p>
                </section>

                <section className="profile-section">
                    <h2>Contact Information</h2>
                    <p>{profileInfo.contactInfo || 'No contact information provided'}</p>
                </section>
            </div>

            {isEditModalOpen && (
                <ProfileEditModal
                    profileInfo={{
                        username: profileInfo.username,
                        bio: profileInfo.bio,
                        interests: profileInfo.interests,
                        goals: profileInfo.goals,
                        education: profileInfo.education,
                        extracurriculars: profileInfo.extracurriculars,
                        contactInfo: profileInfo.contactInfo
                    }}
                    onClose={handleModalClose}
                    onSave={handleProfileUpdate}
                />
            )}
            <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
        </div>
    );
};


export default ProfileUpdate;