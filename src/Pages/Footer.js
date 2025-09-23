import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [courses, setCourses] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [communityLinks, setCommunityLinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://31.97.206.144:5001/api/coursecontroller"
        );
        const data = await response.json();
        if (data.success) setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([
          { _id: "1", name: "Web Development" },
          { _id: "2", name: "Data Science" },
          { _id: "3", name: "Digital Marketing" },
          { _id: "4", name: "Cloud Computing" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          "http://31.97.206.144:5001/api/social-media"
        );
        const data = await response.json();
        if (data.success) {
          const links = {};
          data.data.forEach((item) => {
            links[item.name.toLowerCase()] = item.link.startsWith("http")
              ? item.link
              : `https://${item.link}`;
          });
          setSocialLinks(links);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
        setSocialLinks({
          facebook: "https://facebook.com/hicap",
          twitter: "https://twitter.com/hicap",
          linkedin: "https://linkedin.com/company/hicap",
          instagram: "https://instagram.com/hicap",
        });
      }
    };

    const fetchCommunityLinks = async () => {
      try {
        const response = await fetch(
          "http://31.97.206.144:5001/api/communitys"
        );
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setCommunityLinks(data.data[0]); // ✅ use first record
        }
      } catch (error) {
        console.error("Error fetching community links:", error);
        setCommunityLinks({
          slack: "https://slack.com/",
          discord: "https://discord.com/",
          whatsapp: "https://wa.me/",
        });
      }
    };

    fetchCourses();
    fetchSocialLinks();
    fetchCommunityLinks();
  }, []);

  return (
    <footer className="meroon-back text-white pt-5 pb-3">
      <div className="container">
        {/* ===== Top Section ===== */}
        <div className="row mb-4">
          {/* Logo + Description */}
          <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 px-5">
            <div className="text-center text-md-start">
              <img
                src="/logo/lightlogo.png"
                alt="HICAP Logo"
                className="mb-3 img-fluid"
                style={{ maxWidth: "300px", height: "auto" }}
              />
              <p className="text-light">
                Empowering learners with innovative education and technology to
                develop practical skills, excel in the digital world, and build
                successful careers.
              </p>
            </div>
          </div>

          {/* Community, Company, Contact */}
          <div className="col-12 col-md-6 col-lg-7">
            <div className="row">
              {/* Community */}
              <div className="col-12 col-sm-4 mb-4 mb-sm-0">
                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-3">Community</h5>
                  <ul className="list-unstyled">
                    {communityLinks.slack && (
                      <li className="mb-2">
                        <a
                          href={communityLinks.slack}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none link-hover"
                        >
                          Slack
                        </a>
                      </li>
                    )}
                    {communityLinks.discord && (
                      <li className="mb-2">
                        <a
                          href={communityLinks.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none link-hover"
                        >
                          Discord
                        </a>
                      </li>
                    )}
                    {communityLinks.whatsapp && (
                      <li className="mb-2">
                        <a
                          href={communityLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none link-hover"
                        >
                          WhatsApp
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Company */}
              <div className="col-12 col-sm-4 mb-4 mb-sm-0">
                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-3">Company</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a
                        href="/aboutus"
                        className="text-white text-decoration-none link-hover"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/careers"
                        className="text-white text-decoration-none link-hover"
                      >
                        Careers
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/faqs"
                        className="text-white text-decoration-none link-hover"
                      >
                        FAQ's
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="col-12 col-sm-4">
                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-3">Contact</h5>

                  {/* Phone */}
                  <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center mb-3 gap-2 contact-row">
                    <a
                      href="tel:+919000239871"
                      className="contact-icon phone-icon mb-2 mb-sm-0"
                    >
                      <i className="fas fa-phone-alt mirrored"></i>
                    </a>
                    <a
                      href="tel:+919000239871"
                      className="text-white text-decoration-none link-hover"
                    >
                      +91 9000239871
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center mb-3 gap-2 contact-row">
                    <a
                      href="https://wa.me/919000239871"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-icon whatsapp-icon mb-2 mb-sm-0"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://wa.me/919000239871"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none link-hover"
                    >
                      +91 9000239871
                    </a>
                  </div>

                  {/* Email */}
                  <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center gap-2 contact-row">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-icon email-icon mb-2 mb-sm-0"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none link-hover"
                    >
                      info@techsterker.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Social Media Section ===== */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="text-center">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaTwitter size={18} />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Footer Links ===== */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="text-center pt-3">
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
                {[
                  "Home",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Refund Policy",
                  "Cookie Policy",
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <a
                      href={idx === 0 ? "/" : "#"}
                      className="text-white text-decoration-none link-hover small"
                    >
                      {item}
                    </a>
                    {idx < 5 && (
                      <span className="text-light d-none d-md-inline">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom Text ===== */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <small className="d-block text-light">
              © {new Date().getFullYear()}, Hicap Edtech Private Limited. All
              Rights Reserved.
            </small>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
  .link-hover {
    position: relative;
    transition: color 0.3s ease;
  }
  .link-hover:hover {
    color: #f8f9fa !important;
  }
  .link-hover::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1px;
    background-color: white;
    transition: width 0.3s;
  }
  .link-hover:hover::after { width: 100%; }

  .social-icon {
    background-color: white;
    color: #000;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  }
  .social-icon:hover { transform: scale(1.1); }

  /* Responsive Contact Section */
.contact-row { flex-wrap: wrap; }

.contact-icon {
  width: 35px;
  height: 35px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

.phone-icon i.mirrored { transform: scaleX(-1); color: #000; }
.phone-icon:hover { background-color: #000; }
.phone-icon:hover i.mirrored { color: #fff; }

.whatsapp-icon i, .email-icon i { color: #000; transition: color 0.3s; }
.whatsapp-icon:hover, .email-icon:hover { background-color: #000; }
.whatsapp-icon:hover i, .email-icon:hover i { color: #fff; }

/* Smaller devices */
@media (max-width: 576px) {
  .contact-icon { width: 30px; height: 30px; font-size: 16px; }
  .contact-row { gap: 0.5rem; justify-content: center !important; }
  .text-center.text-sm-start { text-align: center !important; }
}

`}</style>
    </footer>
  );
};

export default Footer;
