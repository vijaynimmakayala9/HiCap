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
    const [hoveredCard, setHoveredCard] = useState(null);

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
                <div className="d-inline-block position-relative mb-3">
                    <h2 className="fw-bold display-6 mb-1">Recommended <span style={{ color: "#ad2132" }}>Courses</span></h2>
                    {/* <div
                        style={{
                            width: "140px",
                            height: "4px",
                            backgroundColor: "#ad2132",
                            borderRadius: "999px",
                            position: "absolute",
                            left: "0",
                            bottom: "-4px",
                        }}
                    ></div> */}
                </div>
                <p>Upskill yourself through classroom & online training with the latest technologies in the IT industry from the Best Software Training Institute in Hyderabad- TECHSTERKER</p>
            </div>

            <div className="row">
                {courses.map(({ _id, name, duration, noOfLessons, rating, description, image, price }) => (
                    <div key={_id} className="col-md-6 col-lg-3 mb-4">
                        <div 
                            className="card h-100 shadow-sm border-0 rounded-4 position-relative overflow-hidden"
                            onMouseEnter={() => setHoveredCard(_id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                transition: 'all 0.3s ease',
                                transform: hoveredCard === _id ? 'translateY(-6px)' : 'none',
                            }}
                        >
                            {/* Border top effect on hover */}
                            <div 
                                className={`position-absolute top-0 left-0 right-0 ${hoveredCard === _id ? 'bg-meroon' : ''}`}
                                style={{
                                    height: '4px',
                                    transition: 'all 0.3s ease',
                                    opacity: hoveredCard === _id ? 1 : 0,
                                }}
                            ></div>

                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleCourseClick(_id)}
                            >
                                <img
                                    src={image || 'https://via.placeholder.com/300x160?text=Course+Image'}
                                    className="card-img-top rounded-top-4"
                                    alt={name}
                                    style={{ height: '160px', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold"><span style={{ color: "#ad2132" }}>{name}</span></h5>
                                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                                    {expandedCourses[_id] ? description : `${description?.substring(0, 100)}...`}
                                    {description?.length > 100 && (
                                        <button
                                            className="btn btn-link textcolor p-0"
                                            style={{ fontSize: '0.85rem' }}
                                            onClick={() => toggleDescription(_id)}
                                        >
                                            {expandedCourses[_id] ? 'View Less' : 'View All'}
                                        </button>
                                    )}
                                </p>

                                <div className="d-flex justify-content-between flex-wrap text-muted small mb-3 gap-3">
                                    <div className="d-flex align-items-center">
                                        <FaRegClock className="me-1 textcolor" /> {duration || 'N/A'} Months
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaTasks className="me-1 textcolor" /> {noOfLessons || 0} Lessons
                                    </div>
                                </div>

                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <span className="textcolor fw-bold">₹{price || 'Free'}</span>
                                    <div className="d-flex align-items-center">
                                        <FaStar className="me-1 text-warning" /> {rating || 4.5}/5
                                    </div>
                                </div>
                                <br />
                                <button
                                    className="btn btn-outline-meroon btn-sm"
                                    onClick={() => handleEnrollClick({ title: name, _id })}
                                >
                                    Enroll Now
                                </button>

                                <button
                                    className="btn gradient-button btn-sm mt-2 w-100"
                                    onClick={() => handleCourseClick(_id)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-2">
                <button
                    className="btn gradient-button px-5 py-2 fw-semibold rounded-pill"
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