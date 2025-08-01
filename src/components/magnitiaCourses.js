import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MagnitiaCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const containerStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleHover = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    } else {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const imageStyle = {
    width: '80%', // Reduced image size
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/courses');
        setCourses(res.data.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container pt-5">
      {courses.map((course, index) => (
        <div
          className="row g-4 align-items-center mb-5"
          key={course._id}
        >
          {/* Text Block */}
          <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-2' : ''}`}>
            <div className="px-3">
              <h5 className="textcolor">
                {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </h5>
              <h3 className="fw-bold text-uppercase">
                <span style={{ color: '#000' }}>{course.title}</span>{' '}
                <span className="" style={{ color: '#ad2132' }}>Techsterker</span>
              </h3>
              <p className="mt-3 text-muted">{course.content}</p>
              <button
                className="btn gradient-button mt-3 fw-bold px-4 py-2 rounded-pill"
                onClick={() => navigate('/courses')}
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* Image Block */}
          <div className={`col-lg-6 text-center ${index % 2 === 1 ? 'order-lg-1' : ''}`}>
            <div
              style={containerStyle}
              className="rounded"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="img-fluid"
                style={imageStyle}
              />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default MagnitiaCourses;
