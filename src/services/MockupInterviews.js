import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../Pages/Header";
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
                                src="https://www.jobsoid.com/wp-content/uploads/2020/12/blog-1.jpg"
                                alt="Mock Interview Practice"
                                className="img-fluid rounded img-hover-effect"
                                style={{
                                    border: "2px solid #ad2132",
                                    boxShadow: "0 10px 20px rgba(173, 33, 50, 0.3)"
                                }}
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6} className="order-lg-2 order-1">
                            <h2 className="fw-bold textcolor mb-3">
                                Industry-Standard Mock Interviews
                            </h2>
                            <p className="lead text-muted">
                                Gain confidence with realistic mock interviews conducted by hiring managers
                                and technical experts from top companies.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ Technical & HR interview preparation</li>
                                <li className="textcolorlight">✅ Real-time feedback and improvement tips</li>
                                <li className="textcolorlight">✅ Recorded sessions for self-review</li>
                                <li className="textcolorlight">✅ Company-specific interview patterns</li>
                            </ul>
                            <Button variant="meroon" size="lg" className="gradient-button">
                                Schedule Mock Interview
                            </Button>
                        </Col>
                    </Row>

                    {/* Features Cards */}
                    <Row className="mt-5 g-4">
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-code text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Technical Rounds
                                    </Card.Title>
                                    <Card.Text>
                                        Practice coding challenges, system design, and problem-solving
                                        with industry experts.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-users text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        HR Rounds
                                    </Card.Title>
                                    <Card.Text>
                                        Master behavioral questions, salary negotiation, and
                                        communication skills.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-chart-line text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Performance Analytics
                                    </Card.Title>
                                    <Card.Text>
                                        Detailed feedback report with strengths and areas for improvement.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
            <style >{`
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
}

.icon-box {
    transition: all 0.3s ease;
}

.card-hover-effect:hover .icon-box {
    transform: scale(1);
}`}</style>
        </>
    );
};

export default MockInterviews;