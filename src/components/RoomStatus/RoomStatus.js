import React, { useState } from 'react';
import { Container, Form, Button, Badge, Alert } from 'react-bootstrap';
import './RoomStatus.css';

const rooms = [
  { id: '101', type: 'Standard', status: 'Vacant' },
  { id: '102', type: 'Standard', status: 'Occupied' },
  { id: '103', type: 'Standard', status: 'Needs Cleaning' },
  { id: '201', type: 'Deluxe', status: 'Occupied' },
  { id: '202', type: 'Deluxe', status: 'Vacant' },
  { id: '203', type: 'Deluxe', status: 'Vacant' },
  { id: '301', type: 'Suite', status: 'Needs Cleaning' },
  { id: '302', type: 'Suite', status: 'Occupied' },
  { id: '303', type: 'Suite', status: 'Vacant' },
  { id: '304', type: 'Suite', status: 'Occupied' },
  { id: '401', type: 'Executive', status: 'Vacant' },
  { id: '402', type: 'Executive', status: 'Needs Cleaning' },
  { id: '403', type: 'Executive', status: 'Occupied' },
  { id: '404', type: 'Executive', status: 'Vacant' },
  { id: '405', type: 'Executive', status: 'Occupied' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Vacant':
      return <Badge bg="success">Vacant</Badge>;
    case 'Occupied':
      return <Badge bg="danger">Occupied</Badge>;
    case 'Needs Cleaning':
      return <Badge bg="warning" text="dark">Needs Cleaning</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

const RoomStatus = () => {
  const [roomIdInput, setRoomIdInput] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const foundRoom = rooms.find((room) => room.id === roomIdInput.trim());
    if (foundRoom) {
      setSelectedRoom(foundRoom);
      setNotFound(false);
    } else {
      setSelectedRoom(null);
      setNotFound(true);
    }
  };

  return (
    <Container className="py-4 px-5 room-status-page">
      <h2 className="mb-4 text-center">Room Status</h2>

      {/* 🔍 Search Box */}
      <Form className="mb-4 d-flex justify-content-center gap-2">
        <Form.Control
          type="text"
          placeholder="Enter Room ID (e.g. 101)"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          style={{ maxWidth: '200px' }}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {/* ✅ Room Found */}
      {selectedRoom && (
        <div className="text-center mt-4">
          <h5>Room ID: {selectedRoom.id}</h5>
          <p>Type: {selectedRoom.type}</p>
          <p>Status: {getStatusBadge(selectedRoom.status)}</p>
        </div>
      )}

      {/* ❌ Room Not Found */}
      {notFound && (
        <Alert variant="danger" className="text-center">
          Room not found.
        </Alert>
      )}
    </Container>
  );
};

export default RoomStatus;
