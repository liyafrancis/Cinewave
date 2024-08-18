import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={"./logo.png"} alt="CineWave Logo" className="w-12 h-12" /> 
        <div className="text-3xl font-bold">CineWave</div>
      </div>
      <ul className="hidden md:flex space-x-8">
        <li><a href="#" className="hover:text-gray-300">Home</a></li>
        <li><a href="#" className="hover:text-gray-300">Movies</a></li>
        <li><a href="#" className="hover:text-gray-300">Theatres</a></li>
        <li><a href="#" className="hover:text-gray-300">Reservations</a></li>
        <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
      </ul>
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
