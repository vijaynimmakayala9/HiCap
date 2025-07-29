import React, { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [contact, setContact] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  const quickLinks = ['Home', 'About Us', 'Services', 'Courses', 'Contact'];

  // Mapping social media names to their corresponding icons
  const iconMap = {
    Facebook: FaFacebookF,
    Twitter: FaTwitter,
    Instagram: FaInstagram,
    LinkedIn: FaLinkedinIn,
  };

  useEffect(() => {
    // Fetch contact details
    axios
      .get('https://hicap-backend-4rat.onrender.com/api/contact-details')
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setContact(res.data.data[0]);
        }
      })
      .catch((err) => console.error('Contact Fetch Error:', err));

    // Fetch social media links
    axios
      .get('https://hicap-backend-4rat.onrender.com/api/social-media')
      .then((res) => {
        if (res.data.success) {
          setSocialLinks(res.data.data);
        }
      })
      .catch((err) => console.error('Social Media Fetch Error:', err));
  }, []);

  return (
    <footer className="bg-black text-white py-8 py-lg-12">
      <div className="container">
        <div className="row g-5 g-lg-6">
          {/* Left Section - Company Info */}
          <div className="col-lg-4">
            <div className="pe-lg-4">
              <h2 className="display-6 fw-bold mb-4">
                <img src="/logo/hicap-logo.png" className="img-fluid" alt="Logo" />
              </h2>
              <p className="text-gray-300 mb-4 mb-lg-5">
                Innovating your future with cutting-edge technology and tailored digital solutions.
              </p>
              {contact && (
                <div className="text-gray-400 small">
                  <p className="mb-1">{contact.address}</p>
                  <p className="mb-1">Email: {contact.email}</p>
                  <p>Phone: {contact.phone.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Quick Links */}
          <div className="col-lg-4">
            <h3 className="h4 fw-semibold mb-4">Quick Links</h3>
            <div className="d-flex flex-column gap-2">
              {quickLinks.map((link) => (
                <a key={link} href="#" className="text-white text-decoration-none hover-underline">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Social & Copyright */}
          <div className="col-lg-4">
            <div className="d-flex flex-column h-100">
              <h3 className="h4 fw-semibold mb-4">Follow Us</h3>
              <div className="d-flex gap-3 mb-5 mb-lg-auto">
                {socialLinks.map((item, idx) => {
                  const Icon = iconMap[item.name] || FaInstagram;
                  return (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.name} social link`}
                      className="text-white fs-5 text-decoration-none"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
              <p className="text-gray-500 small mt-auto mb-0">
                &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-underline {
          position: relative;
          transition: all 0.3s ease;
        }
        .hover-underline:hover {
          color: #fff;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .hover-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
