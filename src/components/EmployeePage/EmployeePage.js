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
} from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './EmployeePage.css';

const roles = ['Manager', 'Receptionist', 'Housekeeping', 'Chef', 'Security', 'Maintenance'];
const statuses = ['Active', 'On Leave', 'Resigned'];

const avatarColors = [
  '#94a3b8', '#9ca3af', '#a1a1aa', '#a3a3a3', '#a8a29e',
  '#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635',
  '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
  '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9',
  '#f472b6', '#fb7185',
];

const initialEmployees = [
  {
    id: 1,
    name: 'Anita Sharma',
    email: 'anita.sharma@example.com',
    phone: '9876543210',
    role: 'Receptionist',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '9898989898',
    role: 'Manager',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Priya Desai',
    email: 'priya.desai@example.com',
    phone: '9123456789',
    role: 'Housekeeping',
    status: 'On Leave'
  },
  {
    id: 4,
    name: 'Siddharth Gupta',
    email: 'sid.gupta@example.com',
    phone: '9988776655',
    role: 'Security',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Neha Verma',
    email: 'neha.verma@example.com',
    phone: '9871234567',
    role: 'Chef',
    status: 'Resigned'
  },
  {
    id: 6,
    name: 'Rahul Khanna',
    email: 'rahul.khanna@example.com',
    phone: '9845612378',
    role: 'Assistant Manager',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Kavita Reddy',
    email: 'kavita.reddy@example.com',
    phone: '9765432198',
    role: 'Receptionist',
    status: 'On Leave'
  },
  {
    id: 8,
    name: 'Manoj Patil',
    email: 'manoj.patil@example.com',
    phone: '9101234567',
    role: 'Maintenance',
    status: 'Active'
  },
  {
    id: 9,
    name: 'Divya Iyer',
    email: 'divya.iyer@example.com',
    phone: '9134567890',
    role: 'Housekeeping',
    status: 'Active'
  },
  {
    id: 10,
    name: 'Aman Chawla',
    email: 'aman.chawla@example.com',
    phone: '9876543098',
    role: 'Assistant Manager',
    status: 'Resigned'
  },
  {
    id: 11,
    name: 'Simran Kaur',
    email: 'simran.kaur@example.com',
    phone: '9811122334',
    role: 'Manager',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Vikram Joshi',
    email: 'vikram.joshi@example.com',
    phone: '9797979797',
    role: 'Chef',
    status: 'On Leave'
  }
];


const EmployeesPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const employeesPerPage = 6;

  const filtered = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || emp.role === filterRole;
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / employeesPerPage);

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    

    const newEmp = {
      id: editingEmployee ? editingEmployee.id : Date.now(),
      name: form.name.value,
      role: form.role.value,
      status: form.status.value,
      phone: form.phone.value,
      
    };

    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? newEmp : emp));
    } else {
      setEmployees(prev => [...prev, newEmp]);
    }

    setShowModal(false);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3 mt-4 d-flex align-items-center">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field my-2"
          />
        </Col>
        <Col md={3}>
          <Form.Select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="input-field my-2">
            <option value="All">All Roles</option>
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field my-2">
            <option value="All">All Statuses</option>
            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
          </Form.Select>
        </Col>
        <Col md={3} className="text-end">
          <Button  className="animated-button" onClick={() => { setEditingEmployee(null); setShowModal(true); }}>
            <span>Add</span>
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive className="shadow-sm table-rounded-corners">
        <thead className="table-dark">
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp, i) => (
            <tr key={emp.id}>
              <td>{indexOfFirst + i + 1}</td>
              <td>
                <div className="employee-avatar-wrapper">
                  <div className="employee-avatar" >
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="employee-name-text">{emp.name}</span>
                </div>
              </td>
              <td>{emp.role}</td>
              <td>{emp.phone}</td>
              <td>
                <span className={`employee-status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>{emp.status}</span>
              </td>
              <td>
                <Button size="sm" className="employee-action-button employee-action-button-edit" onClick={() => { setEditingEmployee(emp); setShowModal(true); }}>Edit</Button>
                <Button size="sm" className="employee-action-button employee-action-button-remove" onClick={() => { setEmployeeToDelete(emp.id); setShowDeleteModal(true); }}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-end">
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

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={editingEmployee?.name || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" defaultValue={editingEmployee?.phone || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" defaultValue={editingEmployee?.role || roles[0]}>
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={editingEmployee?.status || statuses[0]}>
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </Form.Select>
            </Form.Group>
            <div className="text-end">
              <Button className="btn-edit-cancel me-2" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="btn-edit-save" type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button className="employee-btn-remove-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button className="employee-btn-remove-confirm" onClick={() => {
            setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
            setShowDeleteModal(false);
          }}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeesPage;
