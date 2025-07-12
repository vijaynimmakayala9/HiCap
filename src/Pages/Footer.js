import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{ width: '1440px', height: '418px', backgroundColor: '#000000' }}
      className="mx-auto px-20 py-16 flex justify-between text-white font-roboto"
    >
      {/* Left Section */}
      <div className="max-w-[400px] space-y-6">
        <h2 className="text-3xl font-extrabold tracking-wide">YourCompany</h2>
        <p className="text-gray-300 leading-relaxed">
          Innovating your future with cutting-edge technology and tailored digital solutions.
        </p>
        <div className="text-gray-400 text-sm space-y-1">
          <p>1234 Street Name, City, Country</p>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl font-semibold mb-5 tracking-wide">Quick Links</h3>
        {['Home', 'About Us', 'Services', 'Courses', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="text-white text-lg hover:underline transition-all duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-start">
        <h3 className="text-2xl font-semibold mb-5 tracking-wide">Follow Us</h3>
        <div className="flex space-x-8">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              aria-label="social icon"
              className="text-white text-2xl"
              // no color change on hover
            >
              <Icon />
            </a>
          ))}
        </div>
        <p className="mt-12 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
