import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Spinner,
  Card,
  Container,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";

const Acknowledge = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [acknowledgedCourses, setAcknowledgedCourses] = useState([]);
  const [generatedOtp, setGeneratedOtp] = useState(""); // store dummy OTP

  const Student = JSON.parse(sessionStorage.getItem("user") || "{}");
  const UserId = Student.id;

  // Fetch enrolled courses from API
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(
          `http://31.97.206.144:5001/api/user/${UserId}/enrollments`
        );
        if (res.data.success) {
          const options = res.data.enrolledCourses.map((enroll) => ({
            value: enroll.courseId._id,
            label: `${enroll.courseId.name} (Batch: ${enroll.batchName})`,
            batchName: enroll.batchName,
          }));
          setCourses(options);
          setMobile(res.data.user.phoneNumber || "");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to fetch courses", "error");
      }
    };
    fetchEnrollments();
  }, [UserId]);

  // Dummy Send OTP
  const handleSendOtp = () => {
    if (!mobile || mobile.length !== 10) {
      Swal.fire(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number",
        "warning"
      );
      return;
    }
    if (!selectedCourse) {
      Swal.fire(
        "Select Course",
        "Please select a course to acknowledge",
        "warning"
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate 6-digit OTP
      setGeneratedOtp(otp);
      setOtpSent(true);
      setLoading(false);
      Swal.fire("OTP Sent", `Dummy OTP is: ${otp}`, "info"); // show OTP for testing
    }, 1000);
  };

  // Dummy Verify OTP
  const handleVerifyOtp = () => {
    if (!otp) {
      Swal.fire("Missing OTP", "Please enter the OTP", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (otp === generatedOtp) {
        Swal.fire(
          "Acknowledged",
          `${selectedCourse.label} has been acknowledged successfully!`,
          "success"
        );

        setAcknowledgedCourses((prev) => [
          ...prev,
          {
            id: selectedCourse.value,
            name: selectedCourse.label,
            batch: selectedCourse.batchName,
            acknowledgedOn: new Date().toLocaleString(),
          },
        ]);

        // Reset form
        setMobile("");
        setOtp("");
        setOtpSent(false);
        setSelectedCourse(null);
        setGeneratedOtp("");
      } else {
        Swal.fire("Invalid OTP", "Please check the OTP and try again", "error");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body className="p-4">
              <h4 className="fw-bold text-center mb-4">
                Course Completion Acknowledgement
              </h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Select Course</Form.Label>
                  <Select
                    options={courses}
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    placeholder="Search & select course..."
                    isSearchable
                  />
                </Form.Group>

                {!otpSent ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your 10-digit mobile number"
                        value={mobile}
                        onChange={(e) =>
                          setMobile(e.target.value.replace(/\D/, ""))
                        }
                        maxLength={10}
                      />
                    </Form.Group>
                    <button
                      className="btn btn-lg bg-meroon w-100"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the OTP received on your mobile"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/, ""))
                        }
                        maxLength={6}
                      />
                    </Form.Group>
                    <button
                      className="btn btn-lg bg-meroon w-100"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Verify & Submit Acknowledgement"
                      )}
                    </button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>

          {/* Acknowledged Courses List */}
          {/* Acknowledged Courses List */}
          {acknowledgedCourses.length > 0 && (
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                <h5 className="fw-bold mb-3">Acknowledged Courses</h5>
                <Row>
                  {acknowledgedCourses.map((course, idx) => (
                    <Col key={idx} md={6} lg={6} className="mb-3">
                      <Card className="border-0 shadow-sm rounded-3 h-100">
                        <Card.Body>
                          <h6 className="mb-2">{course.name}</h6>
                          <p className="mb-1">
                            <strong>Batch:</strong> {course.batch}
                          </p>
                          <p className="mb-1">
                            <strong>Acknowledged On:</strong> {course.acknowledgedOn}
                          </p>
                          <Badge bg="danger">Acknowledged</Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}

        </Col>
      </Row>
    </Container>
  );
};

export default Acknowledge;
