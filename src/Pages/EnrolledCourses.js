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
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('User ID not found!');
      setLoading(false);
      return;
    }

    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`https://hicapbackend.onrender.com/api/users/myenrolledcourses/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch enrolled courses');
        }

        const data = await response.json();

        // Mock courses with valid image URLs
        const mockCourses = [
          {
            _id: 'mock1',
            courseId: {
              _id: 'mock1',
              name: 'Advanced React & Redux',
              image: 'https://miro.medium.com/v2/resize:fit:1400/1*LrY41S3Z5rI9Ro2Xj1h8vA.png',
              duration: '6 Weeks',
              liveProjects: 10,
              rating: 150,
            },
          },
          {
            _id: 'mock2',
            courseId: {
              _id: 'mock2',
              name: 'Full Stack Java Development',
              image: 'https://www.shutterstock.com/image-vector/full-stack-developer-concept-coding-260nw-2303766769.jpg',
              duration: '8 Weeks',
              liveProjects: 12,
              rating: 200,
            },
          },
        ];

        setEnrolledCourses([...data, ...mockCourses]);
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
        <div className="bg-success rounded-pill" style={{ width: '216px', height: '8px' }}></div>
      </div>

      {enrolledCourses.length === 0 ? (
        <p className="text-center">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="row g-4">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-1 rounded-3">
                <img
                  src={course.courseId.image}
                  alt={course.courseId.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title fw-semibold">{course.courseId.name}</h5>

                  <div className="d-flex justify-content-between text-muted small my-3">
                    <div className="d-flex align-items-center gap-1">
                      <FaRegClock />
                      <span>{course.courseId.duration}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaBook />
                      <span>{course.courseId.liveProjects} Lessons</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaUserGraduate />
                      <span>{course.courseId.rating} Students</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartLearning(course.courseId._id)}
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

export default EnrolledCourses;
