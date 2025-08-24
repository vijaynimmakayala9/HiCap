import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutTechsterker from "../Pages/AboutTerchsterker";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import { Container, Table, Button, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Globe, Award, Clock, Users } from 'react-feather';
import CourseEnquiryModal from '../components/EnrollModal';

const UpCommingBatches = () => {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // new API states
  const [upcomingCards, setUpcomingCards] = useState([]);
  const [whyChooseCards, setWhyChooseCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // batches
        const batchesRes = await axios.get('https://hicap-backend-4rat.onrender.com/api/upcomingBatch');
        if (batchesRes.data.success && batchesRes.data.data.length > 0) {
          const batches = batchesRes.data.data[0].allbatches;
          setAllBatches(batches);
          setFilteredBatches(batches);
          const uniqueCategories = [...new Set(batches.map(batch => batch.categorie))];
          setCategories(["All Categories", ...uniqueCategories]);
        } else {
          setAllBatches([]);
          setFilteredBatches([]);
        }

        // upcoming section
        const upcomingRes = await axios.get("https://hicap-backend-4rat.onrender.com/api/upcoming");
        if (upcomingRes.data.success && upcomingRes.data.data.length > 0) {
          setUpcomingCards(upcomingRes.data.data[0].upcoming);
        }

        // why choose section
        const whyRes = await axios.get("https://hicap-backend-4rat.onrender.com/api/whychooses");
        if (whyRes.data.success && whyRes.data.data.length > 0) {
          setWhyChooseCards(whyRes.data.data[0].whyChoose);
        }

      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    if (category === "All Categories") {
      setFilteredBatches(allBatches);
    } else {
      setFilteredBatches(allBatches.filter(batch => batch.categorie === category));
    }
  };

  const handleEnroll = () => {
    setShowEnquiryModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        {/* <AboutTechsterker /> */}
        <Container className="my-5 text-center">
          <Spinner animation="border" role="status" variant="danger">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading upcoming batches...</p>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        {/* <AboutTechsterker /> */}
        <Container className="my-5 text-center mt-5">
          <Alert variant="danger">
            Failed to load data: {error}
          </Alert>
          <Button
            variant="danger"
            onClick={() => window.location.reload()}
            className="mt-3"
          >
            Retry
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="mt-5">
        {/* <AboutTechsterker /> */}

      <Container className="my-5 mt-5">
        {/* Why Choose Us Section (API) */}
        {/* <section className="mb-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#ad2132" }}>
            Why Choose Techsterker for Your Tech Education?
          </h2>
          <Row>
            {upcomingCards.map((card) => (
              <Col md={4} className="mb-4" key={card._id}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="d-block mx-auto mb-3"
                      style={{ width: "60px", height: "60px", objectFit: "contain" }}
                    />
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.content}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section> */}

        {/* Upcoming Batches Section */}
        <section>
          <h2 className="text-center mb-4 fw-bold mt-5" style={{ color: "#ad2132" }}>
            Click below to view the batch details
          </h2>

          <div className="text-white text-center py-3 fw-semibold rounded-top" style={{ backgroundColor: "#ad2132" }}>
            UPCOMING BATCHES
          </div>

          <div className="d-flex flex-wrap justify-content-center py-3 border border-top-0">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "danger" : "outline-danger"}
                onClick={() => handleFilterClick(cat)}
                className={`m-1 fw-medium ${activeFilter === cat ? "text-white" : ""}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="shadow-sm border border-top-0 rounded-bottom">
            <Table striped bordered hover responsive className="mb-0">
              <thead style={{ backgroundColor: "#ad2132" }}>
                <tr className="text-white text-uppercase">
                  <th>Batch Name</th>
                  <th>Batch No</th>
                  <th>Start Date</th>
                  <th>Timings</th>
                  <th>Duration</th>
                  <th>Mentor</th>
                  <th>Type</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch, index) => (
                    <tr key={index}>
                      <td>{batch.batchName}</td>
                      <td>{batch.batchNo}</td>
                      <td>{formatDate(batch.date)}</td>
                      <td>{batch.timing}</td>
                      <td>{batch.duration}</td>
                      <td>{batch.mentor}</td>
                      <td>{batch.type}</td>
                      <td>{batch.categorie}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-3">
                      No batches found for the selected category
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>

        {/* International Students Section */}
        <section className="my-5 p-4 rounded" style={{ backgroundColor: "#f8f9fa" }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="fw-bold mb-3" style={{ color: "#ad2132" }}>
                🌏 Welcome, International Students!
              </h3>
              <p className="mb-4" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                At <strong>Techsterker</strong>, we provide dedicated support for students joining us from around the world:
              </p>
              <ul className="list-unstyled" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                <li className="mb-3 d-flex align-items-center">
                  <Globe color="#ad2132" size={20} className="me-2 flex-shrink-0" />
                  <span>Flexible scheduling to accommodate various time zones</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <Users color="#ad2132" size={20} className="me-2 flex-shrink-0" />
                  <span>Customized time adjustments available upon request</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <Clock color="#ad2132" size={20} className="me-2 flex-shrink-0" />
                  <span>Access recorded sessions anytime, 24/7</span>
                </li>
              </ul>
              <Button
                variant="danger"
                size="sm"
                style={{
                  backgroundColor: "#ad2132",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Contact International Admissions
              </Button>
            </Col>

            <Col md={6} className="text-center">
              <img
                src="/abroad.jpg"
                alt="International students"
                className="img-fluid rounded shadow-md"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  border: "0.5px solid #ad2132",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(173, 33, 50, 0.25)",
                }}
              />
            </Col>
          </Row>
        </section>

        {/* Call to Action Section */}
        <Card className="mt-5 border-0 shadow">
          <Card.Body className="text-center p-4">
            <h3 className="mb-3" style={{ color: "#ad2132" }}>Ready to Start Your Tech Journey?</h3>
            <p className="mb-4 lead">
              Join hundreds of successful students who launched their tech careers with Techsterker
            </p>
            <Button variant="danger" size="sm" className="me-3" onClick={handleEnroll}>
              Enroll Now
            </Button>
            <Button as="a" href="tel:9876543211" variant="outline-danger" size="sm">
              Speak with a Counselor
            </Button>
          </Card.Body>
        </Card>

        {/* Why Professionals & Students Choose Us (API) */}
        {/* <section className="mt-5 mb-5">
          <h2 className="text-center fw-bold mb-4" style={{ color: "#ad2132" }}>
            Why Professionals & Students Choose Us
          </h2>
          <Row>
            {whyChooseCards.map((card) => (
              <Col md={4} className="mb-4" key={card._id}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="d-block mx-auto mb-3"
                      style={{ width: "60px", height: "60px", objectFit: "contain" }}
                    />
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.content}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="danger" size="lg" onClick={handleEnroll}>
              Join Now and Transform Your Future
            </Button>
          </div>
        </section> */}
      </Container>

      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
      </div>
      <Footer />
    </>
  );
};

export default UpCommingBatches;
