

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/signup'
import AuthForms from './components/login'
import Login from './components/login'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import VerifyAccount from './components/verify'
import WelcomePage from './components/welcomepage'
import ProfilePage from './components/profile'


function App() {
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


  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage profileInfo={profileInfo}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setProfileInfo={setProfileInfo}/>} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/profile" element={<ProfilePage userInfo={profileInfo} />}  />
      </Routes>
    </Router>
  )
}


export default App


