import React from "react";
import { Col, Card, Badge, Button } from "react-bootstrap";

const RegisteredCourses = ({ coursesLoading, registeredCourses, navigate }) => {
  const calculateProgress = (startDate, duration) => {
    if (!startDate) return 0;
    
    const start = new Date(startDate);
    const now = new Date();
    // Extract number from duration string (e.g., "14 weeks" -> 14)
    const totalWeeks = parseInt(duration) || 12;
    const elapsedWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));

    if (elapsedWeeks <= 0) return 0;
    if (elapsedWeeks >= totalWeeks) return 100;

    return Math.min(100, Math.max(0, Math.round((elapsedWeeks / totalWeeks) * 100)));
  };

  const getCourseStatus = (progress, startDate) => {
    if (!startDate) return "Unknown";
    
    const start = new Date(startDate);
    const now = new Date();

    if (now < start) return "Upcoming";
    if (progress >= 100) return "Completed";
    return "Ongoing";
  };

  // Handle the case where registeredCourses might be an object instead of array
  const coursesArray = Array.isArray(registeredCourses) 
    ? registeredCourses 
    : registeredCourses ? [registeredCourses] : [];

  return (
    <Col xl={6} lg={6} md={6} className="mb-4">
      <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: "#fff3e0" }}>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-warning p-2 rounded me-3">
              <i className="bi bi-journal-bookmark text-white fs-4"></i>
            </div>
            <Card.Title className="h5 fw-semibold text-warning mb-0">
              Registered Courses
            </Card.Title>
          </div>

          {coursesLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : coursesArray.length > 0 ? (
            <div className="row g-3">
              {coursesArray.map((course, idx) => {
                // Handle both array and object structures
                const courseInfo = course.courseId || course || {};
                const progress = calculateProgress(course.startDate, courseInfo.duration);
                const status = getCourseStatus(progress, course.startDate);

                return (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" key={idx}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <p className="text-dark fw-medium mb-0">{courseInfo.name || "Unnamed Course"}</p>
                          
                        </div>
                        
                        {course.batchName && (
                          <p className="text-secondary small mb-1">
                            Batch: {course.batchName}
                          </p>
                        )}
                        
                        <p className="text-secondary small mb-2">
                          Duration: {courseInfo.duration || "N/A"}
                        </p>
                        
                        {courseInfo.price && (
                          <p className="text-secondary small mb-2">
                            Lessons: {courseInfo.noOfLessons || "N/A"}
                          </p>
                        )}

                        

                        {course.startDate && (
                          <p className="text-secondary small mb-0">
                            Starting on {new Date(course.startDate).toLocaleDateString()}
                          </p>
                        )}

                        {courseInfo._id && (
                          <Button
                            variant="warning"
                            className="text-white mt-2"
                            onClick={() => navigate(`/course/${courseInfo._id}`)}
                          >
                            View Details
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No courses registered yet.</p>
              <Button
                variant="warning"
                className="text-white"
                onClick={() => navigate("/dashboard/browsecourses")}
              >
                Browse Courses
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RegisteredCourses;