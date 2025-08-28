import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../Pages/Footer";
import Header from "../Header/Header";

const PlacementAssistance = () => {
    return (
        <>
            <Header />
            <section className="mt-5 py-5 bg-white">
                <Container>
                    <Row className="align-items-center">
                        {/* Image Section */}
                        <Col lg={6} className="mb-4 mb-lg-0 order-lg-1 order-2">
                            <img
                                src="https://www.cetpainfotech.com/wp-content/uploads/2022/05/Placement.jpg"
                                alt="Placement Assistance"
                                className="img-fluid rounded img-hover-effect"
                                style={{
                                    border: "0.5px solid #ad2132",
                                    boxShadow: "0 10px 20px rgba(173, 33, 50, 0.3)"
                                }}
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6} className="order-lg-2 order-1">
                            <h2 className="fw-bold textcolor mb-3">
                                Dedicated Placement Support
                            </h2>
                            <p className="lead text-muted">
                                Placement assistance is a service provided by educational institutions or training centers to help students find suitable job opportunities. It includes resume building, interview preparation, job search guidance, and connecting candidates with potential employers. This support increases the chances of securing a job and makes the transition from education to employment smoother.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ 500+ hiring partners</li>
                                <li className="textcolorlight">✅ Personalized job matching</li>
                                <li className="textcolorlight">✅ Interview scheduling</li>
                                <li className="textcolorlight">✅ Salary negotiation guidance</li>
                            </ul>
                            <Button variant="meroon" size="lg" className="gradient-button">
                                View Placement Stats
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
                                            <i className="fas fa-handshake text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Hiring Partners
                                    </Card.Title>
                                    <Card.Text>
                                        Strategic hiring partners streamline talent acquisition by connecting companies with top-tier, pre-vetted candidates for precise role alignment.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-bullseye text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Targeted Preparation
                                    </Card.Title>
                                    <Card.Text>
                                        Targeted preparation tailors your interview strategy to the specific company, role, and team dynamics for guaranteed success.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-chart-pie text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Placement Analytics
                                    </Card.Title>
                                    <Card.Text>
                                        Placement analytics track candidate success metrics, optimize recruitment pipelines, and drive data-driven hiring decisions for maximum ROI.
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

export default PlacementAssistance;