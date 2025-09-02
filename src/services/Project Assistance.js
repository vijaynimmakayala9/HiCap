import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../Pages/Footer";
import Header from "../Header/Header";
import ContactUsModal from "../models/ContactUsModal";

const ProjectAssistance = () => {
    const [showContactModal, setShowContactModal] = useState(false);


    return (
        <>
            <Header />
            <section className="mt-5 py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        {/* Image Section */}
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <img
                                src="/service/projectassist.jpg"
                                alt="Live Project Experience"
                                className="img-fluid rounded img-hover-effect"
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6}>
                            <h2 className="fw-bold textcolor mb-3">
                                Real-World Live Projects
                            </h2>
                            <p className="lead text-muted">
                                Live projects are assignments or tasks that are delivered to experts or students in real time so they can work on real-world issues that businesses or clients are facing.  Through practical experience, these projects assist people in putting their theoretical knowledge to use.  Engaging in real-world projects enhances abilities, boosts self-esteem, and equips individuals for obstacles they may face in the workplace.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ Industry-relevant project experience</li>
                                <li className="textcolorlight">✅ Mentorship from senior developers</li>
                                <li className="textcolorlight">✅ Agile development methodology</li>
                                <li className="textcolorlight">✅ GitHub repository for your portfolio</li>
                            </ul>
                            <Button
                                size="lg"
                                style={{
                                    background: "linear-gradient(90deg, #a51d34, #d63447)",
                                    border: "none",
                                    padding: "12px 25px",
                                    borderRadius: "50px",
                                    fontWeight: "600",
                                    color: "#fff",
                                    boxShadow: "0 6px 15px rgba(173, 33, 50, 0.4)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = "translateY(-3px)";
                                    e.target.style.boxShadow = "0 10px 20px rgba(173, 33, 50, 0.5)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "0 6px 15px rgba(173, 33, 50, 0.4)";
                                }}
                                onClick={() => setShowContactModal(true)}
                            >
                                Contact Us
                            </Button>
                        </Col>
                    </Row>

                    {/* Features Cards */}
                    <Row className="mt-5 g-4">
                        {[
                            {
                                icon: "fas fa-laptop-code",
                                title: "Development Projects",
                                text: "Development projects deliver scalable solutions through clean architecture, agile execution, and measurable impact.",
                            },
                            {
                                icon: "fas fa-database",
                                title: "Data Science Projects",
                                text: "Data science projects turn raw data into actionable insights through machine learning, statistical analysis, and impactful visualization.",
                            },
                            {
                                icon: "fas fa-cloud",
                                title: "Cloud Projects",
                                text: "Cloud projects deliver scalable, secure solutions by leveraging AWS/Azure/GCP services to optimize performance and reduce costs.",
                            },
                        ].map((card, idx) => (
                            <Col md={4} key={idx}>
                                <Card className="h-100 shadow-sm border-0 card-hover-effect text-center">
                                    <Card.Body>
                                        <div className="icon-box mb-3">
                                            <div className="icon-circle meroon-back mx-auto">
                                                <i className={`${card.icon} text-white`}></i>
                                            </div>
                                        </div>
                                        <Card.Title className="textcolor fw-bold">
                                            {card.title}
                                        </Card.Title>
                                        <Card.Text>{card.text}</Card.Text>
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
                type="project"
                onHide={() => setShowContactModal(false)}
            />

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
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                .icon-box {
                    transition: all 0.3s ease;
                }
                .card-hover-effect:hover .icon-box {
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
};

export default ProjectAssistance;
