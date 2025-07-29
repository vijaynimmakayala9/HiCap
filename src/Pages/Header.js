import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaUserGraduate, FaRegClock, FaUserCircle, FaSignOutAlt, FaPhone, FaLock, FaVideo, FaBook, FaQuestionCircle, FaCertificate } from 'react-icons/fa';

// Guest Header Component
const GuestHeader = ({ onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef();
  const coursesBtnRef = useRef();
  const navRef = useRef();
  const modalRef = useRef();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Courses', isMegaMenu: true },
    { label: 'Upcoming Batches', path: '/upcommingbatches' },
    { label: 'Our Mentors', path: '/ourmentors' },
    { label: 'Faqs', path: '/faqs' },
    { label: 'Clients', path: '/clients' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contactus' },
  ];

  useEffect(() => {
    fetch('https://hicap-backend-4rat.onrender.com/api/course1')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data);
        else if (Array.isArray(data.data)) setCourses(data.data);
        else setCourses([]);
      })
      .catch((err) => {
        console.error(err);
        setCourses([]);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target) &&
        (!coursesBtnRef.current || !coursesBtnRef.current.contains(e.target)) &&
        (!navRef.current || !navRef.current.contains(e.target))
      ) {
        setShowCoursesMenu(false);
      }

      if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.classList.contains('login-button')) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const groupedCourses = {
    'High Rated Courses': Array.isArray(courses) ? courses.filter(course => course.isHighRated) : [],
    'Popular Courses': Array.isArray(courses) ? courses.filter(course => course.isPopular) : [],
    'Testing Courses': Array.isArray(courses)
      ? courses.filter(course => (course.category || '').toLowerCase().includes('test'))
      : [],
  };

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
    setShowCoursesMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('https://hicap-backend-4rat.onrender.com/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: loginData.phoneNumber,
          password: loginData.password
        })
      });

      const result = await response.json();

      if (response.ok) {
        setShowLoginModal(false);
        const userData = result.data;
        onLogin({
          id: userData._id,
          name: userData.name,
          phone: userData.phoneNumber,
          email: userData.email,
          token: userData.token
        });
        navigate('/dashboard');
      } else {
        setLoginError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const MegaMenu = () => (
    <div
      ref={megaMenuRef}
      className="mega-menu position-absolute bg-white shadow-lg border rounded mt-2"
    >
      <div className="p-3 p-md-4 p-lg-5">
        <div className="row g-3 g-md-4">
          {Object.entries(groupedCourses).map(([category, items]) => (
            <div key={category} className="col-12 col-md-6 col-lg-4">
              <h6 className="fw-bold text-success border-bottom border-2 pb-2 mb-3">
                {category}
              </h6>
              <ul className="list-unstyled">
                {items.slice(0, 4).map((course) => (
                  <li
                    key={course._id}
                    className="mb-3 cursor-pointer"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <div className="d-flex gap-2 p-2 rounded hover-bg-light">
                      <div className="bg-light p-2 rounded flex-shrink-0">
                        <div className="d-flex align-items-center justify-content-center bg-success-subtle rounded" 
                             style={{ width: '32px', height: '32px' }}>
                          <FaUserGraduate className="text-success small" />
                        </div>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="fw-medium text-truncate small">
                          {course.name}
                        </div>
                        <div className="d-flex align-items-center gap-1 text-muted small mt-1">
                          <FaRegClock />
                          <span className="text-truncate">{course.duration || 'N/A'}</span>
                          <span>•</span>
                          <span className="text-truncate">{course.noOfStudents || 0}+ students</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-top pt-3 mt-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <h6 className="fw-bold text-success mb-1">
                Can't find what you're looking for?
              </h6>
              <p className="text-muted small mb-0">
                Browse our complete course catalog or talk to our advisors
              </p>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column flex-md-row gap-2">
                <button
                  className="btn btn-outline-success btn-sm flex-fill"
                  onClick={() => {
                    navigate('/courses');
                    setShowCoursesMenu(false);
                  }}
                >
                  View All Courses
                </button>
                <button
                  className="btn btn-success btn-sm flex-fill"
                  onClick={() => {
                    navigate('/contactus');
                    setShowCoursesMenu(false);
                  }}
                >
                  Contact Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileMegaMenu = () => (
    <div className="bg-light rounded p-3 mt-2">
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="mb-3">
          <h6 className="fw-bold text-muted mb-2 small">{category}</h6>
          <ul className="list-unstyled ps-2">
            {items.slice(0, 3).map((course) => (
              <li
                key={course._id}
                className="mb-2 cursor-pointer"
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="d-flex align-items-start p-2 rounded hover-bg-white">
                  <span className="bg-secondary p-1 rounded me-2 flex-shrink-0">
                    <FaUserGraduate className="text-success" style={{ fontSize: '0.75rem' }} />
                  </span>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-medium text-truncate small">{course.name}</div>
                    <div className="d-flex align-items-center gap-1 text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                      <FaRegClock />
                      <span className="text-truncate">{course.duration || 'N/A'}</span>
                      <span>•</span>
                      <span>{course.noOfStudents || 0}+</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="border-top pt-2 d-grid gap-2">
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            navigate('/contactus');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          Contact Advisor
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .cursor-pointer { cursor: pointer; }
        .hover-bg-light:hover { background-color: var(--bs-light) !important; }
        .hover-bg-white:hover { background-color: white !important; }
        .navbar-brand img { 
          height: 40px;
          transition: all 0.3s ease;
        }
        .navbar {
          transition: all 0.3s ease;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        @media (min-width: 576px) {
          .navbar-brand img { height: 45px; }
        }
        @media (min-width: 768px) {
          .navbar-brand img { height: 50px; }
          .navbar {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }
        @media (min-width: 992px) {
          .navbar-brand img { height: 56px; }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }
        .input-group-icon {
          position: relative;
        }
        .input-group-icon .form-control {
          padding-left: 2.5rem;
        }
        .input-group-icon .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          color: var(--bs-secondary);
        }
        .mega-menu {
          width: calc(100vw - 2rem);
          max-width: 800px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1050;
          max-height: 80vh;
          overflow-y: auto;
        }
        @media (min-width: 768px) {
          .mega-menu {
            width: auto;
            min-width: 600px;
          }
        }
        .rotate-180 {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
        .mobile-menu {
          max-height: calc(100vh - 70px);
          overflow-y: auto;
        }
        .nav-link {
          transition: all 0.2s ease;
        }
        .login-button {
          white-space: nowrap;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          {/* Logo */}
          <a 
            className="navbar-brand cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <img 
              src="/logo/hicap-logo.png" 
              alt="HiCap Logo" 
              className="img-fluid"
            />
          </a>

          {/* Mobile Navigation */}
          <div className="d-lg-none d-flex align-items-center gap-2">
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn btn-success btn-sm login-button"
            >
              Login
            </button>
            <button
              className="btn btn-outline-success p-2 login-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div
            ref={navRef}
            className="d-none d-lg-flex align-items-center gap-3 position-relative"
            onMouseLeave={() => setShowCoursesMenu(false)}
          >
            {menuItems.map((item, idx) =>
              item.isMegaMenu ? (
                <div
                  key={idx}
                  className="position-relative"
                  onMouseEnter={() => setShowCoursesMenu(true)}
                >
                  <span
                    ref={coursesBtnRef}
                    className={`nav-link cursor-pointer d-flex align-items-center px-3 py-2 rounded ${
                      location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                    }`}
                  >
                    Courses <FaChevronDown className="ms-1 small" />
                  </span>
                  {showCoursesMenu && <MegaMenu />}
                </div>
              ) : (
                <span
                  key={idx}
                  className={`nav-link cursor-pointer px-3 py-2 rounded ${
                    location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                  }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </span>
              )
            )}

            <button
              onClick={() => setShowLoginModal(true)}
              className="btn btn-success ms-3 login-button"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Collapse */}
          {isMobileMenuOpen && (
            <div className="d-lg-none position-fixed bg-white shadow-lg border-top w-100 mobile-menu" 
                 style={{ top: '70px', left: 0, right: 0, zIndex: 1040 }}>
              <div className="p-3">
                {menuItems.map((item, idx) =>
                  item.isMegaMenu ? (
                    <div key={idx} className="mb-3">
                      <div
                        className="d-flex justify-content-between align-items-center fw-semibold text-success mb-2 p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setShowCoursesMenu(!showCoursesMenu)}
                      >
                        <span>Courses</span>
                        <FaChevronDown className={`small transition ${showCoursesMenu ? 'rotate-180' : ''}`} />
                      </div>
                      {showCoursesMenu && <MobileMegaMenu />}
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className={`nav-link cursor-pointer p-2 rounded mb-2 ${
                        location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                      }`}
                      onClick={() => handleNavigate(item.path)}
                    >
                      {item.label}
                    </div>
                  )
                )}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn btn-success w-100 mt-3 login-button"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3" 
             style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1055 }}>
          <div
            ref={modalRef}
            className="bg-white rounded-3 shadow-lg p-4 w-100 fade-in"
            style={{ maxWidth: '400px' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-success mb-0">Login</h4>
              <button
                onClick={() => setShowLoginModal(false)}
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="alert alert-danger small">
                  {loginError}
                </div>
              )}

              <div className="mb-3">
                <div className="input-group-icon">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleLoginChange}
                    placeholder="Phone Number"
                    className="form-control"
                    required
                  />
                  <FaPhone className="input-icon" />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group-icon">
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                  <FaLock className="input-icon" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`btn w-100 d-flex align-items-center justify-content-center ${
                  isLoggingIn ? 'btn-secondary' : 'btn-success'
                }`}
              >
                {isLoggingIn ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// User Header Component (for logged-in users)
const UserHeader = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef();
  const mobileUserMenuRef = useRef();

  const dashboardMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: FaUserCircle, shortLabel: 'Dashboard' },
    { label: 'Interviews', path: '/dashboard/interviews', icon: FaQuestionCircle, shortLabel: 'Interviews' },
    { label: 'Live Classes', path: '/dashboard/live-classes', icon: FaVideo, shortLabel: 'Live' },
    { label: 'Course Module', path: '/dashboard/course-module', icon: FaBook, shortLabel: 'Courses' },
    { label: 'Doubt Session', path: '/dashboard/doubt-session', icon: FaQuestionCircle, shortLabel: 'Doubts' },
    { label: 'Certificate', path: '/dashboard/certificate', icon: FaCertificate, shortLabel: 'Cert' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(e.target)) {
        setShowMobileUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
    setShowMobileUserMenu(false);
  };

  return (
    <>
      <style jsx>{`
        .cursor-pointer { cursor: pointer; }
        .navbar-brand img { 
          height: 40px;
          transition: all 0.3s ease;
        }
        .user-menu {
          min-width: 200px;
        }
        .user-info {
          max-width: 120px;
        }
        .mobile-user-menu {
          max-height: calc(100vh - 70px);
          overflow-y: auto;
        }
        .nav-item {
          transition: all 0.2s ease;
        }
        .nav-item:hover {
          background-color: var(--bs-light);
        }
        @media (min-width: 576px) {
          .navbar-brand img { height: 45px; }
        }
        @media (min-width: 768px) {
          .navbar-brand img { height: 50px; }
        }
        @media (min-width: 992px) {
          .navbar-brand img { height: 56px; }
        }
        .rotate-180 {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          {/* Logo */}
          <a 
            className="navbar-brand cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            <img 
              src="/logo/hicap-logo.png" 
              alt="HiCap Logo" 
              className="img-fluid"
            />
          </a>

          {/* Mobile Navigation */}
          <div className="d-lg-none d-flex align-items-center gap-2">
            <div className="dropdown" ref={mobileUserMenuRef}>
              <button
                className="btn btn-outline-success p-2 d-flex align-items-center gap-1"
                type="button"
                onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
              >
                <FaUserCircle />
                <FaChevronDown className={`small ${showMobileUserMenu ? 'rotate-180' : ''}`} />
              </button>
              {showMobileUserMenu && (
                <div className="dropdown-menu show position-absolute end-0 mt-2 user-menu">
                  <div className="px-3 py-2 bg-light border-bottom">
                    <div className="fw-medium small text-truncate">{user?.name || 'User'}</div>
                    <div className="text-muted small text-truncate">{user?.email || user?.phone}</div>
                  </div>
                  {dashboardMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        className={`dropdown-item d-flex align-items-center gap-2 ${
                          location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                        }`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <IconComponent className="small" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="small" />
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              className="btn btn-outline-success p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="d-none d-lg-flex align-items-center gap-2">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  className={`btn btn-link text-decoration-none d-flex align-items-center gap-2 px-3 py-2 rounded ${
                    location.pathname === item.path 
                      ? 'text-success bg-success-subtle' 
                      : 'text-muted'
                  }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <IconComponent className="small" />
                  <span className="d-none d-xl-inline">{item.label}</span>
                  <span className="d-xl-none">{item.shortLabel}</span>
                </button>
              );
            })}

            <div className="dropdown ms-3" ref={userMenuRef}>
              <button
                className="btn btn-outline-success d-flex align-items-center gap-2 px-3 py-2"
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle />
                <div className="d-none d-xl-block text-start user-info">
                  <div className="small fw-medium text-truncate">{user?.name || 'Account'}</div>
                  <div className="small text-muted text-truncate">{user?.email || user?.phone}</div>
                </div>
                <FaChevronDown className={`small ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              {showUserMenu && (
                <div className="dropdown-menu show position-absolute end-0 mt-2 user-menu">
                  <div className="px-3 py-2 bg-light border-bottom">
                    <div className="fw-medium small text-truncate">{user?.name || 'User'}</div>
                    <div className="text-muted small text-truncate">{user?.email || user?.phone || 'Welcome!'}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="small" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="d-lg-none position-fixed bg-white w-100 mobile-user-menu" 
                 style={{ top: '70px', left: 0, right: 0, zIndex: 1040 }}>
              <div className="p-4">
                <div className="d-flex align-items-center gap-3 p-3 bg-success-subtle rounded mb-4">
                  <FaUserCircle className="text-success" style={{ fontSize: '2rem' }} />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-medium text-truncate">{user?.name || 'User'}</div>
                    <div className="text-muted small text-truncate">{user?.email || user?.phone}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="fw-bold border-bottom pb-2 mb-3">My Dashboard</h5>
                  {dashboardMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        className={`btn w-100 text-start d-flex align-items-center gap-3 p-3 mb-2 rounded ${
                          location.pathname === item.path
                            ? 'btn-success-subtle text-success border-start border-success border-4'
                            : 'btn-light'
                        }`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <IconComponent />
                        <span className="fw-medium">{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <button
                    className="btn btn-outline-danger w-100 d-flex align-items-center gap-3 p-3 mt-4"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt />
                    <span className="fw-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

// Header Wrapper Component
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return isLoggedIn ? (
    <UserHeader user={user} onLogout={handleLogout} />
  ) : (
    <GuestHeader onLogin={handleLogin} />
  );
};

export default Header;