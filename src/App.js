import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import UserDetails from './userDetails/UserDetails';
import Navbar from './navbar/Navbar';
import Login from './login/Login';
import Register from './register/Register';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div>
      {location.pathname !== '/userdetails' && (
        <>
          <Button variant='contained' onClick={handleRegister} sx={{marginRight:'10px'}}>Register</Button>
          <Button variant='contained' onClick={handleLogin}>Login</Button>
        </>
      )}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdetails" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
