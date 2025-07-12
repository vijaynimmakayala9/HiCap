import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CourseEnquiryModal = ({ show, handleClose }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    city: '',
    timing: '',
    message: ''
  });

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicapbackend.onrender.com/api/users/allcourses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Form submitted!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4 bg-light rounded">
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
          <Form.Select
            name="course"
            className="mb-3"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </Form.Select>
          <Form.Control
            type="text"
            name="city"
            placeholder="City Name"
            className="mb-3"
            value={formData.city}
            onChange={handleChange}
          />
          <Form.Select
            name="timing"
            className="mb-3"
            value={formData.timing}
            onChange={handleChange}
          >
            <option value="" disabled>Preferred Timings</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Weekend">Weekend</option>
            <option value="Online">Online</option>
          </Form.Select>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            placeholder="Your Message"
            className="mb-4"
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="success" className="px-4 w-100">
            Enroll Now
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseEnquiryModal;
