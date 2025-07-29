import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

const LiveClassesPage = () => {
    const [liveClasses, setLiveClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    return (
        <>
            <Header />
            <section className="container py-5 position-relative my-5">
                {/* Heading */}
                <div className="mb-4">
                    <h2 className="fw-bold text-dark mb-2">Live Classes</h2>
                    <div
                        style={{
                            width: '180px',
                            height: '3px',
                            backgroundColor: '#007860',
                            borderRadius: '999px',
                        }}
                    />
                </div>

                {/* Content */}
                {loading ? (
                    <p>Loading live classes...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : liveClasses.length === 0 ? (
                    <p>No live classes available.</p>
                ) : (
                    <>
                        <div className="row g-4">
                            {currentItems.map((cls) => (
                                <div key={cls._id} className="col-md-4">
                                    <div className="card h-100 shadow rounded-4 p-3 d-flex flex-column justify-content-between">
                                        <div className="mb-3">
                                            <h5 className="fw-bold text-dark mb-1">{cls.title}</h5>
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
                                                <span className="text-secondary">{cls.timing}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between mb-3">
                                            <div
                                                className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                                                style={{ width: '48%', borderColor: '#00000022' }}
                                            >
                                                <MdOutlineTimer size={24} color="#007860" />
                                                <small className="fw-medium mt-1">{cls.duration}</small>
                                            </div>

                                            <div
                                                className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                                                style={{ width: '48%', borderColor: '#00000022' }}
                                            >
                                                <SiGoogleclassroom size={24} color="#007860" />
                                                <small className="fw-medium mt-1">Live</small>
                                            </div>
                                        </div>

                                        <a
                                            href={cls.meetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn text-white d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                backgroundColor: '#007860',
                                                borderRadius: '999px',
                                                fontWeight: '600',
                                                height: '40px',
                                            }}
                                        >
                                            Join Now <MoveRight size={20} />
                                        </a>
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
            <Footer />
        </>
    );
};

export default LiveClassesPage;
