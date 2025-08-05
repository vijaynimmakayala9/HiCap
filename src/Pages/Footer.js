import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [courses, setCourses] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
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

    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get('https://hicap-backend-4rat.onrender.com/api/social-media');
        if (response.data.success) {
          const links = {};
          response.data.data.forEach(item => {
            links[item.name.toLowerCase()] = item.link.startsWith('http') ? item.link : `https://${item.link}`;
          });
          setSocialLinks(links);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchCourses();
    fetchSocialLinks();
  }, []);

  return (
    <footer className="text-white pt-5 pb-3 mt-5"style={{backgroundColor: "#800000"}}>
      <div className="container">
        <div className="row g-4">
          {/* Logo & Description */}
          <div className="col-12 col-sm-6 col-lg-4">
            <img
              src="/logo/lightlogo.png"
              alt="HICAP Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: '300px' }}
            />
            <p className="small text-white-50">
              HICAP is committed to excellence in training and skill development, empowering individuals to reach their professional goals through innovative and industry-relevant courses.
            </p>
          </div>

          {/* Training & Popular Courses */}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="row">
              <div className="col-6">
                <h6 className="fw-bold mb-3">Training Courses</h6>
                <ul className="list-unstyled small">
                  {loading ? (
                    <li>Loading...</li>
                  ) : (
                    courses.slice(0, 4).map((course) => (
                      <li key={course._id} className="mb-2">
                        <a href="#" className="text-white-50 text-decoration-none hover-white">• {course.name}</a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="col-6">
                <h6 className="fw-bold mb-3">Popular Courses</h6>
                <ul className="list-unstyled small">
                  {loading ? (
                    <li>Loading...</li>
                  ) : (
                    courses.filter(c => c.isPopular).slice(0, 4).map((course) => (
                      <li key={course._id} className="mb-2">
                        <a href="#" className="text-white-50 text-decoration-none hover-white">• {course.name}</a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-lg-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <address className="small">
              <p className="mb-2">
                <strong>Plan No. MG-208, GSR Endava</strong>
              </p>
              <p className="mb-1">
                <a href="tel:+916299161616" className="text-white text-decoration-none hover-white">+91 6299 16 16 16</a>
              </p>
              <p className="mb-0">
                <a href="mailto:info@hicap.com" className="text-white text-decoration-none hover-white">info@hicap.com</a>
              </p>
            </address>
          </div>
        </div>

        <hr className="my-4" style={{ borderTop: '2px solid maroon' }} />

        {/* Navigation Links */}
        <div className="d-flex flex-wrap justify-content-center mb-4">
          <a href="/" className="text-white text-decoration-none mx-2 my-1 hover-white">Home</a>
          <a href="/aboutus" className="text-white text-decoration-none mx-2 my-1 hover-white">About Us</a>
          <a href="#" className="text-white text-decoration-none mx-2 my-1 hover-white">Privacy Policy</a>
          <a href="#" className="text-white text-decoration-none mx-2 my-1 hover-white">Terms & Conditions</a>
        </div>

        {/* Social Icons & Rights */}
        <div className="text-center mb-3">
          <div className="d-flex justify-content-center gap-3 mb-3">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
            )}
          </div>
          <p className="small text-white-50 mb-1">&copy; {new Date().getFullYear()} HICAP. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .hover-white:hover {
          color: white !important;
          text-decoration: underline !important;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          transition: transform 0.3s ease;
        }

        .social-icon:hover {
          transform: scale(1.1);
        }

        .facebook {
          color: #3b5998;
          background-color: white;
        }

        .twitter {
          color: #1da1f2;
          background-color: white;
        }

        .linkedin {
          color: #0077b5;
          background-color: white;
        }

        .instagram {
          color: #e1306c;
          background-color: white;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
