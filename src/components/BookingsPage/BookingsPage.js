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

import './BookingsPage.css';

const initialBookings = [
  { id: 1, guestName: 'John Doe', room: 101, checkIn: '2025-07-10', checkOut: '2025-07-15', status: 'Booked' },
  { id: 2, guestName: 'Jane Smith', room: 203, checkIn: '2025-07-12', checkOut: '2025-07-14', status: 'Checked-in' },
  { id: 3, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 4, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 5, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 6, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 7, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 8, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 9, guestName: 'John Doe', room: 101, checkIn: '2025-07-10', checkOut: '2025-07-15', status: 'Booked' },
  { id: 10, guestName: 'Jane Smith', room: 203, checkIn: '2025-07-12', checkOut: '2025-07-14', status: 'Checked-in' },
  { id: 11, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 12, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
  { id: 13, guestName: 'Sam Patel', room: 305, checkIn: '2025-07-05', checkOut: '2025-07-08', status: 'Cancelled' },
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    guestName: '',
    room: '',
    checkIn: '',
    checkOut: '',
    status: 'Booked',
    idProof: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);



  const bookingsPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleNewBookingChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idProof') {
      setNewBooking({ ...newBooking, idProof: files[0] });
    } else {
      setNewBooking({ ...newBooking, [name]: value });
    }
  };

  const handleNewBookingSubmit = (e) => {
    e.preventDefault();
    const newId = bookings.length + 1;

    if (newBooking.idProof) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const bookingWithProof = {
          ...newBooking,
          id: newId,
          idProofPreview: reader.result,
        };

        setBookings([...bookings, bookingWithProof]);
        resetForm();
      };
      reader.readAsDataURL(newBooking.idProof);
    } else {
      setBookings([
        ...bookings,
        { id: newId, ...newBooking, idProofPreview: null },
      ]);
      resetForm();
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setNewBooking({
      guestName: '',
      room: '',
      checkIn: '',
      checkOut: '',
      status: 'Booked',
      idProof: null,
    });
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowEditModal(true);
  };

  const handleSaveEditedBooking = () => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === editingBooking.id ? editingBooking : b
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteClick = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingToDelete));
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };




  const filteredBookings = bookings.filter(
    (booking) =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toString().includes(searchTerm)
  );

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <Container className="py-4">
      {/* <h2 className="mb-4 bookings-section-title">Bookings</h2> */}

      <Row className="mb-3 mt-4 d-flex g-2 justify-content-space">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Guest Name or Room Number"
            value={searchTerm}
            onChange={handleSearch}
            className="input-field"
          />
        </Col>
        <Col xs={12} md={2} className="text-md-end">
          <Button className="animated-button w-100 w-md-auto" onClick={() => setShowModal(true)}>
            <span>Add</span>
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive className="shadow-sm table-rounded-corners">
        <thead className="table-dark">
          <tr>
            <th>Sno</th>
            <th>Guest Name</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>ID Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.length > 0 ? (
            currentBookings.map((b, idx) => (
              <tr key={b.id}>
                <td>{indexOfFirst + idx + 1}</td>
                <td>{b.guestName}</td>
                <td>{b.room}</td>
                <td>{b.checkIn}</td>
                <td>{b.checkOut}</td>
                <td>
                  <span className={`status-badge ${
                    b.status === 'Booked' ? 'status-booked' :
                    b.status === 'Checked-in' ? 'status-checked-in' :
                    'status-cancelled'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.idProofPreview ? (
                    <Image src={b.idProofPreview} thumbnail width={60} alt="ID Proof" />
                  ) : (
                    <small className="text-muted">No file</small>
                  )}
                </td>
                <td>
                  <div className="d-flex flex-column flex-md-row">
                    <Button size="sm" className="bookings-action-button bookings-action-button-view" onClick={() => handleViewBooking(b)}>View</Button>
                    <Button size="sm" className="bookings-action-button bookings-action-button-edit" onClick={() => handleEditBooking(b)}>Edit</Button>
                    <Button size="sm" className="bookings-action-button bookings-action-button-remove" onClick={() => handleDeleteClick(b.id)}>Remove</Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No bookings found</td></tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="text-end">
              <Pagination className="justify-content-end m-0">
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <BsChevronLeft size={18} />
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx}
                    active={idx + 1 === currentPage}
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <BsChevronRight size={18} />
                </Pagination.Next>
              </Pagination>
            </td>
          </tr>
        </tfoot>
      </Table>








      {/* Add Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewBookingSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Guest Name</Form.Label>
              <Form.Control
                type="text"
                name="guestName"
                required
                value={newBooking.guestName}
                onChange={handleNewBookingChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="number"
                name="room"
                required
                value={newBooking.room}
                onChange={handleNewBookingChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Check-In Date</Form.Label>
              <Form.Control
                type="date"
                name="checkIn"
                required
                value={newBooking.checkIn}
                onChange={handleNewBookingChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Check-Out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOut"
                required
                value={newBooking.checkOut}
                onChange={handleNewBookingChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID Proof (Aadhaar / Passport)</Form.Label>
              <Form.Control
                type="file"
                name="idProof"
                accept="image/*,application/pdf"
                onChange={handleNewBookingChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>{' '}
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking ? (
            <div className="modal-body-content">
              <div className="modal-detail-row">
                <span className="modal-detail-label">Guest Name:</span>
                <span className="modal-detail-value">{selectedBooking.guestName}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Room:</span>
                <span className="modal-detail-value">{selectedBooking.room}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Check-In:</span>
                <span className="modal-detail-value">{selectedBooking.checkIn}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Check-Out:</span>
                <span className="modal-detail-value">{selectedBooking.checkOut}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Status:</span>
                <span className="modal-detail-value">
                  <span className={`status-badge ${selectedBooking.status === "Booked"
                    ? "status-booked"
                    : selectedBooking.status === "Checked-in"
                      ? "status-checked-in"
                      : selectedBooking.status === "Cancelled"
                        ? "status-cancelled"
                        : ""
                    }`}>
                    {selectedBooking.status}
                  </span>
                </span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">ID Proof:</span>
                <span className="modal-detail-value">
                  {selectedBooking.idProofPreview ? (
                    <Image
                      src={selectedBooking.idProofPreview}
                      thumbnail
                      width={140}
                      alt="ID Proof"
                      className="modal-id-proof-img"
                      onClick={() => {
                        setSelectedImageSrc(selectedBooking.idProofPreview);
                        setShowImageModal(true);
                      }}
                      style={{ cursor: 'zoom-in' }}
                    />
                  ) : (
                    <small className="text-muted">No file</small>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <p>No booking selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-view-close" onClick={() => setShowViewModal(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview ID Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImageSrc && (
            <Image
              src={selectedImageSrc}
              fluid
              alt="Enlarged ID Proof"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingBooking && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEditedBooking();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Guest Name</Form.Label>
                <Form.Control
                  type="text"
                  name="guestName"
                  value={editingBooking.guestName}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      guestName: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Number</Form.Label>
                <Form.Control
                  type="number"
                  name="room"
                  value={editingBooking.room}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      room: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkIn"
                  value={editingBooking.checkIn}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      checkIn: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOut"
                  value={editingBooking.checkOut}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      checkOut: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editingBooking.status}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Booked">Booked</option>
                  <option value="Checked-in">Checked-in</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>

              <div className="text-end">
                <Button
                  className="btn-edit-cancel me-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button className="btn-edit-save" type="submit">
                  Save Changes
                </Button>

              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this booking? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-remove-confirm-cancel' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button className='btn-remove-confirm-delete' onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>




    </Container>
  );
};

export default BookingsPage;
