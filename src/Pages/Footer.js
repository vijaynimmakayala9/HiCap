// import React, { useEffect, useState } from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   const [courses, setCourses] = useState([]);
//   const [socialLinks, setSocialLinks] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           "https://hicap-backend-4rat.onrender.com/api/course1"
//         );
//         const data = await response.json();
//         if (data.success) {
//           setCourses(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         setCourses([
//           { _id: "1", name: "Web Development" },
//           { _id: "2", name: "Data Science" },
//           { _id: "3", name: "Digital Marketing" },
//           { _id: "4", name: "Cloud Computing" },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchSocialLinks = async () => {
//       try {
//         const response = await fetch(
//           "https://hicap-backend-4rat.onrender.com/api/social-media"
//         );
//         const data = await response.json();
//         if (data.success) {
//           const links = {};
//           data.data.forEach((item) => {
//             links[item.name.toLowerCase()] = item.link.startsWith("http")
//               ? item.link
//               : `https://${item.link}`;
//           });
//           setSocialLinks(links);
//         }
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//         setSocialLinks({
//           facebook: "https://facebook.com/hicap",
//           twitter: "https://twitter.com/hicap",
//           linkedin: "https://linkedin.com/company/hicap",
//           instagram: "https://instagram.com/hicap",
//         });
//       }
//     };

//     fetchCourses();
//     fetchSocialLinks();
//   }, []);

//   return (
//     <footer className="meroon-back text-white pt-5 pb-3">
//       <div className="container">
//         {/* ===== Top Section (Community, Company, Contact) ===== */}
//         <div className="d-flex flex-wrap justify-content-center text-start gap-5">
//           {/* Community */}
//           <div className="footer-col">
//             <h5 className="fw-bold mb-3">Community</h5>
//             <ul className="list-unstyled">
//               {["WhatsApp", "Discord", "Slack"].map((item, idx) => (
//                 <li key={idx} className="mb-2">
//                   <a href="#" className="text-white text-decoration-none link-hover">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div className="footer-col">
//             <h5 className="fw-bold mb-3">Company</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2">
//                 <a href="/aboutus" className="text-white text-decoration-none link-hover">
//                   About Us
//                 </a>
//               </li>
//               {["Certificates", "Events", "Careers"].map((item, idx) => (
//                 <li key={idx} className="mb-2">
//                   <a href="#" className="text-white text-decoration-none link-hover">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="footer-col">
//             <h5 className="fw-bold mb-3">Contact</h5>
//             <div className="mb-3">
//               <p className="mb-1 fw-semibold">Phone</p>
//               <a
//                 href="tel:+916299161616"
//                 className="text-white text-decoration-none link-hover"
//               >
//                 +91 6299161616
//               </a>
//             </div>
//             <div className="mb-3">
//               <p className="mb-1 fw-semibold">WhatsApp</p>
//               <a
//                 href="https://wa.me/916299161616"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white text-decoration-none link-hover"
//               >
//                 +91 6299161616
//               </a>
//             </div>
//             <div>
//               <p className="mb-1 fw-semibold">Email</p>
//               <a
//                 href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com"
//                 className="text-white text-decoration-none link-hover"
//                 target="_blank"
//               >
//                 info@techsterker.com
//               </a>
//             </div>
            
//           </div>
//         </div>

