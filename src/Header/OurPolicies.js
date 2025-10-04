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
  const advancePrice = fullPrice*0.5;

  // const coursePrice = selectedCourse.price;
  // const gst = (coursePrice * 5) / 100;
  // const fullPrice = coursePrice + gst;
  // const advanceBase = fullPrice * 0.5;
  // const advancePrice = advanceBase + (advanceBase * 5) / 100; // 15000 + GST

  const policies = {
    "Privacy Policy": <PrivacyPolicy />,
    "Terms & Conditions": <Terms />,
    "Refund Policy": <RefundPolicy />,
    "Cookie Policy": <CookiePolicy />,
  };

  const handleProceedToPayment = async () => {
  if (!agreed) {
    alert("Please accept the terms and conditions to proceed");
    return;
  }

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

    const AmountforPayment = paymentAmount + paymentAmount*0.05

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


            {/* Payment Type Selection */}
            {/* <Card className="shadow-sm mb-4">
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
            </Card> */}


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
            <Card className="shadow-sm vh-100 d-flex flex-column">
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
                  : `Pay ₹${getCurrentPaymentAmount().toLocaleString()}/- ${paymentType === 'advance' ? '(Advance)' : '(Full Payment)'}`
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

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        contentClassName="rounded-3 shadow-lg border-0"
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            background: "linear-gradient(135deg, #c34153, #a51d34)",
            color: "#fff",
          }}
        >
          <Modal.Title className="fw-bold fs-5 text-white p-3">
            🎉 Registration Successful!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3 pb-1 px-4 text-center">
          <h5 className="fw-bold mb-3" style={{ color: "#a51d34" }}>
            Welcome to Techsterker
          </h5>
          <p className="text-muted mb-3">
            Your payment has been processed successfully and your course registration is complete.
          </p>
          <div className="alert alert-light border-0" style={{ backgroundColor: "#f8f9fa" }}>
            <small className="text-muted">
              📧 Confirmation email sent to: <strong>{formData.email}</strong><br />
              {/* 📱 SMS confirmation sent to: <strong>{formData.mobile}</strong> */}
            </small>
          </div>
          {paymentType === "advance" && (
            <div className="alert alert-warning">
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
              navigate("/"); // redirect to homepage
            }}
            className="px-4 py-2 rounded-pill fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #c34153, #a51d34)",
              border: "none",
            }}
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