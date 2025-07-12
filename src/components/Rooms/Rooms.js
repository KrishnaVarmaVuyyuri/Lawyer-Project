import React, { useState } from 'react';
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Pagination,
  Image,
} from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import './Rooms.css';

const initialRooms = [
  {
    id: 1,
    roomNo: 101,
    type: 'Single',
    status: 'Available',
    price: 1200,
    features: 'AC',
    capacity: 1,

  },
  {
    id: 2,
    roomNo: 102,
    type: 'Double',
    status: 'Occupied',
    price: 1800,
    features: 'Non-AC',
    capacity: 2,
   
  },
  {
    id: 3,
    roomNo: 103,
    type: 'Double',
    status: 'Occupied',
    price: 1900,
    features: 'Non-AC',
    capacity: 1,
   
  },
  {
    id: 4,
    roomNo: 104,
    type: 'Single',
    status: 'Available',
    price: 1800,
    features: 'Non-AC',
    capacity: 2,
   
  },
  {
    id: 5,
    roomNo: 201,
    type: 'Double',
    status: 'Occupied',
    price: 1700,
    features: 'AC',
    capacity: 3,
   
  },
  {
    id: 6,
    roomNo: 403,
    type: 'Double',
    status: 'Available',
    price: 900,
    features: 'Non-AC',
    capacity: 2,
   
  },
  {
    id: 7,
    roomNo: 600,
    type: 'Suite',
    status: 'Occupied',
    price: 4000,
    features: 'AC',
    capacity: 12,
   
  },
  {
    id: 8,
    roomNo: 345,
    type: 'Single',
    status: 'Available',
    price: 800,
    features: 'Non-AC',
    capacity: 1,
   
  },
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [roomToDelete, setRoomToDelete] = useState(null);
  const roomsPerPage = 6;

  const filteredRooms = rooms
    .filter(
      (room) =>
        (filterStatus === 'All' || room.status === filterStatus) &&
        (room.roomNo.toString().includes(searchTerm) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.features.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === 'PriceLow') return a.price - b.price;
      if (sortOption === 'PriceHigh') return b.price - a.price;
      if (sortOption === 'Type') return a.type.localeCompare(b.type);
      return 0;
    });

  const indexOfLast = currentPage * roomsPerPage;
  const indexOfFirst = indexOfLast - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newRoom = {
      id: editingRoom ? editingRoom.id : Date.now(),
      roomNo: form.roomNo.value,
      type: form.type.value,
      status: form.status.value,
      price: parseFloat(form.price.value),
      features: form.features.value,
      capacity: parseInt(form.capacity.value),
      
    };

    if (editingRoom) {
      setRooms((prev) => prev.map((r) => (r.id === editingRoom.id ? newRoom : r)));
    } else {
      setRooms((prev) => [...prev, newRoom]);
    }

    setShowModal(false);
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleDeleteRoom = (roomId) => {
  setRoomToDelete(roomId);
  setShowDeleteModal(true);
};

const confirmDeleteRoom = () => {
  setRooms(prev => prev.filter(room => room.id !== roomToDelete));
  setShowDeleteModal(false);
  setRoomToDelete(null);
};


  return (
    <Container className="py-4">
      <Row className="mb-3 gy-2">
        <Col md={3} xs={12}>
          <Form.Control
            placeholder="Search Room No, Type or Feature"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rooms-input-field"
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field">
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="input-field">
            <option value="">Sort By</option>
            <option value="PriceLow">Price: Low to High</option>
            <option value="PriceHigh">Price: High to Low</option>
            <option value="Type">Room Type</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3} className="text-end">
          <Button className="animated-button" onClick={() => setShowModal(true)}>
            <span>Add</span>
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive className="shadow-sm table-rounded-corners">
        <thead className="table-dark">
          <tr>
            <th>Sno</th>
            <th>Room No</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price (INR)</th>
            <th>Features</th>
            <th>Capacity</th>
 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.length ? (
            currentRooms.map((r, i) => (
              <tr key={r.id}>
                <td>{indexOfFirst + i + 1}</td>
                <td>{r.roomNo}</td>
                <td>{r.type}</td>
                <td><span className={`status-badge ${r.status === 'Available' ? 'status-checked-in' : 'status-cancelled'}`}>{r.status}</span></td>
                <td>₹{r.price}</td>
                <td>{r.features}</td>
                <td>{r.capacity}</td>
                
                <td>
                  <Button size="sm" className="rooms-action-button action-button-edit" onClick={() => handleEdit(r)}>Edit</Button>
                  <Button
  className="rooms-action-button action-button-remove"
  size="sm"
  onClick={() => handleDeleteRoom(r.id)}
>
  Remove
</Button>

                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9" className="text-center">No rooms found</td></tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="9" className="text-end">
              <Pagination className="justify-content-end m-0">
                <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                  <BsChevronLeft size={18} />
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item key={idx} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                  <BsChevronRight size={18} />
                </Pagination.Next>
              </Pagination>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditingRoom(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? 'Edit Room' : 'Add Room'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrEdit}>
            <Form.Group className="mb-2">
              <Form.Label>Room No</Form.Label>
              <Form.Control name="roomNo" type="number" required defaultValue={editingRoom?.roomNo || ''} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" defaultValue={editingRoom?.type || 'Single'}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={editingRoom?.status || 'Available'}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price (INR)</Form.Label>
              <Form.Control name="price" type="number" step="0.01" required defaultValue={editingRoom?.price || ''} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Features</Form.Label>
              <Form.Select name="features" defaultValue={editingRoom?.features || 'AC'}>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Capacity</Form.Label>
              <Form.Control name="capacity" type="number" required defaultValue={editingRoom?.capacity || ''} />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this room?
  </Modal.Body>
  <Modal.Footer>
    <Button
      className="room-btn-remove-cancel"
      onClick={() => setShowDeleteModal(false)}
    >
      Cancel
    </Button>
    <Button
      className="room-btn-remove-confirm"
      onClick={confirmDeleteRoom}
    >
      Yes, Delete
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default RoomsPage;

