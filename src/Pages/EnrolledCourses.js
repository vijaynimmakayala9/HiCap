import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import { MoveRight } from 'lucide-react';

const EnrolledCourses = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const id = user?.id;
    console.log(id)

    if (!id) {
      setError('User ID not found in session.');
      setLoading(false);
      return;
    }

    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`https://hicap-backend-4rat.onrender.com/api/enrollments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch enrolled courses');
        }

        const result = await response.json();
        const data = result?.data;

        if (!data) {
          setEnrolledCourses([]);
        } else if (Array.isArray(data)) {
          setEnrolledCourses(data);
        } else {
          setEnrolledCourses([data]); // Wrap single object in array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleStartLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>;
  }

  return (
    <section className="container py-5 mt-4">
      <div className="mb-4">
        <h1 className="fw-bold text-dark">Enrolled Courses</h1>
        <div className="bg-success rounded-pill" style={{ width: '216px', height: '3px' }}></div>
      </div>

      {enrolledCourses.length === 0 ? (
        <p className="text-center">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="row g-4">
          {enrolledCourses.map((enrollment) => {
            const course = enrollment.course;

            return (
              <div key={enrollment._id} className="col-12 col-sm-6 col-lg-4">
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
                        <span>{course.noOfLessons || 0} Lessons</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FaUserGraduate />
                        <span>{course.noOfStudents || 0} Students</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartLearning(course._id)}
                      className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
                      style={{ borderRadius: '5px', height: '45px' }}
                    >
                      Start Learning <MoveRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default EnrolledCourses;
