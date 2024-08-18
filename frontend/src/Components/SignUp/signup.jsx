import React from 'react'
import './signup.css'
import { Link } from 'react-router-dom';
import { FaUser,FaLock,FaGoogle } from "react-icons/fa";
const signup = () => {
  return (
    <div className="wrapper">
        <form action=''>
            <h1>Sign Up</h1>
            <div className="input-box">
                <input type='text' placeholder='username' required/>
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type='password' placeholder='password' required/>
                <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type='checkbox'/>Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type='submit'>Sign Up</button>
            <div className="register-link">
                <p>Already have an account? <Link to = '/'> Login </Link></p>
            </div>
        </form>
    </div>
  )
}

export default signup