import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Pages/Footer";
import { Container, Table, Button, Card, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import { Globe, Clock, Users } from "react-feather";
import CourseEnquiryModal from '../components/EnrollModal';

const UpCommingBatches = () => {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [abroadData, setAbroadData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch batches
        const batchesRes = await axios.get('http://31.97.206.144:5001/api/upcomingBatch');
        if (batchesRes.data.success && batchesRes.data.data.length > 0) {
          const batches = batchesRes.data.data[0].allbatches.map(b => ({
            batchName: b.batchName,
            date: b.date,
            timing: b.timing,
            duration: b.duration,
            category: b.categorie,
          }));
          setAllBatches(batches);
          setFilteredBatches(batches);
          const uniqueCategories = [...new Set(batches.map(batch => batch.category))];
          setCategories(["All Categories", ...uniqueCategories]);
        } else {
          setAllBatches([]);
          setFilteredBatches([]);
        }

        // Fetch Abroad Students data
        const abroadRes = await axios.get('http://31.97.206.144:5001/api/abrodstudents');
        if (abroadRes.data.success && abroadRes.data.data.length > 0) {
          setAbroadData(abroadRes.data.data[0]);
        }

        // Fetch Enrollments data
        const enrollmentsRes = await axios.get('http://31.97.206.144:5001/api/enrollments');
        if (enrollmentsRes.data.success) {
          setEnrollments(enrollmentsRes.data.data);
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
      setFilteredBatches(allBatches.filter(batch => batch.category === category));
    }
  };

  const handleEnroll = () => {
    setShowEnquiryModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Function to get enrollment count for a specific batch
  const getEnrollmentCount = (batchName) => {
    const enrollment = enrollments.find(e => e.batchName === batchName);
    return enrollment ? enrollment.enrolledUsers.length : 0;
  };

  // Function to check if a batch has mentors assigned
  const hasMentors = (batchName) => {
    const enrollment = enrollments.find(e => e.batchName === batchName);
    return enrollment ? enrollment.assignedMentors.length > 0 : false;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="main-content">
          <Container className="my-5 text-center">
            <Spinner animation="border" role="status" variant="danger">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading upcoming batches...</p>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="main-content">
          <Container className="my-5 text-center">
            <Alert variant="danger">Failed to load data: {error}</Alert>
            <Button variant="danger" onClick={() => window.location.reload()} className="mt-3">
              Retry
            </Button>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="main-content">
        <Container className="my-5">

          {/* Upcoming Batches Section */}
          <section>
            <h2 className="text-center mb-4 fw-bold pt-3" style={{ color: "#a51d34" }}>
              
            </h2>

            <div className="text-white text-center py-3 fw-semibold rounded-top fs-3" style={{ backgroundColor: "#c34153" }}>
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
              <Table bordered hover responsive className="mb-0">
                <thead style={{ backgroundColor: "#a51d34" }}>
                  <tr className="text-white text-uppercase">
                    <th>Batch Name</th>
                    <th>Start Date</th>
                    <th>Timings</th>
                    <th>Duration</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.length > 0 ? (
                    filteredBatches.map((batch, index) => {
                      const enrollmentCount = getEnrollmentCount(batch.batchName);
                      const mentorsAssigned = hasMentors(batch.batchName);
                      
                      return (
                        <tr key={index}>
                          <td>{batch.batchName}</td>
                          <td>{formatDate(batch.date)}</td>
                          <td>{batch.timing}</td>
                          <td>{batch.duration}</td>
                          <td>{batch.category}</td>
                          
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-3">
                        No batches found for the selected category
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </section>

          

          {/* Flash Banner Section */}
          <section
            className="my-4 p-4 rounded d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start"
            style={{
              background: "linear-gradient(90deg, #c34153, #c34153)",
              color: "#fff",
              border: "2px solid #a51d34",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              animation: "flashSlide 1s ease-in-out",
            }}
          >
            <div className="mb-3 mb-md-0">
              <h4 className="fw-bold mb-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                🌟 One-on-One Mentorship Session!
              </h4>
              <p className="mb-0" style={{ fontSize: "1rem", textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.3)" }}>
                Secure your personal guidance with our expert instructors. Limited seats available!
              </p>
            </div>
            <div>
              <Button
                variant="light"
                size="md"
                className="fw-bold px-4 py-2"
                style={{
                  color: "#a51d34",
                  backgroundColor: "#fff",
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={() => window.location.href = "tel:9000239871"}
              >
                Call a Counselor Now
              </Button>
            </div>

            {/* Animation Keyframes */}
            <style>
              {`
                @keyframes flashSlide {
                  0% { opacity: 0; transform: translateY(-20px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>
          </section>

          {/* Abroad Students Section */}
          {abroadData && (
            <section className="my-5 p-4 rounded" style={{ backgroundColor: "#fff" }}>
              <Row className="align-items-center">
                <Col md={6}>
                  <h3 className="fw-bold mb-3" style={{ color: "#000" }}>
                    <i className="fa-solid fa-earth-americas" style={{color: "#a51d34"}}></i> {abroadData.title}
                  </h3>
                  <p className="mb-4" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                    {abroadData.description}
                  </p>
                  <ul className="list-unstyled" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                    {abroadData.details.map(detail => (
                      <li key={detail._id} className="mb-3 d-flex align-items-center">
                        <img src={detail.image} alt="" width={20} height={20} className="me-2 flex-shrink-0" />
                        <span>{detail.content}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="danger"
                    href="tel:9000239871"
                    size="sm"
                    style={{
                      backgroundColor: "#a51d34",
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
                    src="/home/abroad.jpg"
                    alt="International students"
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                </Col>
              </Row>
            </section>
          )}

          {/* Call to Action Section */}
          <Card className="mt-5 border-0 shadow">
            <Card.Body className="text-center p-4">
              <h3 className="mb-3" style={{ color: "#a51d34" }}>Ready to Start Your Tech Journey?</h3>
              <p className="mb-4 lead">
                Join hundreds of successful students who launched their tech careers with Techsterker
              </p>
              <Button variant="danger" size="sm" className="me-3" onClick={handleEnroll}>
                Enroll Now
              </Button>
              <Button as="a" href="tel:9000239871" variant="outline-danger" size="sm">
                Speak with a Counselor
              </Button>
            </Card.Body>
          </Card>

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