//         {/* ===== Social Media Section ===== */}
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="text-center">
//               <div className="d-flex flex-wrap justify-content-center gap-3">
//                 {socialLinks.twitter && (
//                   <a
//                     href={socialLinks.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
//                     style={{ width: "45px", height: "45px" }}
//                   >
//                     <FaTwitter size={18} />
//                   </a>
//                 )}
//                 {socialLinks.facebook && (
//                   <a
//                     href={socialLinks.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
//                     style={{ width: "45px", height: "45px" }}
//                   >
//                     <FaFacebookF size={18} />
//                   </a>
//                 )}
//                 {socialLinks.instagram && (
//                   <a
//                     href={socialLinks.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
//                     style={{ width: "45px", height: "45px" }}
//                   >
//                     <FaInstagram size={18} />
//                   </a>
//                 )}
//                 {socialLinks.linkedin && (
//                   <a
//                     href={socialLinks.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
//                     style={{ width: "45px", height: "45px" }}
//                   >
//                     <FaLinkedinIn size={18} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ===== Footer Links ===== */}
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="text-center pt-3">
//               <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
//                 {["Home", "Contact Us", "Security", "Privacy Policy", "Terms of Service"].map(
//                   (item, idx) => (
//                     <React.Fragment key={idx}>
//                       <a
//                         href={idx === 0 ? "/" : "#"}
//                         className="text-white text-decoration-none link-hover small"
//                       >
//                         {item}
//                       </a>
//                       {idx < 4 && <span className="text-light d-none d-md-inline">|</span>}
//                     </React.Fragment>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ===== Bottom Section ===== */}
//         <div className="row mt-3">
//           <div className="col-12 text-center">
//             <div>
//               <img
//                 src="/logo/lightlogo.png"
//                 alt="HICAP Logo"
//                 className="mb-2 img-fluid mx-auto d-block"
//                 style={{ maxWidth: "200px", height: "auto" }}
//               />
//               <small className="d-block text-light my-3">
//                 © {new Date().getFullYear()}, Hicap Edtech Private Limited. All Rights Reserved.
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS */}
//       <style>{`
//         .link-hover {
//           position: relative;
//           transition: color 0.3s ease;
//         }
//         .link-hover:hover {
//           color: #f8f9fa !important;
//         }
//         .link-hover::after {
//           content: "";
//           position: absolute;
//           left: 0;
//           bottom: -2px;
//           width: 0;
//           height: 1px;
//           background-color: white;
//           transition: width 0.3s;
//         }
//         .link-hover:hover::after {
//           width: 100%;
//         }
//         .social-icon {
//           transition: all 0.3s ease-in-out;
//         }
//         .social-icon:hover {
//           background-color: #f8f9fa !important;
//           color: #ad2132 !important;
//           transform: scale(1.1);
//         }
//         .footer-col {
//           min-width: 220px;
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;


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
    <footer className="meroon-back text-white pt-5 pb-3">
      <div className="container">
        {/* ===== First Row: Logo + Description and Community + Company + Contact ===== */}
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
                Empowering learners with innovative education and technology to develop practical skills, excel in the digital world, and build successful careers.
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
                    {["Slack", "Discord", "WhatsApp"].map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <a href="#" className="text-white text-decoration-none link-hover">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Company */}
              <div className="col-12 col-sm-4 mb-4 mb-sm-0">
                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-3">Company</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a href="/aboutus" className="text-white text-decoration-none link-hover">
                        About Us
                      </a>
                    </li>
                    {["Careers", "Events", "Certificates"].map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <a href="#" className="text-white text-decoration-none link-hover">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="col-12 col-sm-4">
                <div className="text-center text-sm-start">
                  <h5 className="fw-bold mb-3">Contact</h5>
                  <div className="mb-3">
                    <p className="mb-1 fw-semibold">Phone</p>
                    <a
                      href="tel:+916299161616"
                      className="text-white text-decoration-none link-hover"
                    >
                      +91 6299161616
                    </a>
                  </div>
                  <div className="mb-3">
                    <p className="mb-1 fw-semibold">WhatsApp</p>
                    <a
                      href="https://wa.me/916299161616"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none link-hover"
                    >
                      +91 6299161616
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 fw-semibold">Email</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com"
                      className="text-white text-decoration-none link-hover"
                      target="_blank"
                    >
                      info@techsterker.com
                    </a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Second Row: Social Icons ===== */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="text-center">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center social-icon"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <FaTwitter size={18} />
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
                    <FaFacebookF size={18} />
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
                    <FaInstagram size={18} />
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
                    <FaLinkedinIn size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Third Row: Footer Links ===== */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="text-center pt-3">
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
                {["Home", "Contact Us", "Security", "Privacy Policy", "Terms of Service"].map(
                  (item, idx) => (
                    <React.Fragment key={idx}>
                      <a
                        href={idx === 0 ? "/" : "#"}
                        className="text-white text-decoration-none link-hover small"
                      >
                        {item}
                      </a>
                      {idx < 4 && <span className="text-light d-none d-md-inline">|</span>}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Fourth Row: Bottom Text ===== */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <small className="d-block text-light">
              © {new Date().getFullYear()}, Hicap Edtech Private Limited. All Rights Reserved.
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
        .link-hover:hover::after {
          width: 100%;
        }
        .social-icon {
          transition: all 0.3s ease-in-out;
        }
        .social-icon:hover {
          background-color: #f8f9fa !important;
          color: #ad2132 !important;
          transform: scale(1.1);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .text-center.text-md-start,
          .text-center.text-sm-start {
            text-align: center !important;
          }
          .row > div {
            margin-bottom: 1.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .social-icon {
            width: 40px !important;
            height: 40px !important;
          }
          .d-flex.gap-3 {
            gap: 15px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;