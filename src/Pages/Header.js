import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaUserGraduate, FaRegClock, FaUserCircle, FaSignOutAlt, FaPhone, FaLock, FaVideo, FaBook, FaQuestionCircle, FaCertificate } from 'react-icons/fa';

const GuestHeader = ({ onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Popular Courses');

  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef();
  const coursesBtnRef = useRef();
  const resourcesBtnRef = useRef();
  const navRef = useRef();
  const modalRef = useRef();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Courses', isMegaMenu: true },
    { label: 'Upcoming Batches', path: '/upcommingbatches' },
    { label: 'Our Mentors', path: '/ourmentors' },
    {
      label: 'Resources',
      isDropdown: true,
      items: [
        { label: 'FAQs', path: '/faqs' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact Us', path: '/contactus' }
      ]
    },
    { label: 'Clients', path: '/clients' }
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
        (!resourcesBtnRef.current || !resourcesBtnRef.current.contains(e.target)) &&
        (!navRef.current || !navRef.current.contains(e.target))
      ) {
        setShowCoursesMenu(false);
        setShowResourcesMenu(false);
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
      ? courses.filter(course => (course.name || '').toLowerCase().includes('java'))
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
    setShowResourcesMenu(false);
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
      className="position-absolute bg-white shadow-lg border rounded mt-2"
      style={{
        width: 'calc(100vw - 2rem)',
        maxWidth: '900px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1050,
        maxHeight: '80vh',
        overflowY: 'auto'
      }}
    >
      <div className="p-4 p-lg-4">
        <div className="row g-0">
          {/* Categories Column */}
          <div className="col-md-3 border-end pe-3">
            <h6 className="fw-bold text-primary mb-3 fs-6">Course Categories</h6>
            <ul className="list-unstyled">
              {Object.keys(groupedCourses).map((category) => (
                <li key={category} className="mb-2">
                  <button
                    className={`btn w-100 text-start px-3 py-2 rounded  ${selectedCategory === category ? 'gradient-button' : 'text-dark'
                      }`}
                    style={{ fontSize: '14px' }}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Column */}
          <div className="col-md-9 ps-4">
            <h6 className="fw-bold text-primary mb-3 fs-6">{selectedCategory}</h6>
            <div className="row g-3">
              {groupedCourses[selectedCategory]?.slice(0, 6).map((course) => (
                <div key={course._id} className="col-md-6">
                  <div
                    className="d-flex gap-3 p-3 rounded hover-bg-light cursor-pointer"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <div className="bg-light p-2 rounded flex-shrink-0">
                      <div className="d-flex align-items-center justify-content-center  rounded"
                        style={{ width: '36px', height: '36px' }}>
                        <img src={course.image} className='img-fluid' />
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-medium text-truncate" style={{ fontSize: '14px' }}>
                        {course.name}
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted mt-1" style={{ fontSize: '12px' }}>

                        <span className="text-truncate">{course.category || 'N/A'}</span>
                        <span>•</span>
                        <span className="text-truncate">{course.duration || 0} months</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {groupedCourses[selectedCategory]?.length === 0 && (
              <div className="text-center py-4 text-muted">
                No courses available in this category
              </div>
            )}
          </div>
        </div>

        <div className="border-top pt-4 mt-4">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <h6 className="fw-bold text-primary mb-2 fs-6">
                Can't find what you're looking for?
              </h6>
              <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                Browse our complete course catalog or talk to our advisors
              </p>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column flex-md-row gap-2">
                <button
                  className="btn btn-outline-primary btn-sm flex-fill"
                  style={{ fontSize: '13px' }}
                  onClick={() => {
                    navigate('/courses');
                    setShowCoursesMenu(false);
                  }}
                >
                  View All Courses
                </button>
                <button
                  className="btn gradient-button btn-sm flex-fill"
                  style={{ fontSize: '13px' }}
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

  const ResourcesDropdown = () => (
    <div
      className="position-absolute bg-white shadow-lg border rounded mt-2"
      style={{
        minWidth: '200px',
        zIndex: 1050
      }}
    >
      <ul className="list-unstyled p-2">
        {menuItems.find(item => item.label === 'Resources').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`btn w-100 text-start px-3 py-2 rounded ${location.pathname === item.path ? 'text-primary' : ''
                }`}
              style={{ fontSize: '14px' }}
              onClick={() => {
                handleNavigate(item.path);
                setShowResourcesMenu(false);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const MobileMegaMenu = () => (
    <div className="bg-light rounded p-3 mt-2">
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="mb-3">
          <h6 className="fw-bold text-muted mb-2" style={{ fontSize: '13px' }}>{category}</h6>
          <ul className="list-unstyled ps-2">
            {items.slice(0, 3).map((course) => (
              <li
                key={course._id}
                className="mb-2 cursor-pointer"
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="d-flex align-items-start p-2 rounded hover-bg-white">
                  <span className="bg-secondary p-1 rounded me-2 flex-shrink-0">
                    <img src={course.image} className='img-fluid' />
                  </span>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-medium text-truncate" style={{ fontSize: '13px' }}>{course.name}</div>
                    <div className="d-flex align-items-center gap-1 text-muted mt-1" style={{ fontSize: '11px' }}>
                      <FaRegClock style={{ fontSize: '10px' }} />
                      <span className="text-truncate">{course.category || 'N/A'}</span>
                      <span>•</span>
                      <span>{course.duration || 0} months</span>
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
          className="btn btn-outline-primary btn-sm"
          style={{ fontSize: '13px' }}
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ fontSize: '13px' }}
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" style={{ minHeight: '80px', zIndex: 1050 }}>
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          <a
            className="navbar-brand cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src="/logo/logo1.png"
              alt="HiCap Logo"
              className="img-fluid"
              style={{ height: '50px' }}
            />
          </a>

          <div className="d-lg-none d-flex align-items-center gap-2" style={{ position: 'relative', zIndex: 1051 }}>
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn gradient-button btn-md"
              style={{ whiteSpace: 'nowrap', fontSize: '14px', padding: '0.5rem 1.25rem' }}
            >
              Login
            </button>
            <button
              className="btn gradient-button p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
              style={{ width: '44px', height: '44px' }}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div
            ref={navRef}
            className="d-none d-lg-flex align-items-center justify-content-center gap-1 position-relative mx-auto"
            onMouseLeave={() => {
              setShowCoursesMenu(false);
              setShowResourcesMenu(false);
            }}
          >
            {menuItems.map((item, idx) => {
              if (item.isMegaMenu) {
                return (
                  <div
                    key={idx}
                    className="position-relative"
                    onMouseEnter={() => setShowCoursesMenu(true)}
                  >
                    <span
                      ref={coursesBtnRef}
                      className={`nav-link cursor-pointer d-flex align-items-center px-3 py-2 rounded ${location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                        }`}
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Courses <FaChevronDown className="ms-1" style={{ fontSize: '12px' }} />
                    </span>
                    {showCoursesMenu && <MegaMenu />}
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div
                    key={idx}
                    className="position-relative"
                    onMouseEnter={() => setShowResourcesMenu(true)}
                  >
                    <span
                      ref={resourcesBtnRef}
                      className={`nav-link cursor-pointer d-flex align-items-center px-3 py-2 rounded ${item.items.some(i => location.pathname === i.path) ? 'text-success bg-success-subtle' : ''
                        }`}
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Resources <FaChevronDown className="ms-1" style={{ fontSize: '12px' }} />
                    </span>
                    {showResourcesMenu && <ResourcesDropdown />}
                  </div>
                );
              } else {
                return (
                  <span
                    key={idx}
                    className={`nav-link cursor-pointer px-3 py-2 rounded ${location.pathname === item.path ? 'text-primary' : ''
                      }`}
                    onClick={() => handleNavigate(item.path)}
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </span>
                );
              }
            })}

            <button
              onClick={() => setShowLoginModal(true)}
              className=" gradient-button btn-md ms-3 rounded-pill"
              style={{ whiteSpace: 'nowrap', fontSize: '14px', padding: '0.5rem 1.25rem', fontWeight: 600, width: "150px",  }}
            >
              Login
            </button>
          </div>

          {isMobileMenuOpen && (
            <>
              <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
                style={{ zIndex: 1039 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div
                className="d-lg-none position-fixed bg-white shadow-lg w-100"
                style={{
                  top: '80px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1040,
                  overflowY: 'auto'
                }}
              >
                <div className="p-3" style={{ paddingBottom: '20px' }}>
                  {menuItems.map((item, idx) => {
                    if (item.isMegaMenu) {
                      return (
                        <div key={idx} className="mb-2">
                          <div
                            className="d-flex justify-content-between align-items-center fw-semibold text-dark mb-2 p-3 rounded"
                            style={{
                              fontSize: '16px',
                              backgroundColor: showCoursesMenu ? '#f8f9fa' : 'white'
                            }}
                            onClick={() => setShowCoursesMenu(!showCoursesMenu)}
                          >
                            <span>{item.label}</span>
                            <FaChevronDown
                              style={{
                                fontSize: '14px',
                                transition: 'transform 0.3s ease',
                                transform: showCoursesMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                              }}
                            />
                          </div>
                          {showCoursesMenu && <MobileMegaMenu />}
                        </div>
                      );
                    } else if (item.isDropdown) {
                      return (
                        <div key={idx} className="mb-2">
                          <div
                            className="d-flex justify-content-between align-items-center fw-semibold text-dark mb-2 p-3 rounded"
                            style={{
                              fontSize: '16px',
                              backgroundColor: showResourcesMenu ? '#f8f9fa' : 'white'
                            }}
                            onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                          >
                            <span>{item.label}</span>
                            <FaChevronDown
                              style={{
                                fontSize: '14px',
                                transition: 'transform 0.3s ease',
                                transform: showResourcesMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                              }}
                            />
                          </div>
                          {showResourcesMenu && (
                            <div className="ps-3">
                              {item.items.map((subItem, subIdx) => (
                                <div
                                  key={subIdx}
                                  className={`p-3 rounded mb-2 ${location.pathname === subItem.path ? 'bg-success text-white' : 'text-dark'
                                    }`}
                                  style={{
                                    fontSize: '16px',
                                    fontWeight: 500
                                  }}
                                  onClick={() => handleNavigate(subItem.path)}
                                >
                                  {subItem.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded mb-2 ${location.pathname === item.path ? 'bg-primary text-white' : 'text-dark'
                            }`}
                          style={{
                            fontSize: '16px',
                            fontWeight: 500
                          }}
                          onClick={() => handleNavigate(item.path)}
                        >
                          {item.label}
                        </div>
                      );
                    }
                  })}
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn btn-md gradient-button w-100 mt-3 py-3"
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '8px'
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1055 }}>
          <div
            ref={modalRef}
            className="bg-white rounded-3 shadow-lg p-4 w-100"
            style={{
              maxWidth: '420px',
              animation: 'fadeIn 0.3s ease-in-out',
              opacity: 1,
              transform: 'scale(1)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-success mb-0" style={{ fontSize: '24px' }}>Login</h4>
              <button
                onClick={() => setShowLoginModal(false)}
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="alert alert-danger" style={{ fontSize: '13px' }}>
                  {loginError}
                </div>
              )}

              <div className="mb-3">
                <div className="input-group-icon" style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleLoginChange}
                    placeholder="Phone Number"
                    className="form-control"
                    style={{ paddingLeft: '2.5rem', fontSize: '14px' }}
                    required
                  />
                  <FaPhone className="input-icon"
                    style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      color: '#6c757d',
                      fontSize: '14px'
                    }} />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group-icon" style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    className="form-control"
                    style={{ paddingLeft: '2.5rem', fontSize: '14px' }}
                    required
                  />
                  <FaLock className="input-icon"
                    style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      color: '#6c757d',
                      fontSize: '14px'
                    }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`btn w-100 d-flex align-items-center justify-content-center ${isLoggingIn ? 'btn-secondary' : 'btn-primary'
                  }`}
                style={{ fontSize: '15px', padding: '12px' }}
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

      <style jsx>{`
        .nav-link:hover {
          color: blue !important;
        }
        .dropdown-item:hover {
          color: blue !important;
        }
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

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
    { label: 'Course Module', path: '#', icon: FaBook, shortLabel: 'Courses' },
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" style={{ minHeight: '90px', padding: '1rem 0', zIndex: 1050 }}>
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          <a
            className="navbar-brand cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <img
              src="/logo/hicap-logo.png"
              alt="HiCap Logo"
              className="img-fluid"
              style={{ height: '50px' }}
            />
          </a>

          <div className="d-lg-none d-flex align-items-center gap-2" style={{ position: 'relative', zIndex: 1051 }}>
            <div className="dropdown" ref={mobileUserMenuRef}>
              <button
                className="btn btn-outline-primary p-2 d-flex align-items-center gap-1"
                type="button"
                style={{ fontSize: '14px', padding: '0.6rem 1rem' }}
                onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
              >
                <FaUserCircle className='text-primary' style={{ fontSize: '16px' }} />
                <FaChevronDown className={`${showMobileUserMenu ? 'rotate-180' : ''}`}
                  style={{ fontSize: '12px', transform: showMobileUserMenu ? 'rotate(180deg)' : '', transition: 'transform 0.3s ease' }} />
              </button>
              {showMobileUserMenu && (
                <div className="dropdown-menu show position-absolute end-0 mt-2"
                  style={{ minWidth: '220px' }}>
                  <div className="px-3 py-3 bg-light border-bottom">
                    <div className="fw-medium text-truncate" style={{ fontSize: '14px' }}>{user?.name || 'User'}</div>
                    <div className="text-muted text-truncate" style={{ fontSize: '12px' }}>{user?.email || user?.phone}</div>
                  </div>
                  {dashboardMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        className={`dropdown-item d-flex align-items-center gap-2 py-2 ${location.pathname === item.path ? 'text-success bg-success-subtle' : ''
                          }`}
                        style={{ fontSize: '14px' }}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <IconComponent style={{ fontSize: '14px' }} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger py-2"
                    style={{ fontSize: '14px' }}
                    onClick={onLogout}
                  >
                    <FaSignOutAlt style={{ fontSize: '14px' }} />
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              className="btn btn-outline-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
              style={{ width: '44px', height: '44px' }}
            >
              {isMobileMenuOpen ? <FaTimes style={{ fontSize: '16px' }} /> : <FaBars style={{ fontSize: '16px' }} />}
            </button>
          </div>

          <nav className="d-none d-lg-flex align-items-center justify-content-center gap-2 mx-auto">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  className={`btn btn-link text-decoration-none d-flex align-items-center gap-2 ${location.pathname === item.path
                      ? 'text-success bg-success-subtle'
                      : 'text-muted'
                    }`}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handleNavigate(item.path)}
                >
                  <IconComponent style={{ fontSize: '14px' }} />
                  <span className="d-none d-xl-inline">{item.label}</span>
                  <span className="d-xl-none">{item.shortLabel}</span>
                </button>
              );
            })}

            <div className="dropdown ms-3" ref={userMenuRef}>
              <button
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                type="button"
                style={{ fontSize: '14px', padding: '0.6rem 1rem' }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle className='text-primary' style={{ fontSize: '16px' }} />
                <div className="d-none d-xl-block text-start" style={{ maxWidth: '140px' }}>
                  <div className="fw-medium text-truncate" style={{ fontSize: '13px' }}>{user?.name || 'Account'}</div>
                  <div className="text-muted text-truncate" style={{ fontSize: '11px' }}>{user?.email || user?.phone}</div>
                </div>
                <FaChevronDown className={`${showUserMenu ? 'rotate-180' : ''}`}
                  style={{ fontSize: '12px', transform: showUserMenu ? 'rotate(180deg)' : '', transition: 'transform 0.3s ease' }} />
              </button>
              {showUserMenu && (
                <div className="dropdown-menu show position-absolute end-0 mt-2"
                  style={{ minWidth: '220px' }}>
                  <div className="px-3 py-3 bg-light border-bottom">
                    <div className="fw-medium text-truncate" style={{ fontSize: '14px' }}>{user?.name || 'User'}</div>
                    <div className="text-muted text-truncate" style={{ fontSize: '12px' }}>{user?.email || user?.phone || 'Welcome!'}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 text-danger py-2"
                    style={{ fontSize: '14px' }}
                    onClick={onLogout}
                  >
                    <FaSignOutAlt style={{ fontSize: '14px' }} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>

          {isMobileMenuOpen && (
            <>
              <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
                style={{ zIndex: 1039 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div
                className="d-lg-none position-fixed bg-white shadow-lg w-100"
                style={{
                  top: '90px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1040,
                  overflowY: 'auto'
                }}
              >
                <div className="p-4">
                  <div className="d-flex align-items-center gap-3 p-4 bg-success-subtle rounded mb-4">
                    <FaUserCircle className="text-success" style={{ fontSize: '2.5rem' }} />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-medium text-truncate" style={{ fontSize: '16px' }}>{user?.name || 'User'}</div>
                      <div className="text-muted text-truncate" style={{ fontSize: '13px' }}>{user?.email || user?.phone}</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="fw-bold border-bottom pb-3 mb-4" style={{ fontSize: '18px' }}>My Dashboard</h5>
                    {dashboardMenuItems.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={idx}
                          className={`btn w-100 text-start d-flex align-items-center gap-3 p-3 mb-3 rounded ${location.pathname === item.path
                              ? 'btn-primary-subtle text-success border-start border-success border-4'
                              : 'btn-light'
                            }`}
                          style={{ fontSize: '15px' }}
                          onClick={() => handleNavigate(item.path)}
                        >
                          <IconComponent style={{ fontSize: '16px' }} />
                          <span className="fw-medium">{item.label}</span>
                        </button>
                      );
                    })}

                    <button
                      className="btn btn-outline-danger w-100 d-flex align-items-center gap-3 p-3 mt-4"
                      style={{ fontSize: '15px' }}
                      onClick={onLogout}
                    >
                      <FaSignOutAlt style={{ fontSize: '16px' }} />
                      <span className="fw-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      <style jsx>{`
        .btn-link:hover {
          color: blue !important;
          background-color: #f8f9fa !important;
        }
        .dropdown-item:hover {
          color: blue !important;
          background-color: #f8f9fa !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

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