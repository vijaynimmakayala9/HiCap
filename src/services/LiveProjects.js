import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";

const LiveProjects = () => {
    return (
        <>
        <Header/>
        <section className="mt-5 py-5 bg-light">
            <Container>
                <Row className="align-items-center">
                    {/* Image Section */}
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <img
                            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_a_Project.jpg"
                            alt="Live Project Experience"
                            className="img-fluid rounded img-hover-effect"
                            style={{
                                border: "2px solid #ad2132",
                                boxShadow: "0 10px 20px rgba(173, 33, 50, 0.3)"
                            }}
                        />
                    </Col>

                    {/* Text Section */}
                    <Col lg={6}>
                        <h2 className="fw-bold textcolor mb-3">
                            Real-World Live Projects
                        </h2>
                        <p className="lead text-muted">
                            Work on actual industry projects to build your portfolio and gain 
                            practical experience that employers value.
                        </p>
                        <ul className="mb-4">
                            <li className="textcolorlight">✅ Industry-relevant project experience</li>
                            <li className="textcolorlight">✅ Mentorship from senior developers</li>
                            <li className="textcolorlight">✅ Agile development methodology</li>
                            <li className="textcolorlight">✅ GitHub repository for your portfolio</li>
                        </ul>
                        <Button variant="meroon" size="lg" className="gradient-button">
                            View Project Catalog
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
                                        <i className="fas fa-laptop-code text-white"></i>
                                    </div>
                                </div>
                                <Card.Title className="textcolor fw-bold">
                                    Development Projects
                                </Card.Title>
                                <Card.Text>
                                    Build full-stack applications using modern technologies and frameworks.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0 card-hover-effect">
                            <Card.Body>
                                <div className="icon-box mb-3">
                                    <div className="icon-circle bg-meroonlight">
                                        <i className="fas fa-database text-white"></i>
                                    </div>
                                </div>
                                <Card.Title className="textcolor fw-bold">
                                    Data Science Projects
                                </Card.Title>
                                <Card.Text>
                                    Work with real datasets to solve business problems using AI/ML.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm border-0 card-hover-effect">
                            <Card.Body>
                                <div className="icon-box mb-3">
                                    <div className="icon-circle bg-meroonlight">
                                        <i className="fas fa-cloud text-white"></i>
                                    </div>
                                </div>
                                <Card.Title className="textcolor fw-bold">
                                    Cloud Projects
                                </Card.Title>
                                <Card.Text>
                                    Deploy and manage applications on AWS, Azure, and GCP platforms.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
        <Footer/>
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

export default LiveProjects;