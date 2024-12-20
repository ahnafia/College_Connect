import React, { useState } from 'react';
import './ProfileEditModal.css';

const ProfileEditModal = ({ profileInfo, onClose, onSave }) => {
  const [formData, setFormData] = useState(profileInfo);
  const [educationInput, setEducationInput] = useState(formData.education || '');
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const universities = [
    'Harvard University',
    'Stanford University',
    'Massachusetts Institute of Technology',
    'University of California, Berkeley',
    'California Institute of Technology',
    'University of Chicago',
    'Princeton University',
    'Yale University',
    'Columbia University',
    'University of Pennsylvania',
    'Pennsylvania State University',
    'Cornell University',
    'Duke University',
    'University of Michigan',
    'Carnegie Mellon University',
    'University of Washington',
    'University of California, Los Angeles',
    'Johns Hopkins University',
    'Northwestern University',
    'University of Texas at Austin',
    'University of Wisconsin-Madison',
  ]; // Add more universities as needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (e) => {
    const input = e.target.value;
    setEducationInput(input);
    if (input) {
      setFilteredUniversities(
        universities.filter((university) =>
          university.toLowerCase().includes(input.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setFilteredUniversities([]);
      setShowDropdown(false);
    }
  };

  const selectUniversity = (university) => {
    setEducationInput(university);
    setFilteredUniversities([]);
    setShowDropdown(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({...formData, education: educationInput});
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Bio:
            <input
              type="text"
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
            />
          </label>
          <label>
          Interests:
            <input
              type="text"
              name="interests"
              value={formData.interests || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Education:
            <input
              type="text"
              value={educationInput}
              onChange={handleEducationChange}
              placeholder="Start typing to search for universities"
            />
            {showDropdown && (
              <ul className="dropdown">
                {filteredUniversities.map((university, index) => (
                  <li
                    key={index}
                    onClick={() => selectUniversity(university)}
                  >
                    {university}
                  </li>
                ))}
              </ul>
            )}
          </label>
          <label>
          Extracurriculars:
            <input
              type="text"
              name="extracurriculars"
              value={formData.extracurriculars || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Contact Info:
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo || ''}
              onChange={handleChange}
            />
          </label>
          <div className="modal-actions">
            <button className ="cancel" type="button" onClick={onClose}>Cancel</button>
            <button className="save" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
