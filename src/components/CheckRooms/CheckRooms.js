import React, { useState } from 'react';
import { Container, Table, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CheckRooms.css';

const roomTypes = [
  { id: '101', type: 'Standard', price: 1200, occupancy: 2, available: true },
  { id: '102', type: 'Standard', price: 1200, occupancy: 2, available: false },
  { id: '103', type: 'Standard', price: 1200, occupancy: 2, available: true },
  { id: '104', type: 'Standard', price: 1200, occupancy: 2, available: true },
  { id: '105', type: 'Standard', price: 1200, occupancy: 2, available: false },

  { id: '201', type: 'Deluxe', price: 1800, occupancy: 3, available: true },
  { id: '202', type: 'Deluxe', price: 1800, occupancy: 3, available: true },
  { id: '203', type: 'Deluxe', price: 1800, occupancy: 3, available: false },
  { id: '204', type: 'Deluxe', price: 1800, occupancy: 3, available: true },
  { id: '205', type: 'Deluxe', price: 1800, occupancy: 3, available: true },

  { id: '301', type: 'Suite', price: 2500, occupancy: 4, available: false },
  { id: '302', type: 'Suite', price: 2500, occupancy: 4, available: true },
  { id: '303', type: 'Suite', price: 2500, occupancy: 4, available: true },
  { id: '304', type: 'Suite', price: 2500, occupancy: 4, available: false },
  { id: '305', type: 'Suite', price: 2500, occupancy: 4, available: true },

  { id: '401', type: 'Executive', price: 3000, occupancy: 4, available: true },
  { id: '402', type: 'Executive', price: 3000, occupancy: 4, available: false },
  { id: '403', type: 'Executive', price: 3000, occupancy: 4, available: true },
  { id: '404', type: 'Executive', price: 3000, occupancy: 4, available: true },
  { id: '405', type: 'Executive', price: 3000, occupancy: 4, available: false }
];


const CheckRoomsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  return (
    <div className="px-5 available-page py-4 mx-0">
      <h2 className="mb-4 section-title text-center">All Rooms</h2>

      <Form className="mb-4 text-center d-flex">
        <Form.Group controlId="date">
          <Form.Label>Select Check-In Date:</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ maxWidth: '300px', margin: '0 auto' }}
          />
        </Form.Group>
      </Form>

      {roomTypes.length > 0 ? (
        <Table className="room-table" bordered hover responsive>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Price</th>
              <th>Occupancy</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.type}</td>
                <td>
                  {room.available ? (
                    <Badge bg="success">Available</Badge>
                  ) : (
                    <Badge bg="danger">Occupied</Badge>
                  )}
                </td>
                <td>₹{room.price}</td>
                <td>{room.occupancy} persons</td>
                <td>{room.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-danger">No rooms available for selected date.</p>
      )}

      
    </div>
  );
};

export default CheckRoomsPage;
