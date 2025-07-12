import React, { useState } from 'react';
import CourseEnquiryModal from './EnrollModal';

const CourseAndFeatures = () => {
  // Optional: add styles inline for reusability
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
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  return (
    <>
      <div>
        {/* ===== Course Section ===== */}
        <div className="container py-5 mt-5">
          <div className="row justify-content-center align-items-center">
            {/* Left - Students */}
            <div className="col-md-5 text-center mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '280px',
                  height: '280px',
                  background: 'conic-gradient(#9c27b0, #673ab7, #3f51b5)',
                  padding: '12px',
                }}
              >
                <img
                  src="https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4="
                  alt="Student"
                  className="img-fluid rounded-circle"
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'cover',
                    border: '6px solid #fff',
                  }}
                />
              </div>
              <h4>
                <span className="text-success fw-bold">Courses</span>{' '}
                <span className="text-warning fw-bold">for Students</span>
              </h4>
            </div>

            {/* Right - Professionals */}
            <div className="col-md-5 text-center mb-4">
              <h4>
                <span className="text-warning fw-bold">Courses</span>{' '}
                <span className="text-success fw-bold">for Professionals</span>
              </h4>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mt-3"
                style={{
                  width: '280px',
                  height: '280px',
                  background: 'conic-gradient(#03a9f4, #3f51b5, #ff5722)',
                  padding: '12px',
                }}
              >
                <img
                  src="https://aofoto.pl/wp-content/uploads/2022/06/03-professional-headshot.jpg"
                  alt="Professional"
                  className="img-fluid rounded-circle"
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'cover',
                    border: '6px solid #fff',
                  }}
                />
              </div>
            </div>

            {/* Enroll Now Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-lg fw-bold px-5 py-3 text-white"
                style={{
                  backgroundColor: '#9c27b0',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}
                onClick={()=> setShowEnquiryModal(true)}
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
      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
    </>
  );
};

export default CourseAndFeatures;
