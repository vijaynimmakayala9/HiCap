import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = ['Home', 'About Us', 'Services', 'Courses', 'Contact'];
  const socialIcons = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

  return (
    <footer className="bg-black text-white py-8 py-lg-12">
      <div className="container">
        <div className="row g-5 g-lg-6">
          {/* Left Section - Company Info */}
          <div className="col-lg-4">
            <div className="pe-lg-4">
              <h2 className="display-6 fw-bold mb-4">YourCompany</h2>
              <p className="text-gray-300 mb-4 mb-lg-5">
                Innovating your future with cutting-edge technology and tailored digital solutions.
              </p>
              <div className="text-gray-400 small">
                <p className="mb-1">1234 Street Name, City, Country</p>
                <p className="mb-1">Email: info@yourcompany.com</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Center Section - Quick Links */}
          <div className="col-lg-4">
            <h3 className="h4 fw-semibold mb-4">Quick Links</h3>
            <div className="d-flex flex-column gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white text-decoration-none hover-underline"
                >
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
                {socialIcons.map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={`${Icon.name} social link`}
                    className="text-white fs-5 text-decoration-none"
                  >
                    <Icon />
                  </a>
                ))}
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