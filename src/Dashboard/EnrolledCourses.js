import React from "react";
import { Col, Card, Badge, Button } from "react-bootstrap";

const EnrolledCourses = ({ enrollmentsLoading, enrolledCourses, navigate }) => {
  // Function to calculate progress percentage based on start date and duration
  const calculateProgress = (startDate, duration) => {
    const start = new Date(startDate);
    const now = new Date();
    const totalWeeks = parseInt(duration) || 12; // Default to 12 weeks if not available
    const elapsedWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));

    if (elapsedWeeks <= 0) return 0;
    if (elapsedWeeks >= totalWeeks) return 100;

    return Math.min(100, Math.max(0, Math.round((elapsedWeeks / totalWeeks) * 100)));
  };

  // Function to determine course status based on progress
  const getCourseStatus = (progress, startDate) => {
    const start = new Date(startDate);
    const now = new Date();

    if (now < start) return "Upcoming";
    if (progress >= 100) return "Completed";
    return "Ongoing";
  };

  return (
    <Col xl={6} lg={6} md={6} className="mb-4">
      <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#e8f5e9' }}>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-success p-2 rounded me-3">
              <i className="bi bi-journal-bookmark text-white fs-4"></i>
            </div>
            <Card.Title className="h5 fw-semibold text-success mb-0">Enrolled Courses</Card.Title>
          </div>
          {enrollmentsLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="row g-3">
              {enrolledCourses.map((course, idx) => {
                const progress = calculateProgress(course.startDate, course.duration);
                const status = getCourseStatus(progress, course.startDate);

                return (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" key={idx}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <p className="text-dark fw-medium mb-0">{course.courseId.name}</p>
                          <Badge bg={status === "Completed" ? "success" : status === "Ongoing" ? "primary" : "info"} className="px-2">
                            {status}
                          </Badge>
                        </div>
                        <p className="text-secondary small mb-2">Batch: {course.batchName}</p>
                        {status !== "Upcoming" && (
                          <>
                            <div className="progress mb-2" style={{ height: "8px" }}>
                              <div className={`progress-bar ${status === "Completed" ? "bg-success" : "bg-primary"}`}
                                role="progressbar" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-secondary small mb-0">{progress}% completed</p>
                          </>
                        )}
                        {status === "Upcoming" && (
                          <p className="text-secondary small mb-0">
                            Starting on {new Date(course.startDate).toLocaleDateString()}
                          </p>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No courses enrolled yet.</p>
              <Button variant="success" onClick={() => navigate("/courses")}>
                Browse Courses
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EnrolledCourses;