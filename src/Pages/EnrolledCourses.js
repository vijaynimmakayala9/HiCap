import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import { MoveRight } from 'lucide-react';

const EnrolledCourses = () => {
  const navigate = useNavigate();
  
  // State to hold enrolled courses and loading state
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

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
        setEnrolledCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []); // Only run once when the component mounts

  const handleStartLearning = (courseId) => {
    // Navigate to the course detail page
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full px-6 md:px-[60px] py-20 pt-0 mt-10">
      {/* Heading */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">Enrolled Courses</h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Course Cards - Flex aligned left */}
      {enrolledCourses.length === 0 ? (
        <p className="text-center">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="flex flex-wrap gap-10 justify-start ml-0">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              style={{
                width: '387px',
                height: '450px',
                border: '1px solid #0000004D',
                boxShadow: '0px 4px 10px 0px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
              }}
            >
              <img
                src={course.courseId.image}
                alt={course.courseId.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />

              <div style={{ padding: '16px 20px' }}>
                <h2 className="font-roboto font-semibold text-[20px] text-black mb-4">
                  {course.courseId.name}
                </h2>

                <div className="flex justify-between mb-6 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaRegClock />
                    <span>{course.courseId.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBook />
                    <span>{course.courseId.liveProjects} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUserGraduate />
                    <span>{course.courseId.rating} Students</span>
                  </div>
                </div>

                <div
                  onClick={() => handleStartLearning(course.courseId._id)}
                  style={{
                    width: '185px',
                    height: '50px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: '#007860',
                    color: 'white',
                    fontWeight: '600',
                    fontFamily: 'Roboto, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Start Learning</span>
                  <MoveRight size={20} />
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
