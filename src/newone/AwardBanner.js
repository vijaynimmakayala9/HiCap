import React, { useEffect, useState } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AwardBanner = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get("http://31.97.206.144:5001/api/OurCertificates");
        if (res.data.success && res.data.data.length > 0) {
          setCertificate(res.data.data[0]); // pick first certificate
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 bg-dark">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 bg-dark">
        <p className="text-white">No certificate available</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner Section */}
      <div className="px-5 py-5 bg-dark">
        <div
          className="container-fluid rounded-3 p-4"
          style={{ backgroundColor: "#1a1a1a", border: "1px solid #ffa500" }}
        >
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-md-6 order-1">
              <section className="my-4 ps-md-4 rounded text-start">
                <h5 className="text-white mb-2">Recognised as</h5>
                <h2 className="text-white fw-bold mb-3">{certificate.description}</h2>
                <div>
                  <Button
                    variant="warning"
                    className="fw-bold px-4 py-2"
                    onClick={() => setShowModal(true)}
                  >
                    View
                  </Button>
                </div>
              </section>
            </div>

            {/* Right Image */}
            <div className="col-md-6 d-flex justify-content-center align-items-center order-2">
              <img
                src={certificate.certificateImage}
                alt={certificate.description}
                className="img-fluid rounded"
                style={{
                  maxHeight: "350px",
                  boxShadow: "0 4px 8px rgba(255, 165, 0, 0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Certificate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={certificate.certificateImage}
            alt={certificate.description}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "300px" }}
          />
          <h4 className="fw-bold">Certified By</h4>
          <h5 className="">{certificate.description}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AwardBanner;
