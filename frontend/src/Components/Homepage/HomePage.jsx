import React from 'react';
import Navbar from './Nav';
import HeroSection from './Hero';
import './home.css';
function HomePage() {
  return (
    <div className="w-full h-full bg-black homepage-container">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default HomePage;
