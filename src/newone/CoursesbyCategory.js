import React, { useState, useEffect } from 'react';
import { FaRegClock, FaCode, FaChevronDown, FaChevronRight, FaBook, FaUserGraduate } from 'react-icons/fa';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import CourseEnquiryModal from '../components/EnrollModal';
import Footer from '../Pages/Footer';

const CoursesByCategory = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://hicap-backend-4rat.onrender.com/api/coursecontroller');
                const data = await response.json();
                if (response.ok) {
                    setCourses(data.data);

                    // Extract unique categories
                    const uniqueCategories = [...new Set(data.data.map(course => course.category))];
                    setCategories([...uniqueCategories.filter(cat =>
                        cat !== 'Certified Program' && cat !== 'Elite Course'
                    )]);

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

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setShowEnquiryModal(true);
    };

    const handleCourseClick = (id) => {
        navigate(`/course/${id}`);
    };

    // Group courses by category
    const coursesByCategory = {};
    categories.forEach(category => {
        coursesByCategory[category] = courses.filter(course => course.category === category);
    });

    if (loading) {
        return (
            <>
                <Header />
                <section className="container py-5 my-5 text-center">
                    <div className="spinner-border textcolor" role="status">
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
                    <h1 className="fw-bold display-6 textcolor">Courses by Category</h1>
                    <p className="text-muted">Browse our comprehensive course catalog organized by categories</p>
                </div>

                <div className="row">
                    <div className="col-12">
                        {categories.map((category) => {
                            const categoryCourses = coursesByCategory[category] || [];

                            return (
                                <div key={category} className="card mb-4 border-0 shadow-sm">
                                    <div
                                        className="card-header bg-white cursor-pointer d-flex justify-content-between align-items-center"
                                        onClick={() => toggleCategory(category)}
                                    >
                                        <h5 className="mb-0 textcolor fw-bold">
                                            {category} <span className="badge bg-meroon ms-2">{categoryCourses.length}</span>
                                        </h5>
                                        {expandedCategories[category] ? (
                                            <FaChevronDown className="textcolor" />
                                        ) : (
                                            <FaChevronRight className="textcolor" />
                                        )}
                                    </div>

                                    {expandedCategories[category] && (
                                        <div className="card-body">
                                            {categoryCourses.length === 0 ? (
                                                <div className="text-center py-4">
                                                    <p className="text-muted">No courses available in this category yet.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    {categoryCourses.map(({ _id, name, image, category, duration, logoImage, noOfLessons, noOfStudents, description }) => (
                                                        <div
                                                            key={_id}
                                                            className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col justify-between border border-white/20 hover:shadow-2xl hover:bg-white/40 transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            <div className="pb-4 border-b border-white/20 mb-2 d-flex gap-3">
                                                                <img
                                                                    src={logoImage || 'https://via.placeholder.com/50x50?text=Course'}
                                                                    className='img-fluid rounded-circle'
                                                                    style={{ height: "70px", width: "70px", objectFit: 'cover' }}
                                                                    alt={name}
                                                                />
                                                                <div className=''>
                                                                    <h3 className="text-lg fw-bold text-gray-900">{name}</h3>
                                                                    <p className="text-sm font-semibold text-gray-500">{category}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <p className="text-sm text-gray-800 mb-4 line-clamp-3">
                                                                    {description?.length > 150 ? `${description.substring(0, 150)}...` : description}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center text-sm text-gray-700 mb-6 gap-6 flex-wrap">
                                                                <div className="flex items-center">
                                                                    <FaRegClock className="mr-2 text-red-700" />
                                                                    <span>{duration}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaBook className="mr-2 text-red-700" />
                                                                    <span>{noOfLessons}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <FaUserGraduate className="mr-2 text-red-700" />
                                                                    <span>{noOfStudents}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between items-center space-x-4 flex-wrap">
                                                                <button
                                                                    className="flex-1 py-2 px-2 rounded-md border border-red-300 font-medium hover:bg-gray-200 transition-colors mb-2 sm:mb-0"
                                                                    onClick={() => handleCourseClick(_id)}
                                                                >
                                                                    View Details
                                                                </button>
                                                                <button
                                                                    className="flex-1 py-2 px-2 rounded-md text-white font-medium bg-red-700 hover:bg-red-800 transition-colors"
                                                                    onClick={() => handleEnrollClick({ title: name, _id })}
                                                                >
                                                                    Enroll Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer />
            <CourseEnquiryModal
                show={showEnquiryModal}
                handleClose={() => setShowEnquiryModal(false)}
                prefillCourse={selectedCourse?.title}
            />
        </>
    );
};

export default CoursesByCategory;
