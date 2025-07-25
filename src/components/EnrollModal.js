// CourseEnquiryModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CourseEnquiryModal = ({ show, handleClose, prefillCourse = '' }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: prefillCourse,
    city: '',
    timing: '',
    message: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, course: prefillCourse }));
  }, [prefillCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      section: [{ name: formData.course }],
      city: formData.city,
      timings: [{ preferred: formData.timing }],
      message: formData.message
    };

    try {
      const response = await fetch('https://hicap-backend-4rat.onrender.com/api/enquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        Swal.fire({ icon: 'success', title: 'Enquiry Submitted', text: 'We will get back to you soon!' });
        setFormData({ name: '', phone: '', email: '', course: '', city: '', timing: '', message: '' });
        handleClose();
      } else {
        Swal.fire({ icon: 'error', title: 'Submission Failed', text: 'Please try again later.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({ icon: 'error', title: 'Network Error', text: 'Unable to submit enquiry.' });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4 bg-light rounded">
        <Form onSubmit={handleSubmit}>
          <Form.Control type="text" name="name" placeholder="Your Name*" className="mb-3" value={formData.name} onChange={handleChange} required />
          <Form.Control type="tel" name="phone" placeholder="Your Phone Number*" className="mb-3" value={formData.phone} onChange={handleChange} required />
          <Form.Control type="email" name="email" placeholder="Your Email" className="mb-3" value={formData.email} onChange={handleChange} />
          <Form.Select name="course" className="mb-3" value={formData.course} onChange={handleChange} required>
            <option value="" disabled>Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </Form.Select>
          <Form.Control type="text" name="city" placeholder="City Name" className="mb-3" value={formData.city} onChange={handleChange} />
          <Form.Select name="timing" className="mb-3" value={formData.timing} onChange={handleChange}>
            <option value="" disabled>Preferred Timings</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Weekend">Weekend</option>
            <option value="Online">Online</option>
          </Form.Select>
          <Form.Control as="textarea" name="message" rows={3} placeholder="Your Message" className="mb-4" value={formData.message} onChange={handleChange} />
          <Button type="submit" variant="success" className="px-4 w-100">Enroll Now</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseEnquiryModal;