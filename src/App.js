import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import UserDetails from './userDetails/UserDetails';
import Navbar from './navbar/Navbar';
import Login from './login/Login';
import Register from './register/Register';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userdetails" element={<UserDetails />} />
          </Routes>
        </div>
      </Router>

    </>
  );
}


export default App;
