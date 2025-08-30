import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Pages/Footer';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!event) {
    return (
      <>
        <Header />
        <div className="text-center mt-5">
          <h2>Event not found.</h2>
          <Button className="mt-3" variant="danger" onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
    setShowRegister(false);
    alert('Registration submitted!');
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <>
      <Header />

      <div className="container main-content">
        <h1 className="mb-3 text-danger">{event.title}</h1>
        <p className="text-secondary mb-4">{event.description}</p>

        {/* Event Info */}
        <Row className="mb-4">
          <Col md={6} className="d-flex align-items-center mb-2 mb-md-0">
            <FaCalendarAlt className="text-danger me-2" /> 
            <span>{event.date} | {event.time}</span>
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <FaMapMarkerAlt className="text-danger me-2" /> 
            <span>{event.location}</span>
          </Col>
        </Row>

        {/* Event Images */}
        {event.images && event.images.length > 0 && (
          <div className="mb-4">
            <h4 className="text-dark mb-3">Event Images</h4>
            <Row className="g-3">
              {event.images.map((img, idx) => (
                <Col md={4} key={idx}>
                  <Card>
                    <Card.Img variant="top" src={img} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Event Videos */}
        {event.videos && event.videos.length > 0 && (
          <div className="mb-4">
            <h4 className="text-dark mb-3">Event Videos</h4>
            <Row className="g-3">
              {event.videos.map((video, idx) => (
                <Col md={6} key={idx}>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={video}
                      title={`Event video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex gap-3 mb-5">
          <Button variant="danger" onClick={() => setShowRegister(true)}>Register Now</Button>
          <Button variant="secondary" onClick={() => navigate('/events')}>Back to Events</Button>
        </div>

        {/* Registration Modal */}
        <Modal show={showRegister} onHide={() => setShowRegister(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Register for {event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>

              <Button variant="danger" type="submit">Submit Registration</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default EventDetails;
