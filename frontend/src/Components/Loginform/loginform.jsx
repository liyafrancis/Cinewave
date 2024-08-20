import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './loginform.css';

const Loginform = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);

        // Check if the user is an admin and redirect accordingly
        if (data.role === 'admin') {
          navigate('/admin-dashboard'); // Redirect to admin dashboard if the user is an admin
        } else {
          navigate('/homepage'); // Redirect to homepage for regular users
        }
      } else {
        // Handle error (e.g., display a message)
        console.error('Login failed');
      }
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display a message)
    }
  };

  return (
    <div className='body1'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input 
              type='text' 
              placeholder='username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <FaUser className='icon'/>
          </div>
          <div className="input-box">
            <input 
              type='password' 
              placeholder='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <FaLock className='icon'/>
          </div>
          <button type='submit'>Login</button>
          <div className="register-link">
            <p>Don't have an account? <Link to='/sign'>Sign Up</Link></p>
          </div>
        </form>
        <div>
          <p>Click for Home Page <Link to='/homepage'>Click</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
