import React from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    title: 'Multi-Cloud DevOps',
    duration: '3 Months',
    projects: '6 Live Projects',
    rating: '4.7/5',
    image: 'https://img.freepik.com/free-vector/devops-team-concept-illustration_114360-2585.jpg',
    description:
      'AI Data Analyst Masters Training offers a comprehensive way to develop advanced data analysis and interpretation skills.',
  },
  {
    title: 'Cybersecurity Essentials',
    duration: '4 Months',
    projects: '5 Live Projects',
    rating: '4.8/5',
    image: 'https://img.freepik.com/free-vector/cyber-security-concept_23-2148532223.jpg',
    description:
      'This course builds strong foundational cybersecurity skills to protect networks and systems from threats.',
  },
  {
    title: 'Full-Stack Web Development',
    duration: '6 Months',
    projects: '8 Live Projects',
    rating: '4.9/5',
    image: 'https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg',
    description:
      'Learn front-end and back-end development to build scalable, responsive web applications.',
  },
  {
    title: 'Cloud Architecture',
    duration: '5 Months',
    projects: '7 Live Projects',
    rating: '4.7/5',
    image: 'https://img.freepik.com/free-vector/cloud-hosting-concept-illustration_114360-7280.jpg',
    description:
      'Master cloud infrastructure design and deployment for scalable business solutions.',
  },
];

const RecommendedCourses = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/courses');
  };

  // Show only first 3 courses
  const visibleCourses = courses.slice(0, 3);

  return (
    <section className="container py-5 mt-4">
      {/* Heading */}
      <div className="mb-4">
        <h1 className="fw-bold text-dark">Recommended Courses</h1>
        <div className="bg-success rounded-pill" style={{ width: '216px', height: '3px' }}></div>
      </div>

      {/* Course Cards */}
      <div className="row g-4">
        {visibleCourses.map((course, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-1 rounded-3">
              <img
                src={course.image}
                alt={course.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title fw-semibold">{course.title}</h5>

                {/* Meta */}
                <div className="d-flex justify-content-between text-muted small my-3 flex-wrap">
                  <div className="d-flex align-items-center gap-1">
                    <FaRegClock className="me-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <FaTasks className="me-1" />
                    <span>{course.projects}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <FaStar className="me-1 text-warning" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <p className="card-text small text-secondary">{course.description}</p>

                <button
                  className="btn btn-primary mt-auto"
                  style={{ borderRadius: '5px', height: '40px', fontWeight: '600' }}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleViewAllClick}
          className="btn btn-outline-primary px-4 py-2 fw-semibold"
          style={{ borderRadius: '5px' }}
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default RecommendedCourses;
