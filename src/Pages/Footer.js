import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [courses, setCourses] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Mock data fallback
        setCourses([
          { _id: '1', name: 'Web Development' },
          { _id: '2', name: 'Data Science' },
          { _id: '3', name: 'Digital Marketing' },
          { _id: '4', name: 'Mobile App Development' },
          { _id: '5', name: 'Cloud Computing' },
          { _id: '6', name: 'Cybersecurity' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/social-media');
        const data = await response.json();
        if (data.success) {
          const links = {};
          data.data.forEach(item => {
            links[item.name.toLowerCase()] = item.link.startsWith('http') ? item.link : `https://${item.link}`;
          });
          setSocialLinks(links);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
        // Mock data fallback
        setSocialLinks({
          facebook: 'https://facebook.com/hicap',
          twitter: 'https://twitter.com/hicap',
          linkedin: 'https://linkedin.com/company/hicap',
          instagram: 'https://instagram.com/hicap'
        });
      }
    };

    fetchCourses();
    fetchSocialLinks();
  }, []);

  return (
    <footer className="footer" style={{ backgroundColor: '#800000' }}>
      <div className="footer-content">
        <div className="footer-grid">
          {/* Training Courses */}
          <div className="footer-section">
            <h3 className="section-title">Training Courses</h3>
            <ul className="footer-links">
              {loading ? (
                <li>Loading...</li>
              ) : (
                courses.slice(0, 8).map((course) => (
                  <li key={course._id}>
                    <a href="#" className="footer-link">{course.name}</a>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="footer-section">
            <h3 className="section-title">Learn</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Training & Certification</a></li>
              <li><a href="#" className="footer-link">Academy</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Knowledge Base</a></li>
              <li><a href="#" className="footer-link">Product Alternatives</a></li>
              <li><a href="#" className="footer-link">Newsletter</a></li>
            </ul>
          </div>

          {/* Community */}
          <div className="footer-section">
            <h3 className="section-title">Community</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">User Community</a></li>
              <li><a href="#" className="footer-link">Customer Stories</a></li>
              <li><a href="#" className="footer-link">Work with a Partner</a></li>
              <li><a href="#" className="footer-link">HICAP for Startups</a></li>
              <li><a href="#" className="footer-link">Affiliate Program</a></li>
              <li><a href="#" className="footer-link">Humans of HICAP</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h3 className="section-title">Company</h3>
            <ul className="footer-links">
              <li><a href="/aboutus" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Our Story</a></li>
              <li><a href="#" className="footer-link">Press</a></li>
              <li><a href="#" className="footer-link">Events</a></li>
              <li><a href="#" className="footer-link">Branding Assets</a></li>
              <li><a href="#" className="footer-link">HICAP Schools</a></li>
              <li><a href="#" className="footer-link">Service Status</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
            </ul>
          </div>

          {/* Contact Sales */}
          <div className="footer-section">
            <h3 className="section-title">Contact Sales</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <a href="tel:+916299161616" className="contact-link">+91 6299 16 16 16</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:info@hicap.com" className="contact-link">info@hicap.com</a>
              </div>
              <div className="support-links">
                <a href="#" className="support-link">Support →</a>
                <a href="#" className="support-link">Talk to Concierge →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-section">
          <div className="social-icons">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-bottom-links d-flex flex-wrap justify-content-center gap-3 py-3">
          <a href="/" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">HICAP Home</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Contact Us</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Security</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Compliance</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">IPR Complaints</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Anti-spam Policy</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Terms of Service</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Privacy Policy</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">Cookie Policy</a>
          <a href="#" className="bottom-link text-light text-decoration-none border-end border-secondary pe-3">GDPR Compliance</a>
          <a href="#" className="bottom-link text-light text-decoration-none">Abuse Policy</a>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <img
            src="/logo/lightlogo.png"
            alt="HICAP Logo"
            className="logo-image"
          />
        </div>
        <div className="copyright">
          © {new Date().getFullYear()}, HICAP Corporation Pvt. Ltd. All Rights Reserved.
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #800000;
          padding: 60px 0 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section {
          min-width: 200px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
          color: white;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: white;
          text-decoration: underline;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-label {
          font-weight: 600;
          font-size: 14px;
          color: white;
        }

        .contact-link {
          color: white;
          text-decoration: underline;
          font-size: 14px;
        }

        .support-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }

        .support-link {
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .support-link:hover {
          text-decoration: underline;
        }

        .social-section {
          display: flex;
          justify-content: center;
          margin: 40px 0;
        }

        .social-icons {
          display: flex;
          gap: 16px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: transform 0.2s ease;
          text-decoration: none;
          font-size: 18px;
          background-color: white;
        }

        .social-icon:hover {
          transform: scale(1.1);
        }

        .twitter {
          color: #1da1f2;
        }

        .facebook {
          color: #1877f2;
        }

        .instagram {
          color: #e1306c;
        }

        .linkedin {
          color: #0077b5;
        }

        .footer-bottom-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 40px 0;
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bottom-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
        }

        .bottom-link:hover {
          color: white;
          text-decoration: underline;
        }

        .footer-bottom {
          background-color: rgba(0, 0, 0, 0.2);
          padding: 30px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .footer-logo .logo-image {
          height: 40px;
          max-width: 200px;
          object-fit: contain;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-bottom-links {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;