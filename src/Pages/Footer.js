import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://hicap-backend-4rat.onrender.com/api/course1');
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Contact Address */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <img 
                src='/logo/hicaplogolight.png' 
                alt="HICAP Logo" 
                className="img-fluid mb-3" 
                style={{ maxWidth: '180px' }} 
              />
              <address className="small">
                <p className="mb-2"><strong>Plan No. MG-208, GSR Endava</strong></p>
                <p className="mb-2">3rd Floor, Above the Arrival Store</p>
                <p className="mb-2">Road No. 1, VPHB Colony</p>
                <p className="mb-3">Kidapally, Hyderabad, 502072</p>
                <p className="mb-1">
                  <a href="tel:+916299161616" className="text-white text-decoration-none">+91 6299 16 16 16</a>
                </p>
                <p className="mb-1">
                  <a href="tel:+916299171717" className="text-white text-decoration-none">+91 6299 17 17 17</a>
                </p>
                <p className="mb-0">
                  <a href="mailto:info@hicap.com" className="text-white text-decoration-none">info@hicap.com</a>
                </p>
              </address>
            </div>
          </div>

          {/* Courses Section */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold mb-3 h6">Training Courses</h5>
              <ul className="list-unstyled small">
                {loading ? (
                  <li>Loading courses...</li>
                ) : (
                  courses.slice(0, 4).map((course) => (
                    <li key={course._id} className="mb-2">
                      <a href="#" className="text-white-50 text-decoration-none">- {course.name}</a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold mb-3 h6">Popular Courses</h5>
              <ul className="list-unstyled small">
                {loading ? (
                  <li>Loading popular courses...</li>
                ) : (
                  courses.filter(course => course.isPopular).map((course) => (
                    <li key={course._id} className="mb-2">
                      <a href="#" className="text-white-50 text-decoration-none">- {course.name}</a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Social Section */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold mb-3 h6">We're Social!</h5>
              <div className="d-flex gap-3 mb-4">
                <a href="#" className="text-white" aria-label="Facebook">
                  <FaFacebookF size={18} />
                </a>
                <a href="#" className="text-white" aria-label="Twitter">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="text-white" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="#" className="text-white" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>
              </div>
              <p className="small mb-2 text-white-50">
                Copyright © {new Date().getFullYear()} HICAP, Rights Reserved
              </p>
              <p className="small text-white-50">Website Design by Team HICAP</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="row mt-3">
          <div className="col-12">
            <hr className="my-2 border-secondary" />
            <p className="small text-center text-white-50 mb-0">
              &copy; {new Date().getFullYear()} HICAP. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;