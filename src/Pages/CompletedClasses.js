import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaCertificate,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompletedCourses = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    axios
      .get(`https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`)
      .then((res) => {
        if (res.data.success) {
          const filtered = res.data.data.filter(
            (item) => item.status === 'completed'
          );
          setCompletedCourses(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const nextSlide = () => {
    if (completedCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= completedCourses.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    if (completedCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(completedCourses.length - 3, 0) : prevIndex - 3
    );
  };

  const visibleCourses = completedCourses.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container mt-5 completed-courses">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 d-flex align-items-center">
          <FaCertificate className="me-2 text-primary" /> Completed Courses
        </h3>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className="btn btn-outline-secondary" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : completedCourses.length === 0 ? (
        <div className="alert alert-info">No completed courses found.</div>
      ) : (
        <div className="row">
          {visibleCourses.map(({ _id, course, updatedAt }) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={_id}>
              <div className="card h-100 shadow-sm d-flex flex-column">
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">{course.name}</h5>
                  <p className="card-text text-muted small flex-grow-1" style={{ minHeight: '60px' }}>
                    {course.description}
                  </p>

                  <div className="rating mb-2 d-flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(course.rating) ? 'text-warning' : 'text-secondary'
                        }
                      />
                    ))}
                    <small className="text-muted ms-2">({course.reviewCount})</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-success">Completed</span>
                    <small className="text-muted">
                      {new Date(updatedAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>

                <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                  <button className="btn btn-md btn-primary">Certificate</button>
                  <button className="btn btn-md btn-outline-primary">View</button>
                </div>
              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedCourses;
