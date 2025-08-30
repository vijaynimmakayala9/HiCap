import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Footer from "../Pages/Footer";
import { FaChalkboardTeacher, FaLightbulb, FaClock, FaUsers } from "react-icons/fa";

const OnetoOneSession = () => {
  return (
    <>
      <Header />

      <section className="mt-5 py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            {/* Image Section */}
            <Col lg={6} className="mb-4 mb-lg-0 order-lg-1 order-1">
              <img
                src="/services/oneonone.jpg"
                alt="One-to-One Session"
                className="img-fluid rounded img-hover-effect"
              />
            </Col>

            {/* Text Section */}
            <Col lg={6} className="order-lg-2 order-2">
              <h2 className="fw-bold textcolor mb-3">
                One-to-One Tutoring Sessions
              </h2>
              <p className="lead text-muted">
                Experience personalized guidance from expert instructors. Our one-to-one sessions ensure every student receives undivided attention and tailored support to achieve their goals faster.
              </p>
              <ul className="mb-4">
                <li className="textcolorlight">✅ Personalized mentorship</li>
                <li className="textcolorlight">✅ Customized learning plan</li>
                <li className="textcolorlight">✅ Flexible schedule to suit your pace</li>
                <li className="textcolorlight">✅ Interactive, hands-on guidance</li>
              </ul>
              <Button variant="meroon" size="lg" className="gradient-button" onClick={() => window.location.href="tel:9876543211"}>
                Book Your Session
              </Button>
            </Col>
          </Row>

          {/* Benefits Cards */}
          <Row className="mt-5 g-4">
            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 card-hover-effect text-center">
                <Card.Body>
                  <div className="icon-box mb-3">
                    <div className="icon-circle bg-meroonlight">
                      <FaChalkboardTeacher className="text-white" size={24}/>
                    </div>
                  </div>
                  <Card.Title className="textcolor fw-bold">Expert Mentors</Card.Title>
                  <Card.Text>
                    Learn from instructors with industry experience and real-world insights.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 card-hover-effect text-center">
                <Card.Body>
                  <div className="icon-box mb-3">
                    <div className="icon-circle bg-meroonlight">
                      <FaLightbulb className="text-white" size={24}/>
                    </div>
                  </div>
                  <Card.Title className="textcolor fw-bold">Tailored Plan</Card.Title>
                  <Card.Text>
                    Sessions are customized to your goals and learning pace for maximum results.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 card-hover-effect text-center">
                <Card.Body>
                  <div className="icon-box mb-3">
                    <div className="icon-circle bg-meroonlight">
                      <FaClock className="text-white" size={24}/>
                    </div>
                  </div>
                  <Card.Title className="textcolor fw-bold">Flexible Timings</Card.Title>
                  <Card.Text>
                    Schedule sessions at your convenience to balance learning with your daily routine.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 shadow-sm border-0 card-hover-effect text-center">
                <Card.Body>
                  <div className="icon-box mb-3">
                    <div className="icon-circle bg-meroonlight">
                      <FaUsers className="text-white" size={24}/>
                    </div>
                  </div>
                  <Card.Title className="textcolor fw-bold">Interactive Learning</Card.Title>
                  <Card.Text>
                    Engage in hands-on sessions with real-time guidance and problem-solving.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />

      <style>{`
        /* Card Hover Effect */
        .card-hover-effect {
          transition: all 0.3s ease;
          border: 1px solid rgba(173, 33, 50, 0.1) !important;
        }

        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(173, 33, 50, 0.2) !important;
          border-color: rgba(173, 33, 50, 0.3) !important;
        }

        /* Image Hover Effect */
        .img-hover-effect {
          transition: all 0.3s ease;
        }

        .img-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(173, 33, 50, 0.4) !important;
        }

        /* Icon Styling */
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin: 0 auto;
        }

        .icon-box {
          transition: all 0.3s ease;
        }

        .card-hover-effect:hover .icon-box {
          transform: scale(1);
        }

        .textcolor {
          color: #ad2132;
        }

        .textcolorlight {
          color: #6c757d;
        }

        .bg-meroonlight {
          background-color: #ad2132;
        }

        .gradient-button {
          background: linear-gradient(90deg, #ad2132 0%, #ff6b6b 100%);
          border: none;
        }
      `}</style>
    </>
  );
};

export default OnetoOneSession;
