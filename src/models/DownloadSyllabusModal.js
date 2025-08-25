import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';

const DownloadSyllabusModal = ({ show, handleClose, courseId }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  // Fetch course PDF URL from API
  const fetchCoursePdf = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://hicap-backend-4rat.onrender.com/api/coursecontroller`);
      const data = await response.json();
      if (response.ok && data.success) {
        const course = data.data.find(c => c._id === courseId);
        if (course && course.pdf) {
          setPdfUrl(course.pdf);
        } else {
          alert("PDF not available for this course.");
        }
      } else {
        alert("Failed to fetch course details.");
      }
    } catch (error) {
      console.error("Error fetching course PDF:", error);
      alert("Error fetching PDF.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!name || !phone) {
      alert("Please enter both your name and WhatsApp number.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://hicap-backend-4rat.onrender.com/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber: phone }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`OTP sent successfully to ${phone}`);
        setOtpSent(true);
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return;

    try {
      setLoading(true);
      const response = await fetch("https://hicap-backend-4rat.onrender.com/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("OTP verified! Download starting...");
        if (!pdfUrl) await fetchCoursePdf();
        if (pdfUrl) window.open(pdfUrl, "_blank");
        handleCloseModal();
      } else {
        alert(data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOtpSent(false);
    setOtp("");
    setName("");
    setPhone("");
    setPdfUrl("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered size="md">
      <Modal.Header closeButton className="border-bottom-0 justify-content-center">
        <Modal.Title className="fw-bold textcolor text-center d-flex align-items-center gap-2">
          <FaDownload /> Download Syllabus
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-3 px-sm-4">
        {!otpSent ? (
          <Form className="text-center">
            <Form.Group className="mb-3 text-start">
              <Form.Label className="fw-semibold">Enter Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4 text-start">
              <Form.Label className="fw-semibold">Enter WhatsApp Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+91 93984 59191"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="py-2"
              />
              <Form.Text className="text-muted">
                We'll send a verification code to your WhatsApp
              </Form.Text>
            </Form.Group>
            <div className="d-grid">
              <Button
                className="gradient-button fw-semibold py-2"
                onClick={sendOtp}
                disabled={!name || !phone || loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          </Form>
        ) : (
          <Form className="text-center">
            <Form.Group className="mb-4 text-start">
              <Form.Label className="fw-semibold">Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="py-2"
                maxLength={6}
              />
              <Form.Text className="text-muted">
                Check your WhatsApp for the verification code
              </Form.Text>
            </Form.Group>
            <div className="d-grid">
              <Button
                className="gradient-button fw-semibold py-2"
                onClick={verifyOtp}
                disabled={otp.length !== 6 || loading}
              >
                {loading ? "Verifying..." : "Verify & Download"}
              </Button>
            </div>
            <div className="text-center mt-3">
              <Button
                variant="link"
                className="text-muted small"
                onClick={() => setOtpSent(false)}
              >
                Change phone number
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DownloadSyllabusModal;
