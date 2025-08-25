// CourseEnquiryModal.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CourseEnquiryModal = ({ show, handleClose, prefillCourse = '' }) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const courseInputRef = useRef(null);
  const suggestionsRef = useRef(null);

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
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/coursecontroller');
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
    setSearchTerm(prefillCourse || '');
  }, [prefillCourse]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        courseInputRef.current &&
        !courseInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFormData(prev => ({ ...prev, course: e.target.value }));
    setShowSuggestions(true);
  };

  const handleCourseSelect = (courseName) => {
    setFormData(prev => ({ ...prev, course: courseName }));
    setSearchTerm(courseName);
    setShowSuggestions(false);
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
        setSearchTerm('');
        handleClose();
      } else {
        Swal.fire({ icon: 'error', title: 'Submission Failed', text: 'Please try again later.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({ icon: 'error', title: 'Network Error', text: 'Unable to submit enquiry.' });
    }
  };

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onFocus={() => setShowSuggestions(false)}
            required
          />
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Your Phone Number*"
            className="mb-3"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(false)}
            required
          />
          <Form.Control
            type="email"
            name="email"
            placeholder="Your Email"
            className="mb-3"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(false)}
          />

          {/* Searchable Course Input */}
          <div className="position-relative mb-3" ref={courseInputRef}>
            <Form.Control
              type="text"
              placeholder="Search or Select Course*"
              value={searchTerm}
              onChange={handleCourseInputChange}
              onFocus={() => setShowSuggestions(true)}
              required
            />
            {showSuggestions && filteredCourses.length > 0 && (
              <ListGroup
                ref={suggestionsRef}
                className="position-absolute w-100 shadow-sm"
                style={{
                  zIndex: 1000,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }}
              >
                {filteredCourses.map((course) => (
                  <ListGroup.Item
                    key={course._id}
                    action
                    onClick={() => handleCourseSelect(course.name)}
                  >
                    {course.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>

          <Form.Control
            type="text"
            name="city"
            placeholder="City Name"
            className="mb-3"
            value={formData.city}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(false)}
          />
          <Form.Select
            name="timing"
            className="mb-3"
            value={formData.timing}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(false)}
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
            onFocus={() => setShowSuggestions(false)}
          />
          <Button type="submit" className="px-4 w-100 bg-meroon border-0">
            Enroll Now
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseEnquiryModal;
