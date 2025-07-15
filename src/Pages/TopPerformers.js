import React, { useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';

const TopPerformers = () => {
    const [selectedCourse, setSelectedCourse] = useState('Advanced React & Redux');
    const [showDropdown, setShowDropdown] = useState(false);

    const courses = [
        'Advanced React & Redux',
        'Full Stack Java Development',
        'Multi-Cloud DevOps'
    ];

    // Sample data for each course
    const coursePerformers = {
        'Advanced React & Redux': [
            { rank: 1, name: 'Alex Johnson', score: '98%', avatar: '/girl.png' },
            { rank: 2, name: 'Maria Garcia', score: '95%', avatar: '/girl.png' },
            { rank: 3, name: 'James Smith', score: '93%', avatar: '/girl.png' },
            { rank: 4, name: 'Sarah Williams', score: '91%', avatar: '/girl.png' },
            { rank: 5, name: 'David Lee', score: '89%', avatar: '/girl.png' },
            { rank: 8, name: 'You', score: '82%', avatar: '/blog.png', isYou: true },
            { rank: 9, name: 'Emma Davis', score: '80%', avatar: '/girl.png' },
        ],
        'Full Stack Java Development': [
            { rank: 1, name: 'Robert Chen', score: '99%', avatar: '/girl.png' },
            { rank: 2, name: 'Priya Patel', score: '97%', avatar: '/girl.png' },
            { rank: 3, name: 'Michael Brown', score: '95%', avatar: '/girl.png' },
            { rank: 4, name: 'Jennifer Lopez', score: '93%', avatar: '/girl.png' },
            { rank: 5, name: 'Thomas Wilson', score: '90%', avatar: '/girl.png' },
            { rank: 6, name: 'You', score: '88%', avatar: '/blog.png', isYou: true },
            { rank: 7, name: 'Olivia Martin', score: '85%', avatar: '/girl.png' },
        ],
        'Multi-Cloud DevOps': [
            { rank: 1, name: 'Daniel Kim', score: '100%', avatar: '/girl.png.png' },
            { rank: 2, name: 'Sophia Rodriguez', score: '98%', avatar: '/girl.png' },
            { rank: 3, name: 'William Taylor', score: '96%', avatar: '/girl.png' },
            { rank: 4, name: 'Ava Anderson', score: '94%', avatar: '/girl.png' },
            { rank: 5, name: 'Ethan Thomas', score: '92%', avatar: '/girl.png' },
            { rank: 11, name: 'You', score: '78%', avatar: '/blog.png', isYou: true },
            { rank: 12, name: 'Mia Hernandez', score: '76%', avatar: '/girl.png' },
        ]
    };

    const currentPerformers = coursePerformers[selectedCourse];
    const top3Performers = currentPerformers.slice(0, 3);
    const otherPerformers = currentPerformers.slice(3);

    return (
        <section className="container px-4 py-5">
            

            {/* Section Heading */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="fw-bold text-dark mb-2 h2">Top Performers in {selectedCourse}</h1>
                    <div className="bg-success rounded-pill" style={{ width: '216px', height: '3px' }} />
                </div>
            </div>

            {/* Course Selection */}
            <div className="row mb-4">
                <div className="col-12 col-md-6 col-lg-4 position-relative">
                    <div 
                        className="d-flex align-items-center justify-content-between bg-white border border-secondary rounded p-3 w-100 cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="fw-medium">{selectedCourse}</span>
                        <IoIosArrowDown className={`transition-all ${showDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    {showDropdown && (
                        <div className="position-absolute top-100 start-0 bg-white border border-secondary rounded shadow-lg mt-1 w-100 z-10">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className={`px-3 py-2 hover-bg-light cursor-pointer ${selectedCourse === course ? 'bg-light fw-bold' : ''}`}
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {course}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Your Ranking Banner */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="bg-gradient text-white rounded p-3" style={{ background: 'linear-gradient(to right, #007860, #004d3d)' }}>
                        <h2 className="fw-semibold h5 mb-1">Your Ranking</h2>
                        <p className="mb-0">
                            You are ranked <span className="fw-bold">#{currentPerformers.find(p => p.isYou)?.rank}</span> in this course
                        </p>
                    </div>
                </div>
            </div>

            {/* Top 3 Podium Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="bg-white border rounded-3 p-4 d-flex flex-column flex-md-row align-items-center align-items-md-center justify-content-between mb-4">
                        {/* Left Text */}
                        <div className="flex-grow-1 mb-4 mb-md-0">
                            <h2 className="h4 fw-semibold text-dark mb-3">
                                Top Performers of {selectedCourse}
                            </h2>
                            <p className="text-dark mb-0">
                                These students have shown exceptional performance in this course. Keep working hard to climb the ranks!
                            </p>
                        </div>

                        {/* Podiums - Horizontal scroll on mobile */}
                        <div className="d-flex align-items-end gap-2 gap-md-4 w-100 overflow-auto pb-2 flex-nowrap">
                            {/* 2nd Place */}
                            <div className="flex-shrink-0 d-flex flex-column align-items-center position-relative" style={{ width: '100px' }}>
                                <div className="w-100 bg-info bg-opacity-10 rounded-top-4 rounded-bottom-2 d-flex flex-column justify-end align-items-center pt-5 pb-2 position-relative" style={{ height: '140px' }}>
                                    <div className="rounded-circle bg-info bg-opacity-25 position-absolute top-0 translate-middle-y border border-4 border-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                        <span className="fs-5 fw-bold">🥈</span>
                                    </div>
                                    <span className="small fw-semibold text-muted">2nd Place</span>
                                    <span className="small fw-medium text-dark">{top3Performers[1]?.name || '--'}</span>
                                    <span className="fw-bold text-dark">{top3Performers[1]?.score || '--'}</span>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex-shrink-0 d-flex flex-column align-items-center position-relative" style={{ width: '100px'}}>
                                <div className="w-100 bg-warning bg-opacity-10 rounded-top-4 rounded-bottom-2 d-flex flex-column justify-end align-items-center pt-5 pb-2 position-relative" style={{ height: '180px' }}>
                                    <div className="rounded-circle bg-warning bg-opacity-25 position-absolute top-0 translate-middle-y border border-4 border-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                        <span className="fs-5 fw-bold">🥇</span>
                                    </div>
                                    <span className="small fw-semibold text-muted">1st Place</span>
                                    <span className="small fw-medium text-dark">{top3Performers[0]?.name || '--'}</span>
                                    <span className="fw-bold text-dark">{top3Performers[0]?.score || '--'}</span>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex-shrink-0 d-flex flex-column align-items-center position-relative" style={{ width: '100px' }}>
                                <div className="w-100 bg-danger bg-opacity-10 rounded-top-4 rounded-bottom-2 d-flex flex-column justify-end align-items-center pt-5 pb-2 position-relative" style={{ height: '140px' }}>
                                    <div className="rounded-circle bg-danger bg-opacity-25 position-absolute top-0 translate-middle-y border border-4 border-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                                        <span className="fs-5 fw-bold">🥉</span>
                                    </div>
                                    <span className="small fw-semibold text-muted">3rd Place</span>
                                    <span className="small fw-medium text-dark">{top3Performers[2]?.name || '--'}</span>
                                    <span className="fw-bold text-dark">{top3Performers[2]?.score || '--'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Performers List */}
            <div className="row">
                <div className="col-12">
                    <div className="d-flex flex-column gap-3">
                        {otherPerformers.map((performer) => (
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
                                            {performer.avatar ? (
                                                <img
                                                    src={performer.avatar}
                                                    alt="Performer"
                                                    className="w-100 h-100 object-cover"
                                                />
                                            ) : (
                                                <span className="text-muted">{performer.name.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className={`fw-semibold ${performer.isYou ? 'text-success' : 'text-dark'}`}>
                                            {performer.name} {performer.isYou && '(You)'}
                                        </div>
                                        <div className="small text-muted">
                                            {performer.isYou ? 'Your current performance in this course' : 'Active participant in this course'}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <CiCircleCheck className={`fs-5 mb-1 ${performer.isYou ? 'text-success' : 'text-success'}`} />
                                    <div className={`small fw-bold ${performer.isYou ? 'text-success' : 'text-success'}`}>
                                        {performer.score}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopPerformers;