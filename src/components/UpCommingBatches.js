import React, { useState } from "react";
import AboutMagnitia from "../Pages/AboutMagnitia";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import { Container, Table, Button, ButtonGroup, Card, Row, Col } from "react-bootstrap";

const batches = [
  { title: "Testing Tools (Manual Testing, Selenium with AI, Java, Frameworks & Cucumber)", date: "26 June 2025", time: "10:30am to 11.30am", duration: "75 days", faculty: "Chary", type: "Live Online & Classroom Training" },
  { title: "Testing Tools (Manual Testing, Selenium with AI, Java, Frameworks & Cucumber)", date: "07 July 2025", time: "9.30am to 10.30am", duration: "75 days", faculty: "Chary", type: "Live Online & Classroom Training" },
  { title: "API Testing (WebServices, MicroServices, Rest Assured, and Postman)", date: "10 July 2025", time: "8am to 9.30am", duration: "50 days", faculty: "Anudeep", type: "Live Online Training" },
  { title: "Selenium Powered with AI (Selenium powered with AI, Java, Frameworks & Cucumber)", date: "10 July 2025", time: "7:30am to 9am", duration: "60 days", faculty: "GC Reddy", type: "Live Online Training" },
  { title: "Performance Testing with JMeter", date: "12 July 2025", time: "11am to 1pm", duration: "Weekend Batch", faculty: "Mani", type: "Live Online Training" },
  { title: "Testing Tools (Manual Testing, Selenium with Java, Frameworks & Cucumber)", date: "16 July 2025", time: "5pm to 6.30pm", duration: "75 days", faculty: "Anudeep", type: "Live Online Training" },
  { title: "Testing Tools (Manual Testing, Selenium with Java, Frameworks & Cucumber)", date: "24 July 2025", time: "7pm to 8.30pm", duration: "75 days", faculty: "Anudeep", type: "Live Online Training" },
];

const trainingTypes = [
  { name: "All Batches", filter: () => true },
  { name: "Regular Training", filter: (b) => b.type.includes("Classroom") && !b.duration.includes("Weekend") },
  { name: "Online Training", filter: (b) => b.type.includes("Online") && !b.duration.includes("Weekend") },
  { name: "Weekend Training", filter: (b) => b.duration.includes("Weekend") },
  { name: "Full Stack", filter: (b) => b.title.includes("Full Stack") },
];

const UpCommingBatches = () => {
  const [activeFilter, setActiveFilter] = useState("All Batches");
  const [filteredBatches, setFilteredBatches] = useState(batches);

  const handleFilterClick = (type) => {
    setActiveFilter(type.name);
    setFilteredBatches(batches.filter(type.filter));
  };

  return (
    <>
      <Header />
      <AboutMagnitia />

      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#ad2132" }}>
          Click below to view the batch details
        </h2>

        <div className="text-white text-center py-3 fw-semibold rounded-top" style={{ backgroundColor: "#ad2132" }}>
          UPCOMING BATCHES
        </div>

        <ButtonGroup className="d-flex flex-wrap justify-content-center py-3 border border-top-0" style={{ backgroundColor: "#f8d7da" }}>
          {trainingTypes.map((type) => (
            <Button
              key={type.name}
              variant={activeFilter === type.name ? "" : "light"}
              onClick={() => handleFilterClick(type)}
              className={`m-1 fw-medium ${activeFilter === type.name ? "text-white" : "text-dark"}`}
              style={activeFilter === type.name ? { backgroundColor: "#c34153" } : {}}
            >
              {type.name}
            </Button>
          ))}
        </ButtonGroup>

        <div className="shadow-sm border border-top-0 rounded-bottom">
          <Table striped bordered hover responsive className="mb-0">
            <thead style={{ backgroundColor: "#ad2132" }}>
              <tr className="text-white text-uppercase">
                <th>Batch Title</th>
                <th>Date</th>
                <th>Timings</th>
                <th>Duration</th>
                <th>Faculty</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch, index) => (
                  <tr key={index}>
                    <td>{batch.title}</td>
                    <td>{batch.date}</td>
                    <td>{batch.time}</td>
                    <td>{batch.duration}</td>
                    <td>{batch.faculty}</td>
                    <td>{batch.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    No batches found for the selected filter
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Card className="mt-4 border-0" style={{ backgroundColor: "#f8d7da" }}>
          <Card.Body>
            <Card.Title style={{ color: "#ad2132" }}>Need Help Choosing a Batch?</Card.Title>
            <Card.Text>
              Contact our counselors at <strong>+91 1234567890</strong> or email us at <strong>info@Magnitia.com</strong> for personalized guidance.
            </Card.Text>
            <Button style={{ backgroundColor: "#c34153", border: "none" }}>
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
