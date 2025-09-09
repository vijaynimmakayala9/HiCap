import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../Pages/Footer";
import Header from "../Header/Header";

const Careers = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    experties: "",
    experience: "",
    message: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axios.post("https://backend-hicap.onrender.com/api/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("✅ Success", "Application submitted successfully!", "success");

      // reset form
      setFormData({
        fullname: "",
        email: "",
        mobile: "",
        experties: "",
        experience: "",
        message: "",
        resume: null,
      });
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire("❌ Error", "Failed to submit application", "error");
    }
  };

  return (
    <>
      <Header />
      <Container className="main-content mb-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center fw-bold textcolor mb-4">
              Apply as an Instructor
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  placeholder="Enter your phone number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expertise</Form.Label>
                <Form.Control
                  type="text"
                  name="experties"
                  placeholder="Your field of expertise"
                  value={formData.experties}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Experience (Years)</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  placeholder="Years of experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  placeholder="Why do you want to be an instructor?"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <button
                  className="btn btn-lg bg-meroonlight text-white w-100"
                  type="submit"
                >
                  Submit Application
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Careers;
