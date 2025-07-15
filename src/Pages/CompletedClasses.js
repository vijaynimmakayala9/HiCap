import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import { MoveRight } from 'lucide-react';

const CompletedCourses = () => {
  const navigate = useNavigate();

  const completedCourses = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
      duration: '6 Months',
      lessons: 12,
      students: 300,
    },
    {
      id: 'web-dev',
      name: 'Web Development',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
      duration: '4 Months',
      lessons: 10,
      students: 250,
    },
  ];

  const handleStartLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="container py-5 mt-4">
      <div className="mb-4">
        <h1 className="fw-bold text-dark">Completed Courses</h1>
        <div className="bg-success rounded-pill" style={{ width: '216px', height: '3px' }}></div>
      </div>

      {completedCourses.length === 0 ? (
        <p className="text-center">You haven’t completed any courses yet.</p>
      ) : (
        <div className="row g-4">
          {completedCourses.map((course) => (
            <div key={course.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-1 rounded-3">
                <img
                  src={course.image}
                  alt={course.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title fw-semibold">{course.name}</h5>

                  <div className="d-flex justify-content-between text-muted small my-3">
                    <div className="d-flex align-items-center gap-1">
                      <FaRegClock />
                      <span>{course.duration}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaBook />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaUserGraduate />
                      <span>{course.students}+ Students</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartLearning(course.id)}
                    className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
                    style={{ borderRadius: '5px', height: '45px' }}
                  >
                    Start Learning <MoveRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CompletedCourses;
