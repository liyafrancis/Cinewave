import React from 'react';
import { Link } from 'react-router-dom';
import './intro.css';

const intro = () => {


  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <Link to = '/admin-dashboard' ><h2>Movies</h2></Link>
        </div>
        <div className="dashboard-box">
          <Link to = "/theatre"><h2>Theaters</h2></Link>
        </div>
      </div>
    </div>
  );
};

export default intro;
