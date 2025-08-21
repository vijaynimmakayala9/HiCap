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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://hicap-backend-4rat.onrender.com/api/course1"
        );
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        }
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
          "https://hicap-backend-4rat.onrender.com/api/social-media"
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

    fetchCourses();
    fetchSocialLinks();
  }, []);

  return (
    <footer className="meroon-back text-white pt-5">
      <div className="container">
        {/* ===== Main Footer Content ===== */}
        <div className="row gy-4">
          {/* Training Courses */}
          <div className="col-6 col-md-4 col-lg-3">
            <h6 className="fw-bold mb-3 fs-6 fs-md-5">Trending Courses</h6>
            <ul className="list-unstyled">
              {loading ? (
                <li className="text-white-50">Loading...</li>
              ) : (
                courses.slice(0, 4).map((course) => (
                  <li key={course._id}>
                    <a
                      href="#"
                      className="text-white text-decoration-none fs-6 link-hover"
                    >
                      {course.name}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Learn */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-3 fs-6 fs-md-5">Learn</h6>
            <ul className="list-unstyled">
              {[
                "Training & Certification",
                "Academy",
                "Blog",
                "Knowledge Base",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-white text-decoration-none fs-6 link-hover"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-3 fs-6 fs-md-5">Community</h6>
            <ul className="list-unstyled">
              {[
                "User Community",
                "Customer Stories",
                "Work with a Partner",
                "HICAP for Startups",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-white text-decoration-none fs-6 link-hover"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-3 fs-6 fs-md-5">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/aboutus"
                  className="text-white text-decoration-none fs-6 link-hover"
                >
                  About Us
                </a>
              </li>
              {["Our Story", "Events", "Careers"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-white text-decoration-none fs-6 link-hover"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Sales */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold mb-3 fs-6 fs-md-5">Contact Sales</h6>
            <p className="mb-1 fw-semibold">Phone</p>
            <a
              href="tel:+916299161616"
              className="text-white text-decoration-none d-block fs-6 link-hover"
            >
              +91 6299 16 16 16
            </a>
            <p className="mt-3 mb-1 fw-semibold">Email</p>
            <a
              href="mailto:info@hicap.com"
              className="text-white text-decoration-none d-block fs-6 link-hover"
            >
              info@hicap.com
            </a>
          </div>
        </div>

        {/* ===== Social Media Section (Moved Here) ===== */}
        <div className="border-0 border-secondary my-4 pt-4">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
                style={{ width: "45px", height: "45px" }}
              >
                <FaTwitter />
              </a>

            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
                style={{ width: "45px", height: "45px" }}
              >
                <FaFacebookF />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
                style={{ width: "45px", height: "45px" }}
              >
                <FaInstagram />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
                style={{ width: "45px", height: "45px" }}
              >
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>

        {/* ===== Footer Links ===== */}
        <div className="border-0 border-secondary pt-3">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {[
              "HICAP Home",
              "Contact Us",
              "Security",
              "Privacy Policy",
              "Terms of Service",
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <a
                  href={idx === 0 ? "/" : "#"}
                  className="text-white text-decoration-none fs-6 link-hover"
                >
                  {item}
                </a>
                {idx < 4 && (
                  <span className="text-light d-none d-sm-inline">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="border-0 border-secondary mt-3 py-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <img
            src="/logo/lightlogo.png"
            alt="HICAP Logo"
            className="mb-2 mb-md-0"
            style={{ height: "auto", maxWidth: "250px" }}
          />
          <small className="text-white-50 text-center">
            © {new Date().getFullYear()}, HICAP Corporation Pvt. Ltd. All Rights
            Reserved.
          </small>
        </div>
      </div>

      {/* CSS for hover underline */}
      <style>{`
        .link-hover {
          position: relative;
        }
        .link-hover::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: white;
          transition: width 0.3s;
        }
        .link-hover:hover::after {
          width: 100%;
        }
        .social-icon {
          transition: all 0.3s ease-in-out;
        }

        .social-icon:hover {
          background-color: #fff; /* Bootstrap dark */
          color: #ad2132 !important;
          transform: scale(1.2);
        }

      `}</style>
    </footer>
  );
};

export default Footer;
