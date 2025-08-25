import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleCheck } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';

const TopPerformers = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [courses, setCourses] = useState([]);
    const [topPerformers, setTopPerformers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://hicap-backend-4rat.onrender.com/api/coursecontroller');
                if (response.data.success) {
                    const availableCourses = Array.isArray(response.data) ? 
                        response.data : 
                        (Array.isArray(response.data.data) ? response.data.data : []);
                    setCourses(availableCourses);
                    if (availableCourses.length > 0) {
                        setSelectedCourse(availableCourses[0]);
                        fetchTopPerformers(availableCourses[0]._id);
                    }
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const fetchTopPerformers = async (courseId) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://hicap-backend-4rat.onrender.com/api/enrollments/top-practical/${courseId}`
            );
            if (response.data.success) {
                setTopPerformers(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching top performers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCourseChange = (course) => {
        setSelectedCourse(course);
        setShowDropdown(false);
        fetchTopPerformers(course._id);
    };

    const processPerformers = () => {
        if (!topPerformers || topPerformers.length === 0) return { top3: [], others: [] };

        const processed = topPerformers.map(item => ({
            rank: item.rank,
            name: item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Anonymous',
            score: `${Math.max(item.performance?.practicalPercentage || 0, item.performance?.theoreticalPercentage || 0)}%`,
            isYou: item.user?._id === user?.id,
            status: item.status,
            assignmentName: item.performance?.courseTopic || 'Assignment'
        }));

        processed.sort((a, b) => a.rank - b.rank);

        return {
            top3: processed.slice(0, 3),
            others: processed.slice(3)
        };
    };

    const { top3, others } = processPerformers();
    const yourRank = topPerformers.find(p => p.user?._id === user?.id)?.rank || '--';
    const assignmentName = top3[0]?.assignmentName || 'Assignment';

    return (
        <div className="container py-4">
            {/* Section Heading */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="fw-bold mb-3">
                        {selectedCourse ? `Top Performers in ${selectedCourse.name}` : 'Top Performers'}
                    </h1>
                    {/* <div className="bg-meroon rounded-pill" style={{ width: '250px', height: '4px' }}></div> */}
                </div>
            </div>

            {/* Course Selection */}
            <div className="row mb-4">
                <div className="col-12 col-md-6 col-lg-4 position-relative">
                    <div 
                        className="d-flex align-items-center justify-content-between bg-white border rounded-3 p-3 w-100 cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="fw-medium text-truncate pe-2">
                            {selectedCourse ? selectedCourse.name : 'Select a course'}
                        </span>
                        <IoIosArrowDown className={`fs-5 transition-all ${showDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    {showDropdown && (
                        <div className="position-absolute top-100 start-0 w-100 bg-white border rounded-3 shadow mt-1 z-3 overflow-auto" style={{ maxHeight: '300px' }}>
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className={`p-3 hover-bg-light cursor-pointer ${selectedCourse?._id === course._id ? 'bg-light fw-bold' : ''}`}
                                    onClick={() => handleCourseChange(course)}
                                >
                                    {course.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Your Ranking Banner */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="bg-meroonlight text-white rounded-3 p-3">
                                <h2 className="h5 fw-semibold mb-1">Your Assignment Ranking</h2>
                                <p className="mb-0">
                                    {yourRank !== '--' ? (
                                        <>You are ranked <span className="fw-bold">#{yourRank}</span> in {assignmentName}</>
                                    ) : (
                                        "You are not enrolled in this course"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top 3 Podium Section */}
                    {top3.length > 0 && (
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="bg-white border rounded-4 p-4 d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
                                    {/* Left Text */}
                                    <div className="flex-grow-1 mb-4 mb-md-0 pe-md-4">
                                        <h2 className="h4 fw-semibold mb-3">
                                            Top Performers in {selectedCourse?.name} - {assignmentName}
                                        </h2>
                                        <p className="mb-0 text-muted">
                                            These students have shown exceptional performance in this assignment. Keep working hard to climb the ranks!
                                        </p>
                                    </div>

                                    {/* Podiums */}
                                    <div className="d-flex align-items-end gap-3 h-auto w-100 w-md-auto overflow-auto pb-2 flex-nowrap">
                                        {/* 2nd Place */}
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center" style={{ width: '100px' }}>
                                            <div className="w-100 bg-info bg-opacity-10 rounded-top-4 rounded-bottom-3 d-flex flex-column justify-end align-items-center pt-5 pb-3 position-relative" style={{ height: '140px' }}>
                                                <div className="rounded-circle bg-info bg-opacity-25 position-absolute top-6 translate-middle-y border border-4 border-white shadow d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                                    <span className="fs-4 fw-bold">🥈</span>
                                                </div>
                                                <span className="small fw-semibold text-muted">2nd Place</span>
                                                <span className="small fw-medium text-dark text-truncate w-100 text-center">{top3[1]?.name || '--'}</span>
                                                <span className="fw-bold text-dark">{top3[1]?.score || '--'}</span>
                                            </div>
                                        </div>

                                        {/* 1st Place - Fixed height */}
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center" style={{ width: '100px' }}>
                                            <div className="w-100 bg-warning bg-opacity-10 rounded-top-4 rounded-bottom-3 d-flex flex-column justify-end align-items-center pt-5 pb-3 position-relative" style={{ height: '180px' }}>
                                                <div className="rounded-circle bg-warning bg-opacity-25 position-absolute top-6 translate-middle-y border border-4 border-white shadow d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                                    <span className="fs-4 fw-bold">🥇</span>
                                                </div>
                                                <span className="small fw-semibold text-muted">1st Place</span>
                                                <span className="small fw-medium text-dark text-truncate w-100 text-center">{top3[0]?.name || '--'}</span>
                                                <span className="fw-bold text-dark">{top3[0]?.score || '--'}</span>
                                            </div>
                                        </div>

                                        {/* 3rd Place */}
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center" style={{ width: '100px' }}>
                                            <div className="w-100 bg-danger bg-opacity-10 rounded-top-4 rounded-bottom-3 d-flex flex-column justify-end align-items-center pt-5 pb-3 position-relative" style={{ height: '140px' }}>
                                                <div className="rounded-circle bg-danger bg-opacity-25 position-absolute top-6 translate-middle-y border border-4 border-white shadow d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                                    <span className="fs-4 fw-bold">🥉</span>
                                                </div>
                                                <span className="small fw-semibold text-muted">3rd Place</span>
                                                <span className="small fw-medium text-dark text-truncate w-100 text-center">{top3[2]?.name || '--'}</span>
                                                <span className="fw-bold text-dark">{top3[2]?.score || '--'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other Performers List */}
                    {others.length > 0 ? (
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex flex-column gap-3">
                                    {others.map((performer) => (
                                        <div
                                            key={performer.rank}
                                            className={`d-flex align-items-center justify-content-between border rounded-3 p-3 ${performer.isYou ? 'bg-success bg-opacity-10 border-success' : 'border-secondary'}`}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className={`fw-bold ${performer.isYou ? 'text-success' : 'text-dark'}`} style={{ width: '24px' }}>
                                                        {performer.rank}
                                                    </div>
                                                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ width: '40px', height: '40px' }}>
                                                        <span className="text-muted">{performer.name.charAt(0)}</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className={`fw-semibold ${performer.isYou ? 'text-success' : 'text-dark'}`}>
                                                        {performer.name} {performer.isYou && '(You)'}
                                                    </div>
                                                    <div className="small text-muted">
                                                        {performer.status === 'completed' ? 'Completed the assignment' : 'Active participant'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <CiCircleCheck className={`fs-5 mb-1 text-success`} />
                                                <div className={`fw-bold text-success`}>
                                                    {performer.score}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">No other performers to display</div>
                    )}
                </>
            )}
        </div>
    );
};

export default TopPerformers;