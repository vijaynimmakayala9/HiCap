import React, { useEffect, useRef, useState } from 'react';
import { FaChalkboard, FaClock } from 'react-icons/fa';
import CountUp from 'react-countup';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const statsRef = useRef(null);

  const stats = [
    { number: 20000, label: 'Graduated Students' },
    { number: 124, label: 'Expert Instructors' },
    { number: 20, label: 'Esteemed Clients', suffix: '+' },
    { number: 15000, label: 'Students Got Employed' },
  ];

  const courses = [
    {
      title: 'QA / Testing Tools',
      img: 'https://cdn-icons-png.flaticon.com/512/5968/5968331.png',
    },
    {
      title: 'Selenium',
      img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png',
    },
    {
      title: 'Salesforce Dev & Admin',
      img: 'https://cdn.iconscout.com/icon/free/png-256/salesforce-2-432152.png',
    },
    {
      title: 'Amazon Web Services',
      img: 'https://cdn-icons-png.flaticon.com/512/873/873120.png',
    },
    {
      title: 'DevOps',
      img: 'https://cdn-icons-png.flaticon.com/512/5968/5968866.png',
    },
    {
      title: 'Azure',
      img: 'https://cdn.iconscout.com/icon/free/png-256/microsoft-azure-1868965-1583129.png',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const rect = statsRef.current?.getBoundingClientRect();
      if (rect && rect.top <= window.innerHeight) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="container-fluid py-5">
      {/* Heading */}
      <div className="mb-5">
        <h1 className="fw-bold display-5">
          About <span className="text-success">Magnitia</span>
        </h1>
        <div className="bg-success rounded-pill" style={{ width: '90px', height: '6px' }}></div>
      </div>

      {/* Main Content */}
      <div className="row align-items-start mb-5">
        {/* Left Column */}
        <div className="col-md-6">
          <p className="text-muted mb-3">
            Magnitia IT- Software Training Institute Hyderabad offers professional online & classroom trainings for the latest trending IT technologies like Software Testing, Data Science, Cyber Security, AI / ML, Salesforce, QA / Testing Tools, Selenium Automation, DevOps, AWS, Python, Power BI, Appium, Angular, SDET, Web services testing, Manual testing Courses and more.
          </p>
          <p className="text-muted">
            Magnitia formulates software training programs that are constantly refined/revised to maintain sync with industry expectations using innovative training methodologies to ensure max skill transfer and achieve production-ready capability.
          </p>

          <div className="d-flex flex-wrap gap-4 mt-4">
            <div className="d-flex align-items-center text-success fw-semibold">
              <FaChalkboard className="me-2" />
              Expert Trainers
            </div>
            <div className="d-flex align-items-center text-success fw-semibold">
              <FaClock className="me-2" />
              Flexible Timings
            </div>
          </div>
        </div>

        {/* Right Column - Courses Offered */}
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="bg-white shadow-sm rounded p-4">
            <h3 className="fw-bold text-dark mb-4">
              Courses <span className="text-success">Offered</span>
            </h3>

            <div className="row row-cols-1 row-cols-sm-2 g-3">
              {courses.map((course, idx) => {
                const isHovered = idx === hoverIndex;
                const courseStyle = {
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  backgroundColor: isHovered ? '#f0fdf4' : 'transparent',
                  boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                };

                return (
                  <div
                    key={idx}
                    className="col"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={courseStyle}
                  >
                    <img
                      src={course.img}
                      alt={course.title}
                      className="me-2"
                      width="24"
                      height="24"
                      style={{ objectFit: 'contain' }}
                    />
                    <span className="text-secondary fw-medium">{course.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-4">
              <button
                className="btn text-white fw-semibold rounded-pill px-4 py-2"
                style={{ backgroundColor: '#6f42c1' }}
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className={`row text-white text-center py-5 px-3  transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'url("https://magnitia.com/assets/images/rcb-bg.jpg")',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          transition: 'opacity 1s ease-in-out',
        }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="col-6 col-md-3 mb-3">
            <h2 className="fw-bold display-6">
              <CountUp end={stat.number} duration={2} separator="," suffix={stat.suffix || ''} />
            </h2>
            <p className="mb-0">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
