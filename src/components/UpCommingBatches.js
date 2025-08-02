import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutMagnitia from "../Pages/AboutMagnitia";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import { Container, Table, Button, ButtonGroup, Card, Spinner, Alert } from "react-bootstrap";

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
          
          // Generate training types dynamically from the data
          const uniqueCategories = [...new Set(batches.map(batch => batch.categorie))];
          const uniqueTypes = [...new Set(batches.map(batch => batch.type))];
          
          const generatedTrainingTypes = [
            { name: "All Batches", filter: () => true },
            ...uniqueCategories.map(cat => ({
              name: `${cat} Training`,
              filter: (b) => b.categorie === cat
            })),
            ...uniqueTypes.map(type => ({
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
        <h2 className="text-center mb-4 fw-bold textcolor">
          Click below to view the batch details
        </h2>

        <div className="text-white text-center py-3 fw-semibold rounded-top" style={{ backgroundColor: "#ad2132" }}>
          UPCOMING BATCHES
        </div>

        <div className="d-flex flex-wrap justify-content-center py-3 border border-top-0">
          {trainingTypes.map((type) => (
            <Button
              key={type.name}
              variant={activeFilter === type.name ? "danger" : "light"}
              onClick={() => handleFilterClick(type)}
              className={`m-1 fw-medium ${activeFilter === type.name ? "text-white" : "textcolor"}`}
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

        <Card className="mt-4 border-0">
          <Card.Body>
            <Card.Title style={{ color: "#ad2132" }}>Need Help Choosing a Batch?</Card.Title>
            <Card.Text>
              Contact our counselors at <strong>+91 1234567890</strong> or email us at <strong>info@Magnitia.com</strong> for personalized guidance.
            </Card.Text>
            <Button variant="danger">
              Request a Call Back
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default UpCommingBatches;