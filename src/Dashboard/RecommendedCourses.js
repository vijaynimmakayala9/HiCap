import React from "react";
import { Col, Card } from "react-bootstrap";
import { FaRegClock, FaCode } from "react-icons/fa";

const RecommendedCourses = ({ loading, recommendedCourses, handleViewDetails, setSelectedCourse, setShowModal }) => {
  return (
    <Col xl={12} lg={12} md={12} className="mb-4">
      <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: "#fffde7", borderRadius: "12px" }}>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-warning p-2 rounded me-3 d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-lightbulb text-white fs-4"></i>
            </div>
            <Card.Title className="h5 fw-semibold text-warning mb-0">Recommended Courses</Card.Title>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Finding the perfect courses for you...</p>
            </div>
          ) : Array.isArray(recommendedCourses) && recommendedCourses.length > 0 ? (
            <div className="row">
              {recommendedCourses.slice(0, 4).map(
                ({ _id, name, logoImage, category, duration, mode, description }) => (
                  <div key={_id} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div className="bg-white rounded shadow-sm h-100 p-4 d-flex flex-column border border-gray-100">
                      {/* Top Section */}
                      <div className="d-flex align-items-center pb-3 border-bottom mb-3">
                        <img
                          src={logoImage}
                          alt={name}
                          className="rounded-circle me-3"
                          style={{ width: "48px", height: "48px", objectFit: "cover" }}
                        />
                        <div>
                          <h5 className="text-dark fw-semibold mb-0 text-truncate" style={{ maxWidth: "200px" }}>
                            {name}
                          </h5>
                          <p className="text-muted small mb-0">{category}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-secondary flex-grow-1" style={{ 
                        display: "-webkit-box", 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: "vertical", 
                        overflow: "hidden" 
                      }}>
                        {description}
                      </p>

                      {/* Course Details */}
                      <div className="d-flex align-items-center text-muted small my-3 flex-wrap">
                        <div className="d-flex align-items-center me-3 mb-1">
                          <FaRegClock className="me-1 text-warning" />
                          <span>{duration}</span>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <FaCode className="me-1 text-warning" />
                          <span>{mode}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-auto">
                        <button
                          className="btn btn-outline-warning flex-fill"
                          onClick={() => handleViewDetails(_id)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-warning text-white flex-fill"
                          onClick={() => {
                            setSelectedCourse(name);
                            setShowModal(true);
                          }}
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-book text-muted" style={{ fontSize: "3rem" }}></i>
              <p className="text-muted mt-2">No recommended courses available at the moment.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecommendedCourses;