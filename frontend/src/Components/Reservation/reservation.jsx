import React, { useState } from 'react';

const generateSeats = () => {
  const rows = 26; // A-Z
  const maxColumns = 100;
  const seatConfig = [
    15, 10, 5, 20, 12, 18, 22, 8, 11, 14, // Example configuration, customize as needed
    13, 17, 9, 6, 19, 15, 20, 25, 10, 12,
    14, 18, 22, 8, 9, 11 // Add more or fewer as needed
  ];

  return seatConfig.map((columns, rowIndex) => ({
    row: String.fromCharCode(65 + rowIndex), // Convert 0 -> 'A', 1 -> 'B', etc.
    seats: Array.from({ length: Math.min(columns, maxColumns) }, (_, colIndex) => ({
      id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
      reserved: false
    }))
  }));
};

const Reservation = () => {
  const [seats, setSeats] = useState(generateSeats());

  // Handle seat click
  const handleSeatClick = (row, id) => {
    setSeats(seats.map(rowSeats =>
      rowSeats.row === row ? {
        ...rowSeats,
        seats: rowSeats.seats.map(seat =>
          seat.id === id ? { ...seat, reserved: !seat.reserved } : seat
        )
      } : rowSeats
    ));
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Select Your Seats</h1>
      {seats.map(rowSeats => (
        <div key={rowSeats.row} className="mb-4">
          <div className="font-bold mb-2 text-center">{rowSeats.row}</div>
          <div className="flex justify-center flex-wrap">
            {rowSeats.seats.map(seat => (
              <div
                key={seat.id}
                className={`w-12 h-12 cursor-pointer flex items-center justify-center text-white font-bold border-4 ${
                  seat.reserved ? 'bg-gray-500' : 'bg-white border-gray-400'
                } transition-colors duration-300`}
                onClick={() => handleSeatClick(rowSeats.row, seat.id)}
              >
                {seat.id}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservation;
