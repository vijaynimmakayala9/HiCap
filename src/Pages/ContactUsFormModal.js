import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ContactFormModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body className="p-0">
        <Row className="g-0">
          {/* Left - Map */}
          <Col xs={12} md={6}>
            <div className="ratio ratio-4x3 ratio-md-16x9">
              <iframe
                title="Techsterker IT Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3433657893185!2d78.39761891418862!3d17.44246400523407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9156ed0e6b8f%3A0x8ac1071d0275821f!2sTechsterker%20-%20IT%20Training%20Institute!5e0!3m2!1sen!2sin!4v1659340731616!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>

          {/* Right - Form */}
          <Col xs={12} md={6} className="p-4 bg-light">
            <h5 className="mb-3">Contact Us</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your Name*"
                className="mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Your Phone Number*"
                className="mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Form.Control
                type="email"
                name="email"
                placeholder="Your Email"
                className="mb-3"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control
                as="textarea"
                name="message"
                rows={3}
                placeholder="Your Message"
                className="mb-3"
                value={formData.message}
                onChange={handleChange}
              />
              <Button type="submit" className="w-100 bg-danger border-0">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ContactFormModal;
