import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Footer from "../Pages/Footer";

const MockInterviews = () => {
    return (
        <>
            <Header />
            <section className="mt-5 py-5 bg-white">
                <Container>
                    <Row className="align-items-center">
                        {/* Image Section */}
                        <Col lg={6} className="mb-4 mb-lg-0 order-lg-1 order-2">
                            <img
                                src="/service/mockinterview.jpg"
                                alt="Mock Interview Practice"
                                className="img-fluid rounded img-hover-effect"
                                style={{
                                    borderRadius: "12px",
                                    transition: "transform 0rgba(14, 7, 8, 0.25)4s ease"
                                }}
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6} className="order-lg-2 order-1">
                            <h2 className="fw-bold textcolor mb-3 display-6">
                                <span style={{ color: "#ad2132" }}>Industry-Standard</span> Mock Interviews
                            </h2>
                            <p className="lead text-muted mb-4" style={{ lineHeight: "1.8" }}>
                                Mock interviews simulate <strong>real job interviews</strong> to help you
                                respond confidently, improve communication, and get valuable feedback.
                                Being well-prepared boosts your confidence, reduces anxiety, and improves
                                your chances of landing the job.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ Technical & HR interview preparation</li>
                                <li className="textcolorlight">✅ Real-time feedback and improvement tips</li>
                                <li className="textcolorlight">✅ Recorded sessions for self-review</li>
                                <li className="textcolorlight">✅ Company-specific interview patterns</li>
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
                                Contact Us
                            </Button>
                        </Col>
                    </Row>

                    {/* Features Cards */}
                    <Row className="mt-5 g-4">
                        {[
                            {
                                icon: "fas fa-code",
                                title: "Technical Rounds",
                                text: "Technical coaching bridges the gap between your daily work and interview-ready expertise in algorithms, debugging, and scalable architectures."
                            },
                            {
                                icon: "fas fa-users",
                                title: "HR Rounds",
                                text: "HR round preparation polishes your communication, behavioral responses, and cultural fit to make a lasting positive impression."
                            },
                            {
                                icon: "fas fa-chart-line",
                                title: "Performance Analytics",
                                text: "Performance analytics transforms raw data into actionable insights, optimizing strategies and driving measurable business growth."
                            }
                        ].map((card, idx) => (
                            <Col md={4} key={idx}>
                                <Card className="h-100 shadow-sm border-0 card-hover-effect text-center p-3">
                                    <div
                                        className="icon-circle mb-3 mx-auto"
                                        style={{
                                            background: "linear-gradient(135deg, #ad2132, #d6404b)",
                                            width: "65px",
                                            height: "65px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.5rem",
                                            boxShadow: "0 5px 15px rgba(173, 33, 50, 0.3)"
                                        }}
                                    >
                                        <i className={`${card.icon} text-white`}></i>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />

            {/* Styles */}
            <style>
                {`
                /* Card Hover Effect */
                .card-hover-effect {
                    transition: all 0.3s ease;
                    background-color: #fff;
                }
                .card-hover-effect:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 15px 35px rgba(173, 33, 50, 0.15) !important;
                }

                /* Image Hover Effect */
                .img-hover-effect:hover {
                    transform: scale(1.03);
                    box-shadow: 0 20px 40px rgba(173, 33, 50, 0.35) !important;
                }
                `}
            </style>
        </>
    );
};

export default MockInterviews;
