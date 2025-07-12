import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavbarPage.css';

const NavbarPage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleNavClick = (path) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <div>
      <Navbar bg="dark" sticky="top" className="shadow-sm bg-black px-3">
        <Container fluid>
          <Navbar.Brand
            onClick={() => handleNavClick('/')}
            className="text-white fw-semibold fs-2"
            style={{ cursor: 'pointer' }}
          >
            Hotel Reception
          </Navbar.Brand>
          <button className="icon-button d-lg-none " onClick={toggleDrawer}>
            ☰
          </button>
          <Nav className="d-none d-lg-flex navbar">
            <Nav.Link onClick={() => handleNavClick('/bookings')} className="navbar-page-headings">Bookings</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/customers')} className="navbar-page-headings">Customers</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/rooms')} className="navbar-page-headings">Rooms</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/employees')} className="navbar-page-headings">Employees</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/logout')} className="navbar-page-headings">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Drawer */}
      <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link onClick={() => handleNavClick('/bookings')} className="drawer-link navbar-page-headings">Bookings</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/room-status')} className="drawer-link navbar-page-headings">Customers</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/rooms')} className="drawer-link navbar-page-headings">Rooms</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/employees')} className="drawer-link navbar-page-headings">Employees</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/logout')} className="drawer-link navbar-page-headings">Logout</Nav.Link>
        </Nav>
        <button
          className="icon-button"
          onClick={closeDrawer}
          style={{ position: 'absolute', top: 20, right: 30 }}
        >
          ✕
        </button>
      </div>

      {/* Overlay */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={closeDrawer}></div>}
    </div>
  );
};

export default NavbarPage;
