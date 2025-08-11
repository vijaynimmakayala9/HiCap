import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const ResumeBuilding = () => {
    return (
        <>
            <Header />
            <section className="mt-5 py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        {/* Image Section with Maroon Shadow */}
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <img
                                src="https://www.write-right.in/wp-content/uploads/2023/06/image-24.png"
                                alt="Techsterker Resume Services"
                                className="img-fluid rounded img-hover-effect"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    border: "2px solid #ad2132", // Maroon border
                                    boxShadow: "0 10px 20px rgba(173, 33, 50, 0.3)", // Maroon shadow
                                }}
                            />
                        </Col>

                        {/* Text Section */}
                        <Col lg={6}>
                            <h2 className="fw-bold textcolor mb-3">
                                About Techsterker Institute
                            </h2>
                            <p className="lead text-muted">
                                We help you craft a professional, ATS-friendly resume that stands
                                out in today's competitive job market. Our experts ensure your
                                resume highlights your skills, achievements, and career goals to
                                impress employers.
                            </p>
                            <ul className="mb-4">
                                <li className="textcolorlight">✅ Personalized resume writing</li>
                                <li className="textcolorlight">✅ LinkedIn profile optimization</li>
                                <li className="textcolorlight">✅ Career counseling sessions</li>
                                <li className="textcolorlight">✅ Interview preparation tips</li>
                            </ul>
                            <Button variant="meroon" size="lg" className="gradient-button">
                                Get Your Resume Now
                            </Button>
                        </Col>
                    </Row>

                    {/* Services Cards with Hover Effects */}
                    <Row className="mt-5 g-4">
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-search text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        ATS-Optimized Resumes
                                    </Card.Title>
                                    <Card.Text>
                                        Ensure your resume passes applicant tracking systems and gets
                                        noticed by recruiters.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-paint-brush text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Modern Design
                                    </Card.Title>
                                    <Card.Text>
                                        Professionally designed layouts that make a strong first
                                        impression on hiring managers.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 shadow-sm border-0 card-hover-effect">
                                <Card.Body>
                                    <div className="icon-box mb-3">
                                        <div className="icon-circle bg-meroonlight">
                                            <i className="fas fa-user-tie text-white"></i>
                                        </div>
                                    </div>
                                    <Card.Title className="textcolor fw-bold">
                                        Expert Guidance
                                    </Card.Title>
                                    <Card.Text>
                                        Work with industry experts who understand the job market and
                                        recruitment trends.
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

export default ResumeBuilding;