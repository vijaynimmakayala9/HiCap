import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "../Pages/Footer";

const OurPolicies = () => {
    const [selectedPolicy, setSelectedPolicy] = useState("Privacy Policy");
    const [agreed, setAgreed] = useState(false);

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

    const handleProceed = () => {
        if (agreed) {
            alert("✅ Proceeding to payment...");
            // You can redirect user to checkout page here (e.g., navigate("/checkout"))
        }
    };

    return (
        <>
            <Header />
            <Container className="mb-3 main-content">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="text-center mb-4">Our Policies</h2>

                        {/* Dropdown */}
                        <Form.Group controlId="policySelect" className="mb-4">
                            <Form.Label>View a Policy</Form.Label>
                            <Form.Select
                                value={selectedPolicy}
                                onChange={(e) => setSelectedPolicy(e.target.value)}
                            >
                                <option value="">-- Select Policy --</option>
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
                                By selecting this, you acknowledge that you've read and agree to our{" "}
                                <a href="/terms" className="text-primary text-decoration-underline">
                                    Terms & Conditions
                                </a>{" "}
                                , <br />
                                <a href="/policy" className="text-primary text-decoration-underline">
                                    Privacy & Policy
                                </a>{" "}
                                ,
                                <a href="/refund" className="text-primary text-decoration-underline">
                                    Refund Policy
                                </a>{" "}
                                ,
                                <a href="/cookie" className="text-primary text-decoration-underline">
                                    Cookie Policy.
                                </a>
                            </label>
                        </div>

                        {/* Proceed Button */}
                        <div className="text-center">
                            <button
                                className="btn btn-lg bg-meroonlight text-white w-100"
                                size="lg"
                                disabled={!agreed}
                                onClick={handleProceed}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default OurPolicies;
