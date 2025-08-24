import React, { useState, useEffect } from 'react';
import { FaRegClock, FaCode, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('https://hicap-backend-4rat.onrender.com/api/course1');
            // Adjust based on actual API structure
            setCourses(response.data.data || response.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <section className="container py-5 flex justify-center items-center">
                <div className="spinner-border text-red-700" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold ">
                        Our <span className='textcolor'>Trending</span>  Courses
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Explore our wide range of courses designed for beginners and professionals.
                    </p>
                </div>

                {/* Courses Grid */}
                {Array.isArray(courses) && courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {courses.map(({ _id, name, duration, noOfLessons, rating, description }) => (
                            <div
                                key={_id}
                                className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col justify-between border border-white/20 hover:shadow-2xl hover:bg-white/40 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="pb-4 border-b border-white/20 mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm text-gray-800 mb-4">{description}</p>
                                </div>
                                <div className="flex items-center text-sm text-gray-700 mb-6 gap-6 flex-wrap">
                                    <div className="flex items-center">
                                        <FaRegClock className="mr-2 text-red-700" />
                                        <span>{duration} Months</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCode className="mr-2 text-red-700" />
                                        <span>{noOfLessons} Live Projects</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaStar className="mr-2 text-yellow-500" />
                                        <span>{rating}/5</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4 flex-wrap">
                                    <button
                                        className="flex-1 py-2 px-4 rounded-md border border-red-300 font-medium hover:bg-gray-200 transition-colors mb-2 sm:mb-0"
                                        onClick={() => navigate(`/course/${_id}`)}
                                    >
                                        Curriculum
                                    </button>
                                    <button
                                        className="flex-1 py-2 px-4 rounded-md text-white font-medium bg-red-700 hover:bg-red-800 transition-colors"
                                        onClick={() => {/* Handle enroll logic here */}}
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-700">No courses available.</p>
                )}

                {/* View All Courses Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        className="py-3 px-6 bg-red-700 text-white rounded-md font-semibold hover:bg-red-800 transition-colors"
                        onClick={() => navigate('/courses')}
                    >
                        View All Courses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Course;
