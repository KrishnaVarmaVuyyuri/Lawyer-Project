import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import hotelLogo from '../../assets/hotelLogo.jpg';
import { Carousel } from 'react-bootstrap';
import './Home.css';
import banner1 from '../../assets/hero-reception.jpg';
import banner2 from '../../assets/hero-bedroom.jpg';
import banner3 from '../../assets/hero-living.jpg';
import banner4 from '../../assets/hero-kitchen.jpg';
export const Home = () => {
  return (
    <div>
      {/* Top Contact Bar */}
      <div className="top-contact-bar">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={8} sm={12} className="contact-info d-flex align-items-center">
              <span className="icon"><FaPhoneAlt /></span>
              <span className="text">08457-220033, +91 8019712345</span>
              <div className="divider" />
              <span className="icon"><FaEnvelope /></span>
              <span className="text">info@hotelswarnapalace.com</span>
            </Col>
            <Col md={4} sm={12} className="social-icons text-md-end text-center mt-2 mt-md-0">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Header with Logo and Navigation */}
      <div className="main-header">
        <Container fluid>
          <Row className="align-items-center py-3">
            <Col md={4} className="d-flex justify-content-start align-items-center">
              <img src={hotelLogo} alt="Hotel Logo" className="hotel-logo mx-3" />
              <h2 className="hotel-name">LUXURY LOGO</h2>
            </Col>
           <Col md={8} className="mt-2 mt-md-0">
  <div className="nav-links d-flex flex-wrap justify-content-md-evenly justify-content-center">
    <a href="#" className="nav-item">HOME</a>
    <a href="#" className="nav-item">ABOUT US</a>
    <a href="#" className="nav-item">GALLERY</a>
    <a href="#" className="nav-item">ROOM BOOKING</a>
    <a href="#" className="nav-item">CONTACT US</a>
  </div>
</Col>

          </Row>
          <Carousel controls={false} indicators={true} interval={1500} fade className="banner-carousel">
  <Carousel.Item>
    <img className="d-block w-100 banner-img" src={banner1} alt="Banner 1" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100 banner-img" src={banner2} alt="Banner 2" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100 banner-img" src={banner3} alt="Banner 3" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100 banner-img" src={banner4} alt="Banner 4" />
  </Carousel.Item>
</Carousel>

        </Container>
      </div>
    </div>
  );
};
