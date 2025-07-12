import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Course = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [expandedCourses, setExpandedCourses] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enrolledCourse, setEnrolledCourse] = useState(null);

    const toggleDescription = (id) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleEnrollClick = (course) => {
        setEnrolledCourse(course);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://hicapbackend.onrender.com/api/users/allcourses');
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.slice(0, 4)); // Only show first 4 courses
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
        <section className="container py-5">
            <div className="mb-4">
                <h1 className="fw-bold display-6">Popular Courses</h1>
                <div className="bg-success rounded-pill" style={{ width: '216px', height: '8px' }}></div>
            </div>

            <div className="row">
                {courses.map(({ _id, name, duration, liveProjects, rating, description, image }) => (
                    <div key={_id} className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card h-100 shadow-sm border-0 rounded-4"
                            style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <img
                                src={image}
                                className="card-img-top rounded-top-4"
                                alt={name}
                                style={{ height: '160px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-bold text-success">{name}</h5>
                                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                                    {expandedCourses[_id] ? description : `${description?.substring(0, 100)}...`}
                                </p>
                                {description?.length > 100 && (
                                    <button
                                        className="btn btn-link px-0 mb-2 text-success"
                                        style={{ fontSize: '0.85rem' }}
                                        onClick={() => toggleDescription(_id)}
                                    >
                                        {expandedCourses[_id] ? 'View Less' : 'View All'}
                                    </button>
                                )}
                                <div className="d-flex flex-wrap text-muted small mb-3">
                                    <div className="me-3 d-flex align-items-center">
                                        <FaRegClock className="me-1" /> {duration}
                                    </div>
                                    <div className="me-3 d-flex align-items-center">
                                        <FaTasks className="me-1" /> {liveProjects} Live Projects
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaStar className="me-1 text-warning" /> {rating}/5
                                    </div>
                                </div>
                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => handleEnrollClick({ title: name, duration, description, _id })}
                                >
                                    Enroll
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <button
                    className="btn btn-outline-success px-5 py-2 fw-semibold rounded-pill"
                    onClick={() => navigate('/courses')}
                >
                    View All Courses
                </button>
            </div>
        </section>
      </>
    );
};

export default Course;
