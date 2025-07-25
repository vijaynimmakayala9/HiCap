import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import CourseEnquiryModal from '../components/EnrollModal';

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [expandedCourses, setExpandedCourses] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.data);
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

    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const startIdx = (currentPage - 1) * coursesPerPage;
    const currentCourses = courses.slice(startIdx, startIdx + coursesPerPage);

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

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link text-success border-success" onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                            <button
                                className={`page-link ${currentPage === idx + 1 ? 'bg-success text-white' : 'text-success border-success'}`}
                                onClick={() => setCurrentPage(idx + 1)}
                            >
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link text-success border-success" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    };

    if (loading) {
        return (
            <>
                <Header />
                <section className="container py-5 my-5 text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Header />
            <section className="container py-5 my-5">
                <div className="mb-4 text-center text-md-start">
                    <h1 className="fw-bold display-6">Available Courses</h1>
                    <div className="bg-success rounded-pill mx-auto mx-md-0" style={{ width: '216px', height: '3px' }}></div>
                </div>

                <div className="row">
                    {currentCourses.map(({ _id, name, duration, noOfLessons, rating, description, image, price }) => (
                        <div key={_id} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                            <div className="card h-100 shadow-sm border-0 rounded-4">
                                <img
                                    src={image || 'https://via.placeholder.com/300x160?text=Course+Image'}
                                    alt={name}
                                    className="card-img-top rounded-top-4"
                                    style={{ height: '160px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
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
                                    <div className="d-flex flex-wrap text-muted small mb-3 gap-3">
                                        <div className="d-flex align-items-center"><FaRegClock className="me-1" /> {duration}</div>
                                        <div className="d-flex align-items-center"><FaTasks className="me-1" /> {noOfLessons} Lessons</div>
                                        <div className="d-flex align-items-center"><FaStar className="me-1 text-warning" /> {rating || 0}/5</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="text-success fw-bold">${price}</span>
                                        <button className="btn btn-outline-success btn-sm" onClick={() => handleEnrollClick({ title: name, _id })}>Enroll</button>
                                    </div>
                                    <button className="btn btn-success btn-sm mt-2 w-100" onClick={() => handleCourseClick(_id)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {renderPagination()}
            </section>

            <CourseEnquiryModal 
                show={showEnquiryModal} 
                handleClose={() => setShowEnquiryModal(false)} 
                prefillCourse={selectedCourse?.title}
            />
        </>
    );
};

export default Courses;