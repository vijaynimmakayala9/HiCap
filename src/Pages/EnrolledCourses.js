import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // First, get the enrollment data for the user
        const response = await axios.get(
          `https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`
        );

        if (response.data.success) {
          // The API directly returns course objects in the data array
          const filteredCourses = response.data.data
            .filter(item => item.status === 'enrolled')
            .map(item => ({
              ...item.course,
              enrollmentDate: item.createdAt,
              enrollmentId: item._id
            }));

          setEnrolledCourses(filteredCourses);
        }
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEnrolledCourses();
    }
  }, [userId]);

  const nextSlide = () => {
    if (enrolledCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= enrolledCourses.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    if (enrolledCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(enrolledCourses.length - 3, 0) : prevIndex - 3
    );
  };

  const visibleCourses = enrolledCourses.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container mt-5 enrolled-courses p-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 d-flex align-items-center">
          <FaBook className="me-2 textcolor" />
          Enrolled Courses
        </h3>
        {enrolledCourses.length > 3 && (
          <div>
            <button className="btn btn-outline-secondary me-2" onClick={prevSlide}>
              <FaArrowLeft />
            </button>
            <button className="btn btn-outline-secondary" onClick={nextSlide}>
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border textcolor" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="alert alert-info">No enrolled courses found.</div>
      ) : (
        <div className="row">
          {visibleCourses.map((course) => (
            <div className="col-12 col-sm-12 col-md-4 mb-4" key={course._id}>
              <div className="card h-100 shadow">
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x180?text=Course+Image';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.name}</h5>
                  <div className="d-flex mb-2">
                    <span className="badge bg-info me-2">{course.category}</span>
                    <span className="badge bg-secondary">{course.duration} months</span>
                  </div>
                  <p className="card-text text-muted">
                    {course.description.length > 100 
                      ? `${course.description.substring(0, 100)}...` 
                      : course.description}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="badge bg-meroonlight text-white">Enrolled</span>
                    <small className="text-muted">
                      {new Date(course.enrollmentDate).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-footer border-top-0">
                  <button 
                    className="btn btn-md bg-meroon w-100"
                    onClick={() => {
                      window.location.href = `/course/${course._id}`;
                    }}
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .textcolor {
          color: #ad2132;
        }
        .bg-meroon {
          background-color: #ad2132;
          color: white;
          border: none;
          transition: all 0.3s ease;
        }
        .bg-meroon:hover {
          background-color: #8a1a2a;
        }
        .bg-meroonlight {
          background-color: rgba(173, 33, 50, 0.1);
          color: #ad2132;
        }
        .enrolled-courses {
          background-color: #f9f9f9;
          border-radius: 10px;
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 10px;
          border: none;
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .card-title {
          color: #333;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .card-text {
          font-size: 0.9rem;
        }
        .btn-outline-secondary {
          border-color: #ad2132;
          color: #ad2132;
          transition: all 0.3s ease;
        }
        .btn-outline-secondary:hover {
          background-color: #ad2132;
          color: white;
        }
        .badge {
          font-weight: 500;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default EnrolledCourses;