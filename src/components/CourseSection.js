import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseEnquiryModal from './EnrollModal';

const CourseAndFeatures = () => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [courseData, setCourseData] = useState([]);

  const cardHoverStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/home');
        setCourseData(res.data.data || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div>
        {/* ===== Course Section ===== */}
        <div className="container py-5 mt-5">
          <div className="row justify-content-center align-items-center">
            {courseData.map((course, index) => (
              <div className="col-md-5 text-center mb-4" key={course._id}>
                {index === 0 ? (
                  <>
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: '300px',
                        height: '300px',
                        background: 'conic-gradient(#9c27b0, #673ab7, #3f51b5)',
                        padding: '12px',
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.name}
                        className="img-fluid rounded-circle"
                        style={{
                          width: '260px',
                          height: '260px',
                          objectFit: 'cover',
                          border: '6px solid #fff',
                        }}
                      />
                    </div>
                    <h4>
                      <span className="text-success fw-bold">Courses</span><br />
                      <span className="text-warning fw-bold">{course.name}</span>
                    </h4>
                  </>
                ) : (
                  <>
                    <h4>
                      <span className="text-warning fw-bold">Courses</span><br />
                      <span className="text-success fw-bold">{course.name}</span>
                    </h4>
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mt-3"
                      style={{
                        width: '300px',
                        height: '300px',
                        background: 'conic-gradient(#03a9f4, #3f51b5, #ff5722)',
                        padding: '12px',
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.name}
                        className="img-fluid rounded-circle"
                        style={{
                          width: '260px',
                          height: '260px',
                          objectFit: 'cover',
                          border: '6px solid #fff',
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Enroll Now Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-lg fw-bold px-5 py-3 text-white"
                style={{
                  backgroundColor: '#9c27b0',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => setShowEnquiryModal(true)}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#7b1fa2')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#9c27b0')}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* ===== Feature Cards Section ===== */}
        <div className="container py-5">
          <div className="row text-center">
            {/* Practical Training */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={cardHoverStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-tools fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title fw-bold">Practical Training</h5>
                  <p className="card-text">
                    Hands-on experience with real-world tools and projects to build job-ready skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Simulations */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={cardHoverStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-cpu fs-1 text-success"></i>
                  </div>
                  <h5 className="card-title fw-bold">Best Simulations</h5>
                  <p className="card-text">
                    Industry-grade simulations that mirror actual job environments for better learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Placement Assistance */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={cardHoverStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-briefcase-fill fs-1 text-warning"></i>
                  </div>
                  <h5 className="card-title fw-bold">Placement Assistance</h5>
                  <p className="card-text">
                    Resume building, mock interviews, and job referral support to launch your career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
    </>
  );
};

export default CourseAndFeatures;
