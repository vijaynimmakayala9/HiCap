import React from 'react';
import { useNavigate } from 'react-router-dom';

const MagnitiaCourses = () => {
    const navigate = useNavigate();
    const containerStyle = {
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%', // fully responsive inside Bootstrap columns
        height: 'auto',
    };

    const handleHover = (e, enter) => {
        if (enter) {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        } else {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
        }
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
    };

    return (
        <div className="container py-5">
            {/* Row 1: Students */}
            <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                    <div className="px-3">
                        <h5 className="text-secondary">Best Courses For Students</h5>
                        <h3 className="fw-bold text-uppercase">
                            <span style={{ color: '#8e24aa' }}>Build Your Career With</span>{' '}
                            <span className="text-success">Magnitia</span>
                        </h3>
                        <p className="mt-3 text-muted">
                            Magnitia, the best Software Training Institute for Students, helps
                            you build skills to add to your Resume with Unlimited Guided
                            Projects.
                        </p>
                        <button
                            className="btn btn-primary mt-3 fw-bold px-4 py-2 rounded-pill"
                            style={{ backgroundColor: '#8e24aa', border: 'none' }}
                            onClick={()=>{navigate('/courses')}}
                        >
                            Explore Courses
                        </button>
                    </div>
                </div>
                <div className="col-lg-6 text-center">
                    <div
                        style={containerStyle}
                        className='rounded'
                        onMouseEnter={(e) => handleHover(e, true)}
                        onMouseLeave={(e) => handleHover(e, false)}
                    >
                        <img
                            src="https://magnitia.com/assets/images/student2.jpg"
                            alt="Student"
                            className="img-fluid"
                            style={imageStyle}
                        />
                    </div>
                </div>
            </div>

            {/* Row 2: Professionals */}
            <div className="row g-5 align-items-center mt-5">
                <div className="col-lg-6 order-lg-2">
                    <div className="px-3">
                        <h5 className="text-secondary">Best Courses For Professionals</h5>
                        <h3 className="fw-bold text-uppercase">
                            <span style={{ color: '#8e24aa' }}>Upskill Yourself With</span>{' '}
                            <span className="text-success">Magnitia</span>
                        </h3>
                        <p className="mt-3 text-muted">
                            Gain the in-demand skills you need to break into a new career
                            field like Information Technology or Data Science.
                        </p>
                        <button
                            className="btn btn-primary mt-3 fw-bold px-4 py-2 rounded-pill"
                            style={{ backgroundColor: '#8e24aa', border: 'none' }}
                            onClick={()=>{navigate('/courses')}}
                        >
                            Explore Courses
                        </button>
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1 text-center">
                    <div
                        style={containerStyle}
                        className='rounded'
                        onMouseEnter={(e) => handleHover(e, true)}
                        onMouseLeave={(e) => handleHover(e, false)}
                    >
                        <img
                            src="https://magnitia.com/assets/images/professionals.jpg"
                            alt="Professional"
                            className="img-fluid"
                            style={imageStyle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagnitiaCourses;
