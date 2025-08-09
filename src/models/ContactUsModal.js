import React, { useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";

const ContactUsModal = ({ show, onHide }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${contactData.name}! We received your enquiry.`);
    setContactData({
      name: "",
      email: "",
      phone: "",
      enquiryType: "",
      message: "",
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-meroon text-white">
        <Modal.Title>Contact Us / Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleContactSubmit}>
          <Form.Group className="mb-3" controlId="contactName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={contactData.name}
              onChange={handleContactChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactPhone">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-telephone-fill text-meroon"></i>
              </InputGroup.Text>
              <Form.Control
                type="tel"
                placeholder="+1 234 567 890"
                name="phone"
                value={contactData.phone}
                onChange={handleContactChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactEnquiryType">
            <Form.Label>Enquiry Type</Form.Label>
            <Form.Select
              name="enquiryType"
              value={contactData.enquiryType}
              onChange={handleContactChange}
              required
            >
              <option value="">Select enquiry type</option>
              <option value="course">Course Information</option>
              <option value="admission">Admission Process</option>
              <option value="fees">Fees & Payment</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your message here"
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
            />
          </Form.Group>

          <div className="d-grid">
            <Button className="gradient-button fw-semibold" type="submit">
              Submit Enquiry
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsModal;