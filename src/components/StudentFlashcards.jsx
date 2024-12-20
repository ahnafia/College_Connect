import React, { useState } from 'react';
import { connect } from "../api/UserService";
import './StudentFlashcards.css';

const StudentFlashcards = ({ students , username }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more students to show!');
    }
  };

  const handleConnect = () => {
    connect(currentStudent[13], username)
    console.log(`Connected with: ${currentStudent[13]}`);
    handleSkip(); 
  };

  if (students.length === 0) {
    return <div>You have exhausted all your matches!</div>;
  }

  const currentStudent = students[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <h2>{currentStudent[13]}</h2>
        <p>Interests: {currentStudent[8]}</p>
        <p>Extracurriculars: {currentStudent[7]}</p>
        <p>Education: {currentStudent[4]}</p>
        <div className="flashcard-actions">
          <button className="skip-button" onClick={handleSkip}>
            Skip
          </button>
          <button className="connect-button" onClick={handleConnect}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFlashcards;
