import React from "react";
import { Col, Card } from "react-bootstrap";

const StudentDetails = ({ userDetailsLoading, userData, student, enrolledCourses }) => {
  // Format the joining date
  const formatJoiningDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <Col xl={6} lg={6} md={6} className="mb-4">
      <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#e3f2fd' }}>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-info p-2 rounded me-3">
              <i className="bi bi-person-circle text-white fs-4"></i>
            </div>
            <Card.Title className="h5 fw-semibold text-info mb-0">Student Details</Card.Title>
          </div>
          {userDetailsLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : userData ? (
            <div className="d-grid gap-3">
              {[
                { icon: "bi-person-badge", label: "Student ID", value: userData._id ? userData._id.slice(-8) : "N/A" },
                { icon: "bi-person", label: "Full Name", value: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || `${student.name}` },
                { icon: "bi-envelope", label: "Email", value: userData.email || "N/A" },
                { icon: "bi-telephone", label: "Phone", value: userData.phoneNumber || "N/A" },
                { icon: "bi-book", label: "Enrolled Courses", value: enrolledCourses.length },
                { icon: "bi-calendar", label: "Joining Date", value: formatJoiningDate(userData.createdAt) },
                { icon: "bi-award", label: "Status", value: "Active" }
              ].map((item, idx) => (
                <div key={idx} className="d-flex align-items-center p-2 bg-white rounded shadow-sm">
                  <div className="bg-light p-2 rounded me-3">
                    <i className={`${item.icon} text-info`}></i>
                  </div>
                  <div>
                    <p className="text-secondary small mb-0">{item.label}</p>
                    <p className="text-dark fw-medium mb-0">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">Failed to load user data.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default StudentDetails;