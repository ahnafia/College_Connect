
import { getTokenFromCookie } from './api/CookieFunctions';
import {useEffect, useState } from 'react'
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
import WelcomePage from './components/WelcomePage'
import ProfilePage from './components/profile'
import Requests from './components/Requests';
import Connections from './components/Connections';


function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/profile" element={<ProfilePage userInfo={token} />}  />
        <Route path="/REQs" element={<Requests/>}  />
        <Route path="/Connections" element={<Connections/>}  />
      </Routes>
    </Router>
  )
}


export default App


