import React, { useState, useEffect } from 'react';
import './SeatLayout.css';

const SeatLayout = () => {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [seatLayout, setSeatLayout] = useState({ rows: 0, columns: 0 });

  // Fetch all theatres on component mount
  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/theatre', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Fetched Theatres: ", data); // Log the fetched data
      setTheatres(data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };
  

  const fetchTheatreDetails = async (name) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:5000/api/theatre/name/${name}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setSeatLayout({ rows: data.rows, columns: data.columns });
  };

  const handleTheatreChange = (e) => {
    const name = e.target.value;
    setSelectedTheatre(name);
    fetchTheatreDetails(name);
  };

  return (
    <div className="seat-layout">
      <h2>Select a Theatre</h2>
      <select value={selectedTheatre} onChange={handleTheatreChange}>
        <option value="">Select a theatre</option>
        {theatres.map((theatre) => (
          <option key={theatre._id} value={theatre.name}>
            {theatre.name}
          </option>
        ))}
      </select>

      {seatLayout.rows > 0 && seatLayout.columns > 0 && (
        <div className="seating-grid">
          {Array.from({ length: seatLayout.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {Array.from({ length: seatLayout.columns }).map((_, colIndex) => (
                <div key={colIndex} className="seat">
                  {rowIndex + 1}-{colIndex + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
