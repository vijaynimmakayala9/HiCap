import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "../Pages/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import PrivacyPolicy from "../OurDocuments/PrivacyandPolicy";
import Terms from "../OurDocuments/TermsandConditions";
import RefundPolicy from "../OurDocuments/RefundPolicy";
import CookiePolicy from "../OurDocuments/CookiePolicy";

const OurPolicies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState("Privacy Policy");
  const [agreed, setAgreed] = useState(false);
  const [paymentType, setPaymentType] = useState("full"); // 'full' or 'advance'
  const [loading, setLoading] = useState(false);

  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get form data from navigation state
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, userType, selectedCourse } = location.state || {};

  // If no data passed, redirect back
  if (!formData || !selectedCourse) {
    alert("Missing registration data. Please start from the beginning.");
    navigate("/");
    return null;
  }

  const fullPrice = selectedCourse.price;
  const advancePrice = fullPrice * 0.6;

  const policies = {
    "Privacy Policy": <PrivacyPolicy />,
    "Terms & Conditions": <Terms />,
    "Refund Policy": <RefundPolicy />,
    "Cookie Policy": <CookiePolicy />,
  };

  // Generate OTP
  const generateOtp = async () => {
    try {
      setOtpLoading(true);
      setOtpError("");

      const response = await fetch("https://api.techsterker.com/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: formData.mobile
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setOtpError("");

      } else {
        setOtpError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      setOtpError("Network error. Please check your connection and try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");

      const response = await fetch("https://api.techsterker.com/api/validate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpError("");
        setShowOtpModal(false);
        // Proceed to payment after successful OTP verification
        proceedToPayment();
      } else {
        setOtpError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle Proceed to Payment (with OTP verification)
  const handleProceedToPayment = () => {
    if (!agreed) {
      alert("Please accept the terms and conditions to proceed");
      return;
    }

    // Show OTP modal first
    setShowOtpModal(true);
    generateOtp();
  };

  // Proceed to payment after OTP verification
  const proceedToPayment = async () => {
    try {
      setLoading(true);

      // Calculate payment amount based on selection
      const paymentAmount = paymentType === "advance" ? advancePrice : fullPrice;
      const isAdvancePayment = paymentType === "advance";

      // Prepare payload for user registration
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        courseId: formData.courseId,
        course: formData.course,
        degree: formData.degree || "N/A",
        department: formData.department || "N/A",
        yearOfPassedOut: formData.yearOfPassedOut || 0,
        company: formData.company || "N/A",
        role: userType === "student" ? "Student" : formData.role || "",
        experience: formData.experience || "N/A",
        transactionId: "", // Will be updated after payment
        advancePayment: isAdvancePayment ? paymentAmount : 0,
        isAdvancePayment: isAdvancePayment
      };

      const AmountforPayment = paymentAmount + paymentAmount * 0.18;

      // Initialize Razorpay payment
      const options = {
        key: "rzp_live_ROKQXDRUzOnshb", // Replace with your actual Razorpay key
        amount: AmountforPayment * 100, // Amount in paise
        currency: "INR",
        name: "Techsterker",
        description: `${formData.course} - ${isAdvancePayment ? 'Advance Payment' : 'Full Payment'}`,
        image: "/logo/hicaplogo.png",
        handler: async function (response) {
          setLoading(true);

          // Safely get payment ID
          const transactionId = response?.razorpay_payment_id || "";
          if (!transactionId && isAdvancePayment) {
            setLoading(false);
            alert("Payment failed or no transaction ID returned. Please try again.");
            return;
          }

          payload.transactionId = transactionId;

          try {
            const res = await fetch("https://api.techsterker.com/api/userregister", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            let data;
            try {
              data = await res.json();
            } catch (jsonErr) {
              console.error("Failed to parse JSON:", jsonErr);
              alert("Server response was invalid. Please contact support.");
              setLoading(false);
              return;
            }

            if (!res.ok || !data.success) {
              alert(`Registration failed: ${data?.message || "Unknown error"}. Payment ID: ${transactionId}`);
              setLoading(false);
              return;
            }

            console.log("User registered successfully:", data);
            setShowSuccessModal(true);
          } catch (error) {
            console.error("Error registering user:", error);
            alert(`Network error during registration. Payment ID: ${transactionId}`);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          courseId: formData.courseId,
          courseName: formData.course,
          userType: userType,
          paymentType: paymentType
        },
        theme: { color: "#a51d34" },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setLoading(false);
        alert('Payment Failed: ' + response.error?.description || 'Unknown error');
      });

      rzp.open();

    } catch (error) {
      setLoading(false);
      console.error("Payment initialization error:", error);
      alert("Something went wrong with payment initialization!");
    }
  };

  const getCurrentPaymentAmount = () => {
    return paymentType === "advance" ? advancePrice : fullPrice;
  };

  const getRemainingAmount = () => {
    return paymentType === "advance" ? fullPrice - advancePrice : 0;
  };

  // Resend OTP
  const handleResendOtp = () => {
    setOtp("");
    setOtpSent(false);
    setOtpError("");
    generateOtp();
  };

  // Close OTP modal
  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtp("");
    setOtpSent(false);
    setOtpError("");
  };

  return (
    <>
      <Header />
      <Container fluid className="mb-3 main-content">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center textcolor mb-4">Course Registration - Terms & Payment</h2>

            {/* Course Summary */}
            <Card className="shadow-sm mb-4" style={{ borderColor: "#a51d34" }}>
              <Card.Body>
                <Card.Title className="textcolor">Selected Course</Card.Title>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                  {/* Left Section */}
                  <div className="mb-3 mb-md-0">
                    <h5 className="mb-1">{selectedCourse.name}</h5>
                    <p className="text-muted mb-0"><strong>Student:</strong> {formData.name}</p>
                    <p className="text-muted mb-0"><strong>Email:</strong> {formData.email}</p>
                    <p className="text-muted mb-0"><strong>Mobile:</strong> {formData.mobile}</p>
                  </div>

                  {/* Right Section */}
                  <div className="text-md-end">
                    <h4 className="textcolor mb-0">₹{fullPrice.toLocaleString()}/-</h4>
                    <small className="text-muted">Total Course Fee</small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Policy Dropdown */}
            <Form.Group controlId="policySelect" className="mb-4">
              <Form.Label>Review Our Policies</Form.Label>
              <Form.Select
                value={selectedPolicy}
                onChange={(e) => setSelectedPolicy(e.target.value)}
              >
                {Object.keys(policies).map((policy, idx) => (
                  <option key={idx} value={policy}>
                    {policy}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Show Selected Policy */}
            <Card className="shadow-sm d-flex flex-column" style={{ height: "45vh", width: "100%" }}>
              <Card.Body className="d-flex flex-column p-1 h-100 w-100">
                {/* Card Title */}
                <Card.Title className="my-3 fw-bold text-center">{selectedPolicy}</Card.Title>

                {/* Scrollable Policy Content */}
                <div className="overflow-auto flex-grow-1" style={{ maxHeight: "calc(100% - 2rem)" }}>
                  {policies[selectedPolicy]}
                </div>
              </Card.Body>
            </Card>

            {/* Agreement Checkbox */}
            <div className="d-flex align-items-start mb-4">
              <Form.Check
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="me-2 mt-1"
              />
              <Form.Label htmlFor="terms" className="text-muted small">
                By selecting this, you acknowledge that you've read and agree to
                our{" "}
                <a
                  href="/terms"
                  className="text-primary text-decoration-underline"
                  target="_blank"
                >
                  Terms & Conditions
                </a>
                , {" "}
                <a
                  href="/policy"
                  className="text-primary text-decoration-underline"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                , {" "}
                <a
                  href="/refund"
                  className="text-primary text-decoration-underline"
                  target="_blank"
                >
                  Refund Policy
                </a>
                , and {" "}
                <a
                  href="/cookie"
                  className="text-primary text-decoration-underline"
                  target="_blank"
                >
                  Cookie Policy
                </a>
                .
              </Form.Label>
            </div>

            {/* Show payment options only if agreed */}
            {agreed && (
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Payment Options</Card.Title>
                  <Form.Group className="mb-3">
                    <div className="d-flex gap-3">
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        id="fullPayment"
                        label={`Full Payment - ₹${fullPrice.toLocaleString()}/-`}
                        value="full"
                        checked={paymentType === "full"}
                        onChange={(e) => setPaymentType(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        id="advancePayment"
                        label={`Advance Payment - ₹${advancePrice.toLocaleString()}/- `}
                        value="advance"
                        checked={paymentType === "advance"}
                        onChange={(e) => setPaymentType(e.target.value)}
                      />
                    </div>
                    {paymentType === "advance" && (
                      <small className="text-muted">
                        Remaining Amount: ₹{getRemainingAmount().toLocaleString()}/- (to be paid later)
                      </small>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>
            )}

            {/* Payment Button */}
            <div className="text-center">
              <button
                className="btn btn-lg text-white w-100"
                style={{ backgroundColor: "#a51d34" }}
                disabled={!agreed || loading}
                onClick={handleProceedToPayment}
              >
                {loading
                  ? "Processing..."
                  : `Proceed to Pay ₹${getCurrentPaymentAmount().toLocaleString()}/- ${paymentType === 'advance' ? '(Advance)' : '(Full Payment)'}`
                }
              </button>

              {paymentType === "advance" && (
                <small className="text-muted d-block mt-2">
                  Secure your seat with advance payment. Complete remaining amount later.
                </small>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* OTP Verification Modal */}
      <Modal
        show={showOtpModal}
        onHide={handleCloseOtpModal}
        centered
        backdrop="static"
        keyboard={false}
        contentClassName="rounded-lg shadow-lg border-0"
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0 bg-gradient-to-r from-red-600 to-red-800 text-white"
        >
          <Modal.Title className="fw-bold fs-5 p-3">
            🔐 Mobile Verification
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3 pb-1 px-4 text-center">
          <h5 className="fw-bold mb-2 text-red-700">Verify Your Mobile Number</h5>
          <p className="text-muted mb-3">
            We've sent a 4-digit OTP to your mobile number:
          </p>
          <div className="alert alert-light border-0 mb-4 bg-gray-100">
            <strong className="text-primary">+91 {formData.mobile}</strong>
          </div>

          {!otpSent ? (
            <div className="text-center">
              <p className="text-muted">Sending OTP...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))
                  }
                  className="text-center fw-bold fs-5 py-2"
                  style={{ letterSpacing: '0.5em' }}
                  maxLength={4}
                  disabled={otpLoading}
                />
                <Form.Text className="text-muted">
                  Enter the 4-digit code sent to your mobile
                </Form.Text>
              </Form.Group>

              {otpError && (
                <div className="alert alert-danger py-2" role="alert">
                  <small>{otpError}</small>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={handleResendOtp}
                  disabled={otpLoading}
                  size="sm"
                  className="rounded-pill"
                >
                  ↻ Resend OTP
                </Button>

                <Button
                  onClick={verifyOtp}
                  disabled={otp.length !== 4 || otpLoading}
                  className="px-4 rounded-pill text-white"
                  style={{ background: 'linear-gradient(135deg, #c34153, #a51d34)', border: 'none' }}
                >
                  {otpLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Verifying...
                    </>
                  ) : (
                    'Verify & Proceed'
                  )}
                </Button>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <small className="text-muted">
            OTP will expire in 1 minute. Make sure to enter it quickly.
          </small>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        contentClassName="rounded-lg shadow-lg border-0"
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0 bg-gradient-to-r from-red-600 to-red-800 text-white"
        >
          <Modal.Title className="fw-bold fs-5 p-3">
            🎉 Registration Successful!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3 pb-1 px-4 text-center">
          <h5 className="fw-bold mb-2 text-red-700">Welcome to Techsterker</h5>
          <p className="text-muted mb-3">
            Your payment has been processed successfully and your course registration is complete.
          </p>
          <div className="alert alert-light border-0 bg-gray-100 mb-3">
            <small className="text-muted">
              📧 Confirmation email sent to: <strong>{formData.email}</strong><br />
              📱 Mobile verified: <strong>+91 {formData.mobile}</strong>
            </small>
          </div>

          {paymentType === 'advance' && (
            <div className="alert alert-warning rounded">
              <small>
                <strong>Note:</strong> You have made an advance payment of ₹{advancePrice.toLocaleString()}/-.
                Remaining amount ₹{getRemainingAmount().toLocaleString()}/- can be paid later.
              </small>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate('/');
            }}
            className="px-4 py-2 rounded-pill fw-semibold text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #c34153, #a51d34)', border: 'none' }}
          >
            Go to Home
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default OurPolicies;