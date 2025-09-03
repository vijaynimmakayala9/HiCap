import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecommendedCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [enrolledCategories, setEnrolledCategories] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;
  // Fetch enrolled courses and categories
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          `http://31.97.206.144:5001/api/enrollments/${userId}`
        );

        const enrollments = response.data.data || [];
        const enrolled = enrollments.map((en) => en.course).filter(Boolean);
        const categories = enrolled.map((c) => c.category).filter(Boolean);

        setEnrolledCourses(enrolled);
        setEnrolledCategories([...new Set(categories)]);
      } catch (err) {
        console.error('Error fetching enrollments:', err);
      }
    };

    fetchEnrollments();
  }, [userId]);

  // Fetch recommended courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://31.97.206.144:5001/api/courses');
        const allCourses = res.data.data;

        const filtered = allCourses.filter(
          (course) =>
            enrolledCategories.includes(course.category) &&
            !enrolledCourses.find((ec) => ec._id === course._id)
        );

        setRecommendedCourses(filtered.slice(0, 5));
      } catch (err) {
        console.error('Error fetching recommended courses:', err);
      }
    };

    if (enrolledCategories.length > 0) {
      fetchCourses();
    }
  }, [enrolledCategories, enrolledCourses]);

  const handleViewAllClick = () => {
    navigate('/courses');
  };

  return (
    <div className="container py-5 mt-4">
      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <>
          <h2 className="fw-bold mb-3" style={{ color: '#800000' }}>
            Recommended Courses
          </h2>
          {/* <div
            className="rounded-pill mb-4"
            style={{ width: '200px', height: '3px', backgroundColor: '#800000' }}
          ></div> */}

          <div className="row g-4 mb-5">
            {enrolledCourses.map((course, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-1 rounded-3">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold text-dark">{course.name}</h5>
                    <div className="d-flex justify-content-between text-muted small my-2 flex-wrap">
                      <div className="d-flex align-items-center gap-1">
                        <FaRegClock className="me-1" />
                        <span>{course.duration} Months</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FaTasks className="me-1" />
                        <span>{course.noOfLessons} Lessons</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FaStar className="me-1 text-warning" />
                        <span>{course.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-secondary small">{course.description}</p>
                    <button
                      className="btn mt-auto text-white"
                      style={{
                        backgroundColor: '#800000',
                        borderRadius: '5px',
                        height: '40px',
                        fontWeight: '600'
                      }}
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <>
          <h2 className="fw-bold mb-3" style={{ color: '#800000' }}>
            Recommended Courses
          </h2>
          <div
            className="rounded-pill mb-4"
            style={{ width: '240px', height: '3px', backgroundColor: '#800000' }}
          ></div>

          <div className="row g-4">
            {recommendedCourses.map((course, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-1 rounded-3">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold text-dark">{course.name}</h5>
                    <div className="d-flex justify-content-between text-muted small my-2 flex-wrap">
                      <div className="d-flex align-items-center gap-1">
                        <FaRegClock className="me-1" />
                        <span>{course.duration} Months</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FaTasks className="me-1" />
                        <span>{course.noOfLessons} Lessons</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FaStar className="me-1 text-warning" />
                        <span>{course.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-secondary small">{course.description}</p>
                    <button
                      className="btn mt-auto text-white"
                      style={{
                        backgroundColor: '#800000',
                        borderRadius: '5px',
                        height: '40px',
                        fontWeight: '600'
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleViewAllClick}
              className="btn px-4 py-2 fw-semibold text-white"
              style={{ backgroundColor: '#800000', borderRadius: '5px' }}
            >
              View All Courses
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedCourses;