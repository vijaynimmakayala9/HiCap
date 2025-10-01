import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCertificate, FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompletedCourses = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get(
          `https://api.techsterker.com/api/enrollments/${userId}`
        );

        if (response.data.success) {
          const completed = response.data.data
            .filter(item => item.status === 'completed' && item.course)
            .map(item => ({
              ...item.course,
              completionDate: item.updatedAt,
              enrollmentId: item._id
            }));

          setCompletedCourses(completed);
        }
      } catch (err) {
        console.error('Error fetching completed courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedCourses();
    }
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
    <div className="container mt-5 completed-courses p-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 d-flex align-items-center">
          <FaCertificate className="me-2 textcolor" />
          Completed Courses
        </h3>
        {completedCourses.length > 3 && (
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
      ) : completedCourses.length === 0 ? (
        <div className="alert alert-info">No completed courses found.</div>
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
                  <div className="rating my-2 d-flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(course.rating || 0)
                            ? 'text-warning'
                            : 'text-secondary'
                        }
                      />
                    ))}
                    <small className="text-muted ms-2">({course.reviewCount || 0})</small>
                  </div>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="badge bg-meroonlight text-white">Completed</span>
                    <small className="text-muted">
                      {new Date(course.completionDate).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-footer border-top-0 d-flex justify-content-between">
                  <button className="btn btn-md bg-meroon">
                    Certificate
                  </button>
                  <button 
                    className="btn btn-md btn-outline-meroon"
                    // onClick={() => {
                    //   window.location.href = `/course/${course._id}`;
                    // }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .textcolor {
          color: #a51d34;
        }
        .bg-meroon {
          background-color: #a51d34;
          color: white;
          border: none;
          transition: all 0.3s ease;
        }
        .bg-meroon:hover {
          background-color: #8a1a2a;
        }
        .btn-outline-meroon {
          border-color: #a51d34;
          color: #a51d34;
          transition: all 0.3s ease;
        }
        .btn-outline-meroon:hover {
          background-color: #a51d34;
          color: white;
        }
        .completed-courses {
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
          border-color: #a51d34;
          color: #a51d34;
          transition: all 0.3s ease;
        }
        .btn-outline-secondary:hover {
          background-color: #a51d34;
          color: white;
        }
        .badge {
          font-weight: 500;
          font-size: 0.75rem;
        }
        .rating {
          color: #ffc107;
        }
      `}</style>
    </div>
  );
};

export default CompletedCourses;