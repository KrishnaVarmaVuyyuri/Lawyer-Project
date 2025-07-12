import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <Container>
        <Row className="footer-top">

          {/* Social or Logo */}
          <Col md={3}>
            <h6>Stay Connected</h6>
            <p>Follow us for updates & offers.</p>
            <div className="footer-socials">
              {/* You can add social icons here if needed */}
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/bookings">Bookings</a></li>
              <li><a href="/customers">Customers</a></li>
              <li><a href="/rooms">Rooms</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h6>Contact Us</h6>
            <p><FiPhone /> +91 98765 43210</p>
            <p><FiMail /> info@stayinn.com</p>
            <p><FiMapPin /> MG Road, Bangalore, India</p>
          </Col>

          

          <Col md={3}>
            <h6>About Us</h6>
            <p>
              StayInn Hotel offers comfort, quality, and convenience at the heart of the city. 
              Our dashboard helps streamline bookings and manage your guest data effortlessly.
            </p>
          </Col>
        </Row>

        {/* Bottom Row */}
        <Row className="footer-bottom">
          <Col className="text-center">
            <small>© {new Date().getFullYear()} StayInn Hotel. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
