import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Reception.css';

const Reception = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [roomType, setRoomType] = useState('');

  const handleSearch = () => {
    if (!roomType) {
      alert('Please select room type');
      return;
    }
    localStorage.setItem('checkIn', checkIn.toISOString());
    localStorage.setItem('checkOut', checkOut.toISOString());
    localStorage.setItem('roomType', roomType);
    navigate('/available-rooms');
  };

  return (

<>
 {/* ✅ RECEPTION FORM */}
      <div className="reception-banner">
        <div className="booking-card">
          <h2>CHECK ROOMS</h2>
          <div className="form-group">
            <label>Check In</label>
            <div className="date-input">
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                className="custom-datepicker"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
              />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>

          <div className="form-group">
            <label>Check Out</label>
            <div className="date-input">
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                className="custom-datepicker"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
              />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              id="ac"
              name="roomType"
              value="AC"
              checked={roomType === 'AC'}
              onChange={() => setRoomType('AC')}
            />
            <label htmlFor="ac" className={`radio-label ${roomType === 'AC' ? 'active' : ''}`}>AC</label>

            <input
              type="radio"
              id="nonac"
              name="roomType"
              value="Non-AC"
              checked={roomType === 'Non-AC'}
              onChange={() => setRoomType('Non-AC')}
            />
            <label htmlFor="nonac" className={`radio-label ${roomType === 'Non-AC' ? 'active' : ''}`}>Non AC</label>
          </div>

          <button className="book-now-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

</>
     
  );
};

export default Reception;
