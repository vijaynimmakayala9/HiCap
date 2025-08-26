import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher, FaUsers, FaRegCalendarCheck } from 'react-icons/fa';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

const LiveClassesPage = () => {
    const [liveClasses, setLiveClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchLiveClasses = async () => {
            try {
                const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/liveclasses');
                if (res.data.success) {
                    setLiveClasses(res.data.data);
                } else {
                    setError('Failed to load live classes');
                }
            } catch (err) {
                setError('An error occurred while fetching live classes.');
            } finally {
                setLoading(false);
            }
        };

        fetchLiveClasses();
    }, []);

    // Pagination logic
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = liveClasses.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(liveClasses.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    // Stats calculation
    const totalMentors = new Set(liveClasses.map(c => c.mentorName)).size;
    const totalCourses = new Set(liveClasses.map(c => c.course)).size;
    const totalLiveClasses = liveClasses.length;

    return (
        <>
            
            {/* Stats Cards */}
            <section className="container py-4">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center rounded-4 border-0 h-100">
                            <FaChalkboardTeacher size={40} className="textcolor mb-2" />
                            <h4 className="fw-bold">{totalMentors}</h4>
                            <p className="text-muted">Mentors</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center rounded-4 border-0 h-100">
                            <FaUsers size={40} className="textcolor mb-2" />
                            <h4 className="fw-bold">{totalLiveClasses}</h4>
                            <p className="text-muted">Live Classes</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 text-center rounded-4 border-0 h-100">
                            <FaRegCalendarCheck size={40} className="textcolor mb-2" />
                            <h4 className="fw-bold">{totalCourses}</h4>
                            <p className="text-muted">Courses Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-light py-5 text-center">
                <h1 className="display-5 fw-bold textcolor">Live Classes</h1>
                <p className="lead text-muted">Join live sessions with top mentors and enhance your skills.</p>
            </section>

            

            {/* Live Classes Listing */}
            <section className="container py-2 position-relative">
                {loading ? (
                    <p className="text-center">Loading live classes...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : liveClasses.length === 0 ? (
                    <p className="text-center">No live classes available.</p>
                ) : (
                    <>
                        <div className="row g-4">
                            {currentItems.map((cls) => (
                                <div key={cls._id} className="col-md-4">
                                    <div className="card h-100 shadow rounded-4 overflow-hidden">
                                        <div className="p-3 d-flex flex-column justify-content-between h-100">
                                            <div>
                                                <h5 className="fw-bold textcolor mb-1">{cls.title}</h5>
                                                <p className="text-muted mb-2">{cls.description}</p>

                                                <div className="mb-1">
                                                    <strong>Mentor:</strong>{' '}
                                                    <span className="text-secondary">{cls.mentorName}</span>
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Course:</strong>{' '}
                                                    <span className="text-secondary">{cls.course}</span>
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Timing:</strong>{' '}
                                                    <span className="text-secondary">{formatDateTime(cls.timing)}</span>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-3 mt-2">
                                                <div
                                                    className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                                                    style={{ width: '48%', borderColor: '#00000022' }}
                                                >
                                                    <MdOutlineTimer size={24} color="#ad2132" />
                                                    <small className="fw-medium mt-1">{cls.duration}</small>
                                                </div>

                                                <div
                                                    className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                                                    style={{ width: '48%', borderColor: '#00000022' }}
                                                >
                                                    <SiGoogleclassroom size={24} color="#ad2132" />
                                                    <small className="fw-medium mt-1">Live</small>
                                                </div>
                                            </div>

                                            <a
                                                href={cls.meetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn bg-meroon d-flex align-items-center justify-content-center gap-2"
                                                style={{
                                                    borderRadius: '999px',
                                                    fontWeight: '600',
                                                    height: '40px',
                                                }}
                                            >
                                                Join Now <MoveRight size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                            <button
                                className="btn btn-outline-dark"
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="fw-bold">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="btn btn-outline-dark"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>

            
        </>
    );
};

export default LiveClassesPage;
