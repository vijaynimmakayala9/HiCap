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

const OurPolicies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState("Privacy Policy");
  const [agreed, setAgreed] = useState(false);

  // OTP Modal States
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // ✅ Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get formId and mobile from navigation state
  const location = useLocation();
  const navigate = useNavigate();
  const { formId, mobile } = location.state || {};

  const studentId = formId;

  const policies = {
    "Privacy Policy": `
      At Our Company, we are committed to protecting your personal information and your right to privacy. 
      This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
      
      - We may collect your name, email, phone number, payment details, and course preferences.  
      - Your data is used only for account creation, order processing, and personalized learning experiences.  
      - We do not share your personal details with third-party advertisers.  
      - You have the right to request access, update, or deletion of your personal information.  
      
      By using our services, you agree to the practices described in this Privacy Policy.
    `,
    "Terms & Conditions": `
      Welcome to Our Company! These Terms & Conditions govern your use of our website, courses, and services.  
      
      - You must provide accurate details when registering on our platform.  
      - Any misuse, fraudulent activity, or violation of intellectual property rights will lead to account termination.  
      - Payments made are subject to our refund policy.  
      - We reserve the right to update these terms at any time.  
      
      By accessing or using our services, you agree to abide by these Terms & Conditions in full.
    `,
    "Refund Policy": `
      We aim to provide the best learning experience. However, if you are not satisfied with your purchase, you may request a refund under the following conditions:  
      
      - Refund requests must be made within 7 days of purchase.  
      - If more than 30% of the course content has been accessed, a refund will not be issued.  
      - Refunds are not available for promotional or discounted purchases.  
      - Approved refunds will be credited back to your original payment method within 5-10 business days.  
      
      Please contact our support team to initiate a refund request.
    `,
    "Cookie Policy": `
      Our website uses cookies to improve your browsing experience. By continuing to use our site, you consent to our use of cookies.  
      
      - Cookies help us remember your preferences and personalize your content.  
      - Analytical cookies allow us to track website traffic and improve performance.  
      - Advertising cookies may be used to display relevant ads.  
      - You can disable cookies in your browser settings, but some features may not function properly.  
      
      By using our services, you agree to the practices outlined in this Cookie Policy.
    `,
  };

  // Generate OTP API
  const handleProceed = async () => {
    if (!agreed) return;
    if (!formId || !mobile) {
      alert("Form data is missing. Please go back and try again.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `http://31.97.206.144:5001/api/generate/${formId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }),
        }
      );
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setToken(data.token);
        setShowModal(true);
      } else {
        alert("Failed to generate OTP");
      }
    } catch (error) {
      setLoading(false);
      console.error("OTP Generate Error:", error);
      alert("Something went wrong!");
    }
  };

  // Verify OTP API
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://31.97.206.144:5001/api/verify/${formId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, token }),
        }
      );
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setVerificationMessage("✅ OTP Verified! Proceeding to Payment...");
        setTimeout(() => {
          setShowModal(false);
          handlePayment(); // open Razorpay after OTP success
        }, 1500);
      } else {
        setVerificationMessage("❌ Invalid OTP, please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("OTP Verify Error:", error);
      setVerificationMessage("⚠️ Verification failed. Try again.");
    }
  };

  // Razorpay Payment
  const handlePayment = async () => {
    try {
      const res = await fetch(
        "http://31.97.206.144:5001/api/payment-create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId }),
        }
      );
      const data = await res.json();

      if (!data.success) {
        alert("Payment initiation failed");
        return;
      }

      const { orderId, amount, currency, courseName } = data.data;

      const options = {
        key: "rzp_test_RHlt1aNxIRxsUa", // replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "Our Company",
        description: courseName,
        order_id: orderId,
        handler: function (response) {
          console.log("Payment Successful! Payment ID:", response.razorpay_payment_id);

          // ✅ Show success modal instead of alert
          setShowSuccessModal(true);
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: mobile,
        },
        notes: {
          formId: formId,
        },
        theme: {
          color: "#8A1538", // your theme color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with payment!");
    }
  };

  return (
    <>
      <Header />
      <Container className="mb-3 main-content">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center textcolor mb-4">Our Policies</h2>

            {/* Dropdown */}
            <Form.Group controlId="policySelect" className="mb-4">
              <Form.Label>View a Policy</Form.Label>
              <Form.Select
                value={selectedPolicy}
                onChange={(e) => setSelectedPolicy(e.target.value)}
              >
                <option value="" disabled>
                  -- Select Policy --
                </option>
                {Object.keys(policies).map((policy, idx) => (
                  <option key={idx} value={policy}>
                    {policy}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Show Selected Policy */}
            {selectedPolicy && (
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>{selectedPolicy}</Card.Title>
                  <Card.Text style={{ whiteSpace: "pre-line" }}>
                    {policies[selectedPolicy]}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-2 mb-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="terms" className="text-muted small">
                By selecting this, you acknowledge that you've read and agree to
                our{" "}
                <a
                  href="/terms"
                  className="text-primary text-decoration-underline"
                >
                  Terms & Conditions
                </a>
                , <br />
                <a
                  href="/policy"
                  className="text-primary text-decoration-underline"
                >
                  Privacy & Policy
                </a>
                ,{" "}
                <a
                  href="/refund"
                  className="text-primary text-decoration-underline"
                >
                  Refund Policy
                </a>
                ,{" "}
                <a
                  href="/cookie"
                  className="text-primary text-decoration-underline"
                >
                  Cookie Policy
                </a>
                .
              </label>
            </div>

            {/* Proceed Button */}
            <div className="text-center">
              <button
                className="btn btn-lg bg-meroonlight text-white w-100"
                size="lg"
                disabled={!agreed || loading || !formId || !mobile}
                onClick={handleProceed}
              >
                {loading ? "Please wait..." : "Proceed to OTP Verification"}
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* OTP Verification Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        contentClassName="rounded-3 shadow-lg border-0"
      >
        {/* Header */}
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            background: "linear-gradient(135deg, #a51d34, #d32f2f)",
            color: "#fff",
          }}
        >
          <Modal.Title className="fw-bold fs-5 text-white p-3">
            OTP Verification
          </Modal.Title>
        </Modal.Header>

        {/* Body */}
        <Modal.Body className="pt-3 pb-1 px-4">
          <p className="text-muted mb-3">
            Enter the OTP sent to your mobile number{" "}
            <span className="fw-semibold text-dark">({mobile})</span>
          </p>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-3 py-2 fs-6 text-center"
            style={{ borderRadius: "10px", border: "1px solid #a51d34" }}
          />
          {verificationMessage && (
            <p className="text-center text-secondary small fw-medium">
              {verificationMessage}
            </p>
          )}
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button
            variant="outline-danger"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-pill fw-semibold"
          >
            Cancel
          </Button>
          <Button
            disabled={loading || otp.length === 0}
            onClick={handleVerifyOtp}
            className="px-4 py-2 rounded-pill fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #a51d34, #d32f2f)",
              border: "none",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Payment Success Modal */}
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
            🎉 Congratulations!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3 pb-1 px-4 text-center">
          <h5 className="fw-bold textcolor mb-3">Payment Successful</h5>
          <p className="text-muted">
            Thank you for your payment. An invoice has been sent to your
            registered email. Please check your inbox.
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/"); // redirect to homepage or dashboard
            }}
            className="px-4 py-2 rounded-pill fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #c34153, #a51d34)",
              border: "none",
            }}
          >
            Go to HomePage
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default OurPolicies;
