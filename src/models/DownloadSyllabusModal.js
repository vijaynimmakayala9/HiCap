import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const DownloadSyllabusModal = ({ show, handleClose, courseId }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');

  // 🔽 Helper: Download PDF
const handleDownload = async (url, filename = "document.pdf") => {
  try {
    // Always treat Cloudinary raw file as PDF
    const response = await axios.get(url, { responseType: "blob" });

    const blob = new Blob([response.data], { type: "application/pdf" });

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
    Swal.fire("Error", "Failed to download the PDF. Try again.", "error");
  }
};

// Fetch course PDF URL
const fetchCoursePdf = async () => {
  try {
    setLoading(true);
    const response = await axios.get(
      "http://31.97.206.144:5001/api/coursecontroller"
    );

    if (response.data.success) {
      const course = response.data.data.find((c) => c._id === courseId);

      if (course && course.pdf) {
        // ✅ Use Cloudinary raw URL directly, don’t append ".pdf"
        setPdfUrl(course.pdf);
        setFileName(`${course.name}-syllabus.pdf`);
        return { url: course.pdf, name: course.name };
      } else {
        Swal.fire("Oops", "PDF not available for this course.", "warning");
        return null;
      }
    } else {
      Swal.fire("Error", "Failed to fetch course details.", "error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching course PDF:", error);
    Swal.fire("Error", "Error fetching PDF. Please try again.", "error");
    return null;
  } finally {
    setLoading(false);
  }
};



  // 🔽 Send OTP
  const sendOtp = async () => {
    if (!name || !phone) {
      Swal.fire('Warning', 'Please enter your name and phone number.', 'warning');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://31.97.206.144:5001/api/send-otp',
        { name, phoneNumber: `+${phone}` }
      );

      if (response.data.success) {
        Swal.fire('Success', `OTP sent successfully to +${phone}`, 'success');
        setOtpSent(true);
      } else {
        Swal.fire('Error', response.data.message || 'Failed to send OTP.', 'error');
      }
    } catch (error) {
      console.error('Send OTP error:', error.response || error);
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Server error while sending OTP.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔽 Verify OTP & download
  const verifyOtp = async () => {
  if (!otp || otp.length !== 6) return;

  try {
    setLoading(true);
    const response = await axios.post(
      'http://31.97.206.144:5001/api/verify-otp',
      { phoneNumber: `+${phone}`, otp }
    );

    if (response.data.success) {
      Swal.fire('Verified', 'OTP verified! Download starting...', 'success');

      let url = pdfUrl;
      let name = fileName;

      if (!url) {
        const result = await fetchCoursePdf(); // ✅ returns { url, name }
        if (result) {
          url = result.url;
          name = result.name;
        }
      }

      if (url) {
        await handleDownload(url, `${name}.pdf`);
      }

      handleClose();
    } else {
      Swal.fire('Error', response.data.message || 'Invalid OTP. Try again.', 'error');
    }
  } catch (error) {
    console.error('Verify OTP error:', error.response || error);
    Swal.fire('Error', 'Error verifying OTP. Try again later.', 'error');
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal show={show} onHide={handleClose} centered size="md">
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
              <Form.Label className="fw-semibold">Enter Phone Number</Form.Label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputClass="form-control py-2"
                placeholder="Enter phone number"
                enableSearch
              />
              <Form.Text className="text-muted">
                Select your country code. We'll send a verification code to this number.
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button
                className="gradient-button fw-semibold py-2"
                onClick={sendOtp}
                disabled={!name || !phone || loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
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
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Download'
                )}
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
