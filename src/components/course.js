import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CourseEnquiryModal from '../components/EnrollModal';

const Course = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [expandedCourses, setExpandedCourses] = useState({});
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const toggleDescription = (id) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setShowEnquiryModal(true);
    };

    const handleCourseClick = (id) => {
        navigate(`/course/${id}`);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
                const data = await response.json();
                if (response.ok) {
                    const popularCourses = data.data.filter(course => course.isPopular).slice(0, 4);
                    setCourses(popularCourses);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <section className="container py-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="container py-5">
            <div className="mb-5 text-center">
                <h2 className="fw-bold display-6">Popular Courses</h2>
                <div className="bg-success mx-auto rounded-pill" style={{ width: '216px', height: '3px' }}></div>
            </div>

            <div className="row">
                {courses.map(({ _id, name, duration, noOfLessons, rating, description, image, price }) => (
                    <div key={_id} className="col-md-6 col-lg-3 mb-4">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleCourseClick(_id)}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                <img
                                    src={image || 'https://via.placeholder.com/300x160?text=Course+Image'}
                                    className="card-img-top rounded-top-4"
                                    alt={name}
                                    style={{ height: '160px', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold text-success">{name}</h5>
                                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                                    {expandedCourses[_id] ? description : `${description?.substring(0, 100)}...`}
                                </p>
                                {description?.length > 100 && (
                                    <button
                                        className="btn btn-link text-success p-0 mb-2"
                                        style={{ fontSize: '0.85rem' }}
                                        onClick={() => toggleDescription(_id)}
                                    >
                                        {expandedCourses[_id] ? 'View Less' : 'View All'}
                                    </button>
                                )}

                                <div className="d-flex flex-wrap text-muted small mb-3 gap-3">
                                    <div className="d-flex align-items-center">
                                        <FaRegClock className="me-1" /> {duration || 'N/A'}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaTasks className="me-1" /> {noOfLessons || 0} Lessons
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaStar className="me-1 text-warning" /> {rating || 0}/5
                                    </div>
                                </div>

                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <span className="text-success fw-bold">${price || 'Free'}</span>
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={() => handleEnrollClick({ title: name, _id })}
                                    >
                                        Enroll
                                    </button>
                                </div>

                                <button
                                    className="btn btn-success btn-sm mt-2 w-100"
                                    onClick={() => handleCourseClick(_id)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <button
                    className="btn btn-outline-success px-5 py-2 fw-semibold rounded-pill"
                    onClick={() => navigate('/courses')}
                >
                    View All Courses
                </button>
            </div>

            <CourseEnquiryModal 
                show={showEnquiryModal} 
                handleClose={() => setShowEnquiryModal(false)} 
                prefillCourse={selectedCourse?.title}
            />
        </section>
    );
};

export default Course;