import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import Swal from "sweetalert2";

const ContactUsModal = ({ show, type, onHide }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: type,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleContactChange = (name, value) => {
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.enquiryType) {
      Swal.fire("Warning", "Please fill in all required fields.", "warning");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: contactData.name,
        email: contactData.email,
        phoneNumber: `+${contactData.phone}`, // include country code
        enquiryType: contactData.enquiryType,
        message: contactData.message,
      };
      const response = await axios.post("http://31.97.206.144:5001/api/contactus", payload);

      if (response.data.success) {
        Swal.fire("Success", "Your enquiry has been submitted!", "success");
        setContactData({
          name: "",
          email: "",
          phone: "",
          enquiryType: "",
          message: "",
        });
        onHide();
      } else {
        Swal.fire("Error", response.data.message || "Failed to submit enquiry.", "error");
      }
    } catch (error) {
      console.error("Contact submission error:", error.response || error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Server error while submitting enquiry.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-meroon text-white">
        <Modal.Title>Contact Us / Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleContactSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={contactData.name}
              onChange={(e) => handleContactChange("name", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={contactData.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
              country={"in"}
              value={contactData.phone}
              onChange={(phone) => handleContactChange("phone", phone)}
              inputClass="form-control"
              placeholder="Enter phone number"
              required
            />
            <Form.Text className="text-muted">
              Select your country code. We'll send a verification code if needed.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enquiry Type</Form.Label>
            <Form.Select
              value={contactData.enquiryType}
              onChange={(e) => handleContactChange("enquiryType", e.target.value)}
              required
            >
              <option value="" disabled>Select enquiry type</option>
              <option value="resume">Resume Building</option>
              <option value="mock">Mock Interviews</option>
              <option value="realtime">Real Time Assistance</option>
              <option value="project">Project Assistance</option>
              <option value="placement">Placement Assistance</option>
              <option value="oneonone">One-On-One Session</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your message here"
              value={contactData.message}
              onChange={(e) => handleContactChange("message", e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" className="gradient-button fw-semibold" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Submitting...
                </>
              ) : (
                "Submit Enquiry"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsModal;
