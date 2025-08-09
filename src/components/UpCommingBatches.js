import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutMagnitia from "../Pages/AboutMagnitia";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import { Container, Table, Button, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Globe, Award, Clock, Users, BookOpen, Briefcase } from 'react-feather';

const UpCommingBatches = () => {
  const [activeFilter, setActiveFilter] = useState("All Batches");
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainingTypes, setTrainingTypes] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('https://hicap-backend-4rat.onrender.com/api/upcomingBatch');
        if (response.data.success && response.data.data.length > 0) {
          const batches = response.data.data[0].allbatches;
          setAllBatches(batches);
          setFilteredBatches(batches);
          
          // Generate training types dynamically from available categories and types
          const availableCategories = [...new Set(batches.map(batch => batch.categorie))];
          const availableTypes = [...new Set(batches.map(batch => batch.type))];
          
          const generatedTrainingTypes = [
            { name: "All Batches", filter: () => true },
            ...availableCategories.map(cat => ({
              name: `${cat} Batches`,
              filter: (b) => b.categorie === cat
            })),
            ...availableTypes.map(type => ({
              name: `${type} Training`,
              filter: (b) => b.type === type
            })),
            { 
              name: "Full Stack", 
              filter: (b) => b.batchName.toLowerCase().includes("full stack") 
            }
          ];
          
          setTrainingTypes(generatedTrainingTypes);
        } else {
          setAllBatches([]);
          setFilteredBatches([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch batches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const handleFilterClick = (type) => {
    setActiveFilter(type.name);
    setFilteredBatches(allBatches.filter(type.filter));
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
        <AboutMagnitia />
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
        <AboutMagnitia />
        <Container className="my-5 text-center">
          <Alert variant="danger">
            Failed to load batches: {error}
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
      <AboutMagnitia />

      <Container className="my-5">
        {/* Why Choose Us Section */}
        <section className="mb-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#ad2132" }}>
            Why Choose Magnitia for Your Tech Education?
          </h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <Award size={48} className="mb-3" color="#ad2132" />
                  <Card.Title>Industry Expert Mentors</Card.Title>
                  <Card.Text>
                    Learn from professionals with 10+ years of real-world experience in top tech companies.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <Briefcase size={48} className="mb-3" color="#ad2132" />
                  <Card.Title>100% Placement Assistance</Card.Title>
                  <Card.Text>
                    Our dedicated placement team helps you land your dream job with resume prep and mock interviews.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <BookOpen size={48} className="mb-3" color="#ad2132" />
                  <Card.Title>Hands-on Projects</Card.Title>
                  <Card.Text>
                    Build real-world applications and add them to your portfolio during the course.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* International Students Section */}
        <section className="mb-5 p-4 rounded" style={{ backgroundColor: "#f8f9fa" }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="fw-bold mb-3" style={{ color: "#ad2132" }}>International Students Welcome!</h3>
              <p className="mb-4">
                Magnitia offers specialized support for students coming from abroad:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2"><Globe className="me-2" color="#ad2132" />Flexible timing options for different time zones</li>
                <li className="mb-2"><Users className="me-2" color="#ad2132" />Dedicated support for visa documentation</li>
                <li className="mb-2"><Clock className="me-2" color="#ad2132" />Recorded sessions available 24/7</li>
              </ul>
              <Button variant="danger">Contact International Admissions</Button>
            </Col>
            <Col md={6} className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" 
                alt="International students" 
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
              />
            </Col>
          </Row>
        </section>

        {/* Upcoming Batches Section */}
        <section>
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#ad2132" }}>
            Click below to view the batch details
          </h2>

          <div className="text-white text-center py-3 fw-semibold rounded-top" style={{ backgroundColor: "#ad2132" }}>
            UPCOMING BATCHES
          </div>

          <div className="d-flex flex-wrap justify-content-center py-3 border border-top-0">
            {trainingTypes.map((type) => (
              <Button
                key={type.name}
                variant={activeFilter === type.name ? "danger" : "outline-danger"}
                onClick={() => handleFilterClick(type)}
                className={`m-1 fw-medium ${activeFilter === type.name ? "text-white" : ""}`}
              >
                {type.name}
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
                      No batches found for the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>

        {/* Call to Action Section */}
        <Card className="mt-5 border-0 shadow">
          <Card.Body className="text-center p-4">
            <h3 className="mb-3" style={{ color: "#ad2132" }}>Ready to Start Your Tech Journey?</h3>
            <p className="mb-4 lead">
              Join hundreds of successful students who launched their tech careers with Magnitia
            </p>
            <Button variant="danger" size="lg" className="me-3">
              Enroll Now
            </Button>
            <Button variant="outline-danger" size="lg">
              Speak with a Counselor
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default UpCommingBatches;