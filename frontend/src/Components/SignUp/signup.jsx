import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, role: userType }),
      });

      if (response.ok) {
        setSuccess('Successfully signed up!');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input 
            type='text' 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input 
            type='password' 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
        </div>
        <div className="input-box">
          <input 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <FaEnvelope className='icon' />
        </div>
        <div className="user-type">
          <label>
            <input 
              type='radio' 
              name='userType' 
              value='user' 
              checked={userType === 'user'} 
              onChange={(e) => setUserType(e.target.value)} 
            />
            User
          </label>
          <label>
            <input 
              type='radio' 
              name='userType' 
              value='admin' 
              checked={userType === 'admin'} 
              onChange={(e) => setUserType(e.target.value)} 
            />
            Admin
          </label>
        </div>
        <button type='submit'>Sign Up</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="register-link">
          <p>Already have an account? <Link to='/'>Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
