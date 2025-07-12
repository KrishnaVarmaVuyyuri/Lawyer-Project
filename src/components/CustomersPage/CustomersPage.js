import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Pagination
} from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import './CustomersPage.css'; 

const initialCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@mail.com', phone: '1234567890', status: 'Active', paymentStatus: 'Paid' },
  { id: 2, name: 'Bob Smith', email: 'bob@mail.com', phone: '9876543210', status: 'Past', paymentStatus: 'Unpaid' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@mail.com', phone: '9988776655', status: 'Active', paymentStatus: 'Paid' },
  { id: 4, name: 'Varma', email: 'varma@mail.com', phone: '9986776655', status: 'Active', paymentStatus: 'Paid' },
  { id: 5, name: 'Krishna', email: 'krishna@mail.com', phone: '9988746655', status: 'Active', paymentStatus: 'Paid' },
  { id: 6, name: 'Abhi Ram', email: 'ram@mail.com', phone: '9999776655', status: 'Past', paymentStatus: 'Paid' },
  { id:7, name: 'Shiva', email: 'shiva@mail.com', phone: '9988236655', status: 'Active', paymentStatus: 'UnPaid' },
];

const avatarColors = [
  '#94a3b8', '#9ca3af', '#a1a1aa', '#a3a3a3', '#a8a29e', '#f87171',
  '#fb923c', '#fbbf24', '#facc15', '#a3e635', '#4ade80', '#34d399',
  '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa',
  '#c084fc', '#e879f9', '#f472b6', '#fb7185'
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const customersPerPage = 8;

  useEffect(() => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.avatarColor
          ? c
          : { ...c, avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)] }
      )
    );
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter(c =>
    (filterStatus === 'All' || c.status === filterStatus) &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleAddNew = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newCustomer = {
      id: editingCustomer ? editingCustomer.id : Date.now(),
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      status: form.status.value,
      paymentStatus: form.paymentStatus.value,
      avatarColor: editingCustomer?.avatarColor || randomColor
    };

    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? newCustomer : c));
    } else {
      setCustomers(prev => [...prev, newCustomer]);
    }

    setShowModal(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const confirmDeleteCustomer = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete));
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3 mt-4 d-flex gy-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
            className="input-field "
          />
        </Col>
        <Col md={4}>
          <Form.Select className="input-field" onChange={handleFilterChange} value={filterStatus}>
            <option value="All">All Customers</option>
            <option value="Active">Active Customers</option>
            <option value="Past">Past Customers</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          <Button className="animated-button" onClick={handleAddNew}>
            <span>Add</span>
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive className="shadow-sm table-rounded-corners">
        <thead className="table-dark">
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((c, i) => (
              <tr key={c.id}>
                <td>{indexOfFirst + i + 1}</td>
                <td>
                  <div className="customer-avatar-wrapper">
                    <div
                      className="customer-avatar"
                      style={{ backgroundColor: c.avatarColor }}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="customer-name-text">{c.name}</div>
                  </div>
                </td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <span className={`status-badge ${
                    c.status === 'Active' ? 'status-checked-in' : 'status-cancelled'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${
                    c.paymentStatus === 'Paid' ? 'status-checked-in' : 'status-cancelled'
                  }`}>
                    {c.paymentStatus}
                  </span>
                </td>
                <td>
                  <Button size="sm" className="customer-action-button customer-action-button-edit" onClick={() => handleEdit(c)}>Edit</Button>
                  <Button
                    className="customer-action-button customer-action-button-remove"
                    size="sm"
                    onClick={() => handleDeleteCustomer(c.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center">No customers found</td></tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className="text-end">
              <Pagination className="justify-content-end m-0">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  <BsChevronLeft size={18} />
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx}
                    active={idx + 1 === currentPage}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                  <BsChevronRight size={18} />
                </Pagination.Next>
              </Pagination>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={editingCustomer?.name || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" defaultValue={editingCustomer?.email || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" defaultValue={editingCustomer?.phone || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={editingCustomer?.status || 'Active'}>
                <option value="Active">Active</option>
                <option value="Past">Past</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Status</Form.Label>
              <Form.Select name="paymentStatus" defaultValue={editingCustomer?.paymentStatus || 'Paid'}>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </Form.Select>
            </Form.Group>
            <div className="text-end">
              <Button className="btn-edit-cancel me-2" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="btn-edit-save" type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this customer?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="customer-btn-remove-cancel"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="customer-btn-remove-confirm"
            onClick={confirmDeleteCustomer}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomersPage;
