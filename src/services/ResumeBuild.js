import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Footer from "../Pages/Footer";
import ContactUsModal from "../models/ContactUsModal";
import CourseEnquiryModal from "../components/EnrollModal";

const ResumeBuilding = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  return (
    <>
      <Header />
      <section
        className="mt-5 py-5"
        style={{ background: "linear-gradient(135deg, #fff 0%, #fef6f7 100%)" }}
      >
        <Container>
          <Row className="align-items-center">
            {/* Image Section */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <img
                src="https://www.write-right.in/wp-content/uploads/2023/06/image-24.png"
                alt="Techsterker Resume Services"
                className="img-fluid rounded img-hover-effect"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  border: "0.5px solid #ad2132",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(173, 33, 50, 0.25)",
                }}
              />
            </Col>

            {/* Text Section */}
            <Col lg={6}>
              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#ad2132",
                  fontSize: "2.2rem",
                  lineHeight: "1.4",
                }}
              >
                Creating a resume is a crucial first or next step in your career.
              </h2>
              <p className="lead text-muted mb-4">
                Use it as your personal marketing tool to highlight your
                accomplishments and abilities. A well-structured CV grabs
                attention in seconds — precise, impactful, and tailored to your
                dream role.
              </p>
              <ul
                className="mb-4"
                style={{ listStyle: "none", paddingLeft: "0" }}
              >
                {[
                  "✅ Highlight your most relevant skills and experience.",
                  "✅ Use clean, readable formatting and professional language.",
                  "✅ Show measurable achievements to prove your impact.",
                  "✅ Avoid unnecessary details that distract.",
                  "✅ Keep it updated with your latest skills and roles.",
                  "✅ A strong CV increases your interview chances.",
                ].map((item, idx) => (
                  <li key={idx} className="mb-2 text-secondary">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  style={{
                    background: "linear-gradient(90deg, #ad2132, #d63447)",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    color: "#fff",
                    boxShadow: "0 6px 15px rgba(173, 33, 50, 0.4)",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 10px 20px rgba(173, 33, 50, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 6px 15px rgba(173, 33, 50, 0.4)";
                  }}
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Us
                </Button>

                <Button
                  size="lg"
                  style={{
                    background: "linear-gradient(90deg, #d63447, #ad2132)",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    color: "#fff",
                    boxShadow: "0 6px 15px rgba(214, 52, 71, 0.4)",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 10px 20px rgba(214, 52, 71, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 6px 15px rgba(214, 52, 71, 0.4)";
                  }}
                  onClick={() => setShowCourseModal(true)}
                >
                  Enquiry Form
                </Button>
              </div>
            </Col>
          </Row>

          {/* Services Cards */}
          <Row className="mt-5 g-4">
            {[
              {
                icon: "fas fa-search",
                title: "ATS-Optimized Resumes",
                text: "ATS-optimized resumes use targeted keywords and clean formatting to pass automated screening and land more interviews",
              },
              {
                icon: "fas fa-paint-brush",
                title: "Modern Design",
                text: "Minimalist layouts, bold typography, and subtle color accents create a polished yet contemporary resume design.",
              },
              {
                icon: "fas fa-user-tie",
                title: "Expert Guidance",
                text: "Expert resume guidance transforms your experience into a compelling career story that opens doors.",
              },
            ].map((service, idx) => (
              <Col md={4} key={idx}>
                <Card
                  className="h-100 shadow-sm border-0 card-hover-effect text-center p-4"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <div
                      className="icon-circle mb-3"
                      style={{
                        background: "#ad2132",
                        width: "60px",
                        height: "60px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <i
                        className={`${service.icon} text-white`}
                        style={{
                          fontSize: "1.5rem",
                          color: "#ad2132",
                        }}
                      ></i>
                    </div>
                    <Card.Title
                      className="textcolor fw-bold mb-3"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {service.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {service.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />

      {/* Modals */}
      <ContactUsModal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
      />
      <CourseEnquiryModal
        show={showCourseModal}
        handleClose={() => setShowCourseModal(false)}
        prefillCourse="Resume Building"
      />

      <style>{`
        .card-hover-effect {
          transition: all 0.3s ease;
          border: 1px solid rgba(173, 33, 50, 0.1) !important;
        }
        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(173, 33, 50, 0.2) !important;
          border-color: rgba(173, 33, 50, 0.3) !important;
        }
        .img-hover-effect {
          transition: all 0.3s ease;
        }
        .img-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(173, 33, 50, 0.4) !important;
        }
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .icon-box {
          transition: all 0.3s ease;
        }
        .card-hover-effect:hover .icon-box {
          transform: scale(1);
        }
      `}</style>
    </>
  );
};

export default ResumeBuilding;
