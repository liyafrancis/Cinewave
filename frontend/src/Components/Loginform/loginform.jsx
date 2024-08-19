import React from 'react'
import { Link } from 'react-router-dom';
import { FaUser,FaLock } from "react-icons/fa";
import './loginform.css'
const loginform = () => {
  return (
    <div className='body1'>
    <div className="wrapper">
        <form action=''>
            <h1>Login</h1>
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
            <button type='submit'>Login</button>
            <div className="register-link">
                <p>Dont have an account? <Link to = '/sign'> Sign Up</Link></p>
            </div>
        </form>
        <div >
                <p>Click for Home Page <Link to = '/homepage'> Click </Link></p>
            </div>
    </div>
    </div>
 
    
  )
}

export default loginform