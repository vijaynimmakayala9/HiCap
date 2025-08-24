import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";

const RealTimeAssistance = () => {
    return (
        <>
            <Header />
            <section className="mt-5 py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        {/* Image Section */}
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <img
                                src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Corporate_Training.jpg"
                                alt="Corporate Project Assistance"
                                className="img-fluid rounded img-hover-effect"
                                style={{
                                    border: "0.5px solid #ad2132",
                                    boxShadow: "0 10px 20px rgba(173, 33, 50, 0.3)",
                                }}
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6}>
                            <h2 className="fw-bold textcolor mb-3">
                                Request Assistance on Corporate Projects
                            </h2>
                            <p className="lead text-muted">
                                Struggling with real-time corporate projects? Our expert mentors provide instant guidance and hands-on support to help you complete your tasks efficiently while learning corporate best practices.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ Instant guidance from industry experts</li>
                                <li className="textcolorlight">✅ Learn corporate workflows & standards</li>
                                <li className="textcolorlight">✅ Hands-on problem solving in real projects</li>
                                <li className="textcolorlight">✅ Gain confidence in corporate environments</li>
                            </ul>
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
                            >
                                Request Assistance
                            </Button>
                        </Col>
                    </Row>

                    {/* Benefits Cards */}
                    <Row className="mt-5 g-4">
                        {[
                            {
                                icon: "fas fa-headset",
                                title: "Instant Expert Help",
                                text: "Receive real-time support from industry experts to resolve project challenges immediately."
                            },
                            {
                                icon: "fas fa-project-diagram",
                                title: "Corporate Workflow Guidance",
                                text: "Learn corporate-standard processes, methodologies, and documentation while working on live projects."
                            },
                            {
                                icon: "fas fa-users-cog",
                                title: "Collaborative Problem Solving",
                                text: "Work alongside mentors to solve complex project tasks efficiently and learn practical solutions."
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

                .textcolor {
                    color: #ad2132;
                }
                .textcolorlight {
                    color: #6c757d;
                }
                .meroon-back {
                    background-color: #ad2132;
                }
            `}</style>
        </>
    );
};

export default RealTimeAssistance;
