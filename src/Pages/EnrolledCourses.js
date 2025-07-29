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
    axios
      .get(`https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`)
      .then((res) => {
        if (res.data.success) {
          const filtered = res.data.data.filter((item) => item.status === 'enrolled');
          setEnrolledCourses(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
    <div className="container mt-5 enrolled-courses">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0 d-flex align-items-center">
          <FaBook className="me-2 text-primary" />Enrolled Courses
          
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
      ) : enrolledCourses.length === 0 ? (
        <div className="alert alert-info">No enrolled courses found.</div>
      ) : (
        <div className="row">
          {visibleCourses.map(({ _id, course, createdAt }) => (
            <div className="col-12 col-sm-12 col-md-4 mb-4" key={_id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text text-muted">{course.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">Enrolled</span>
                    <small className="text-muted">
                      {new Date(createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button className="btn btn-md btn-primary w-100" >{/* onClick={()=>Navigate('/dashboard/courseModule')} */}
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
