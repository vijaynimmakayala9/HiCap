import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaPlus, FaMinus } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from './Footer';
import AboutTechsterker from './AboutTerchsterker';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ContactUs = () => {
  const [courses, setCourses] = useState([]);
  const [isBranchVisible, setIsBranchVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    city: '',
    timing: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      const response = await fetch('https://api.techsterker.com/api/enquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire('Success', 'Your enquiry has been submitted!', 'success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: '',
          city: '',
          timing: '',
          message: '',
        });
      } else {
        Swal.fire('Error', result.message || 'Submission failed. Try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <Container fluid className="px-0">
        <AboutTechsterker />
      </Container>

      <Container className="py-5">
        <Row className="mb-5">
          <Col className="text-center">
            <div className="position-relative mb-4">
              <h2 className="text-dark mb-3 d-inline-block position-relative">
                Looking for <span style={{ color: "#a51d34" }}>Classroom/Online </span>Training?
                {/* <div
                  style={{
                    width: "150px",
                    height: "4px",
                    backgroundColor: "#a51d34",
                    borderRadius: "999px",
                    position: "absolute",
                    left: "0", // Aligns it with the start of the h2
                    bottom: "-8px",
                  }}
                ></div> */}
              </h2>
            </div>

            <p className="text-dark">
              <strong>Tel :</strong>{' '}
              <a href="tel:+916309161616" className="text-meroon fw-semibold">
                +91 6309 16 16 16
              </a>{' '}
              /{' '}
              <strong>E-Mail :</strong>{' '}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com" target='_blank' className="text-meroon fw-semibold">
                info.courses@gmail.com
              </a>
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          {/* Enquiry Form */}
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="bg-light p-4 rounded shadow">
              <h2 className="text-meroon mb-4">Course Enquiry Form</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City Name"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select
                    name="timing"
                    value={formData.timing}
                    onChange={handleChange}
                  >
                    <option value="">Preferred Timings</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Weekend">Weekend</option>
                    <option value="Online">Online</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Form.Group>

                <button
                  className="btn btn-lg gradient-button w-100 py-3 fw-semibold"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </Form>
            </div>
          </Col>

          {/* Branch Details Toggle Section */}
          <Col lg={6}>
            <div className="rounded border shadow overflow-hidden">
              <div
                className="bg-meroon text-white px-4 py-3 d-flex justify-content-between align-items-center cursor-pointer"
                onClick={() => setIsBranchVisible(!isBranchVisible)}
              >
                <span className="fw-semibold text-uppercase">Hyderabad</span>
                {isBranchVisible ? <FaMinus /> : <FaPlus />}
              </div>

              {isBranchVisible && (
                <>
                  <div className="p-4">
                    <h3 className="text-meroon mb-3">Hyderabad Branch</h3>
                    <p className="text-dark mb-3">
                      Plot No. MIG-208, GSR Enclave, 3rd Floor, Above the Arvind Store,<br />
                      Road No. 1, KPHB Colony, Kukatpally, Hyderabad, 500072
                    </p>
                    <p className="text-dark mb-3">
                      <strong>Tel :</strong>{' '}
                      <a href="tel:+916309161616" className="text-meroon fw-semibold">
                        +91 6309 16 16 16
                      </a>{' '}
                      /{' '}
                      <a href="tel:+916309171717" className="text-meroon fw-semibold">
                        +91 6309 17 17 17
                      </a>
                    </p>
                    <p className="text-dark">
                      <strong>Email :</strong>{' '}
                      <a href="mailto:info@Techsterker.com" className="text-meroon fw-semibold">
                        info@Techsterker.com
                      </a>
                    </p>
                  </div>
                  <div className="ratio ratio-16x9">
                    <iframe
                      title="Techsterker IT Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3433657893185!2d78.39761891418862!3d17.44246400523407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9156ed0e6b8f%3A0x8ac1071d0275821f!2sTechsterker%20-%20IT%20Training%20Institute!5e0!3m2!1sen!2sin!4v1659340731616!5m2!1sen!2sin"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default ContactUs;
