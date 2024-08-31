
import React from 'react';
import { useState } from 'react'
import './profile.css'; // You can style this component using a CSS file


const ProfileUpdate = () => {
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


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileInfo({
            ...profileInfo,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleNextStep = async () => {
        const currentField = steps[currentStep].name;
        // await updateProfile({ [currentField]: profileInfo[currentField] }); // Save to backend


        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };


    const currentField = steps[currentStep];


    return (
        <div>
            <h2>Update Your Profile</h2>
            <div>
                <label>{currentField.label}</label>
                {currentField.type === 'checkbox' ? (
                    <input
                        type="checkbox"
                        name={currentField.name}
                        checked={profileInfo[currentField.name]}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type="text"
                        name={currentField.name}
                        value={profileInfo[currentField.name]}
                        onChange={handleChange}
                    />
                )}
            </div>
            <button onClick={handleNextStep}>
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
        </div>
    );
};


export default ProfileUpdate;