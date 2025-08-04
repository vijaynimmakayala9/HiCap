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
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef();
  const coursesBtnRef = useRef();
  const resourcesBtnRef = useRef();
  const resourcesDropdownRef = useRef();
  const navRef = useRef();
  const modalRef = useRef();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Courses', isMegaMenu: true },
    { label: 'Upcoming Batches', path: '/upcommingbatches' },
    {
      label: 'Resources',
      isDropdown: true,
      items: [
        { label: 'FAQs', path: '/faqs' },
        { label: 'Blog', path: '/blog' },
        { label: 'Our Mentors', path: '/ourmentors' },
        { label: 'Clients', path: '/clients' }
      ]
    },
    { label: 'Contact Us', path: '/contactus' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      // Auto-close resources dropdown on large devices
      if (
        resourcesDropdownRef.current &&
        !resourcesDropdownRef.current.contains(e.target) &&
        (!resourcesBtnRef.current || !resourcesBtnRef.current.contains(e.target))
      ) {
        setShowResourcesMenu(false);
      }

      if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.classList.contains('login-button')) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close resources dropdown on mouse leave for large devices
  useEffect(() => {
    const handleMouseLeave = () => {
      if (window.innerWidth >= 992) {
        setTimeout(() => {
          setShowResourcesMenu(false);
        }, 100);
      }
    };

    if (resourcesDropdownRef.current) {
      resourcesDropdownRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (resourcesDropdownRef.current) {
        resourcesDropdownRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showResourcesMenu]);

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
      className="mega-menu"
    >
      <div className="mega-menu-content">
        <div className="categories-column">
          <h6>Course Categories</h6>
          <ul>
            {Object.keys(groupedCourses).map((category) => (
              <li key={category}>
                <button
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="courses-column">
          <h6>{selectedCategory}</h6>
          <div className="courses-grid">
            {groupedCourses[selectedCategory]?.slice(0, 6).map((course) => (
              <div key={course._id} className="course-item">
                <div
                  className="course-card"
                  onClick={() => handleCourseClick(course._id)}
                >
                  <div className="course-image">
                    <img src={course.image} alt={course.name} />
                  </div>
                  <div className="course-info">
                    <div className="course-name">{course.name}</div>
                    <div className="course-meta">
                      <span>{course.category || 'N/A'}</span>
                      <span>•</span>
                      <span>{course.duration || 0} months</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {groupedCourses[selectedCategory]?.length === 0 && (
            <div className="no-courses">
              No courses available in this category
            </div>
          )}
        </div>
      </div>

      <div className="mega-menu-footer">
        <div className="footer-content">
          <h6>Can't find what you're looking for?</h6>
          <p>Browse our complete course catalog or talk to our advisors</p>
        </div>
        <div className="footer-actions">
          <button
            className="btn-outline"
            onClick={() => {
              navigate('/courses');
              setShowCoursesMenu(false);
            }}
          >
            View All Courses
          </button>
          <button
            className="btn-primary"
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
  );

  const ResourcesDropdown = () => (
    <div 
      ref={resourcesDropdownRef}
      className="resources-dropdown"
      onMouseEnter={() => setShowResourcesMenu(true)}
    >
      <ul>
        {menuItems.find(item => item.label === 'Resources').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`resource-item ${location.pathname === item.path ? 'active' : ''}`}
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
    <div className="mobile-mega-menu">
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="mobile-category">
          <h6>{category}</h6>
          <ul>
            {items.slice(0, 3).map((course) => (
              <li
                key={course._id}
                className="mobile-course-item"
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="mobile-course-card">
                  <div className="mobile-course-image">
                    <img src={course.image} alt={course.name} />
                  </div>
                  <div className="mobile-course-info">
                    <div className="mobile-course-name">{course.name}</div>
                    <div className="mobile-course-meta">
                      <FaRegClock />
                      <span>{course.category || 'N/A'}</span>
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
      <div className="mobile-mega-menu-footer">
        <button
          className="btn-outline"
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className="btn-primary"
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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <img
              src="/logo/hicaplogo.png"
              alt="HiCap Logo"
              className="logo"
            />
          </div>

          <div className="mobile-header-actions">
            <button
              onClick={() => setShowLoginModal(true)}
              className="login-btn-mobile"
            >
              Login
            </button>
            <button
              className="menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="desktop-nav">
            {menuItems.map((item, idx) => {
              if (item.isMegaMenu) {
                return (
                  <div
                    key={idx}
                    className="nav-item mega-menu-container"
                    onMouseEnter={() => setShowCoursesMenu(true)}
                  >
                    <span
                      ref={coursesBtnRef}
                      className={`nav-link ${showCoursesMenu ? 'active' : ''}`}
                      onClick={() => setShowCoursesMenu(!showCoursesMenu)}
                    >
                      Courses <FaChevronDown className={`chevron ${showCoursesMenu ? 'rotate' : ''}`} />
                    </span>
                    {showCoursesMenu && <MegaMenu />}
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div
                    key={idx}
                    className="nav-item dropdown-container"
                    onMouseEnter={() => setShowResourcesMenu(true)}
                  >
                    <span
                      ref={resourcesBtnRef}
                      className={`nav-link ${showResourcesMenu ? 'active' : ''}`}
                      onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                    >
                      Resources <FaChevronDown className={`chevron ${showResourcesMenu ? 'rotate' : ''}`} />
                    </span>
                    {showResourcesMenu && <ResourcesDropdown />}
                  </div>
                );
              } else {
                return (
                  <span
                    key={idx}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </span>
                );
              }
            })}

            <button
              onClick={() => setShowLoginModal(true)}
              className="desktop-login-btn"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <img
              src="/logo/hicaplogo.png"
              alt="HiCap Logo"
              className="sidebar-logo"
            />
            <button 
              className="sidebar-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="sidebar-menu">
            {menuItems.map((item, idx) => {
              if (item.isMegaMenu) {
                return (
                  <div key={idx} className="sidebar-menu-item">
                    <div 
                      className="menu-title"
                      onClick={() => setShowCoursesMenu(!showCoursesMenu)}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`arrow ${showCoursesMenu ? 'rotate' : ''}`} />
                    </div>
                    {showCoursesMenu && <MobileMegaMenu />}
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div key={idx} className="sidebar-menu-item">
                    <div 
                      className="menu-title"
                      onClick={() => setShowResourcesMenu(!showResourcesMenu)}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`arrow ${showResourcesMenu ? 'rotate' : ''}`} />
                    </div>
                    {showResourcesMenu && (
                      <div className="submenu">
                        {item.items.map((subItem, subIdx) => (
                          <div
                            key={subIdx}
                            className={`submenu-item ${location.pathname === subItem.path ? 'active' : ''}`}
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
                    className={`sidebar-menu-item simple-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span>{item.label}</span>
                  </div>
                );
              }
            })}
          </div>

          <div className="sidebar-footer">
            <button
              className="sidebar-login-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowLoginModal(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-backdrop">
          <div
            ref={modalRef}
            className="login-modal-content"
          >
            <div className="modal-header">
              <h4>Login</h4>
              <button
                onClick={() => setShowLoginModal(false)}
                className="modal-close"
              ></button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="alert-error">
                  {loginError}
                </div>
              )}

              <div className="form-group">
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleLoginChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`login-submit-btn ${isLoggingIn ? 'loading' : ''}`}
              >
                {isLoggingIn ? (
                  <>
                    <span className="spinner"></span>
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
        /* Base Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1050;
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          padding: 0 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .navbar-brand {
          cursor: pointer;
        }
        
        .logo {
          height: 50px;
        }
        
        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 10px;
        }
        
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex;
          }
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .nav-link:hover, .nav-link.active {
          color: #ad2132;
        }
        
        .chevron {
          margin-left: 5px;
          font-size: 12px;
          transition: transform 0.3s ease;
        }
        
        .chevron.rotate {
          transform: rotate(180deg);
        }
        
        .desktop-login-btn {
          margin-left: 15px;
          padding: 10px 25px;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        
        /* Mega Menu Styles */
        .mega-menu {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100vw - 40px);
          max-width: 900px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          z-index: 1050;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .mega-menu-content {
          display: flex;
          padding: 20px;
        }
        
        .categories-column {
          flex: 0 0 25%;
          padding-right: 20px;
          border-right: 1px solid #eee;
        }
        
        .categories-column h6 {
          font-weight: bold;
          color: #ad2132;
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .categories-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .categories-column li {
          margin-bottom: 10px;
        }
        
        .category-btn {
          width: 100%;
          padding: 10px 15px;
          text-align: left;
          background: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .category-btn:hover, .category-btn.active {
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
        }
        
        .courses-column {
          flex: 1;
          padding-left: 20px;
        }
        
        .courses-column h6 {
          font-weight: bold;
          color: #ad2132;
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .course-item {
          cursor: pointer;
        }
        
        .course-card {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }
        
        .course-card:hover {
          background-color: #f8d7da;
        }
        
        .course-image {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background-color: #f5f5f5;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .course-info {
          flex-grow: 1;
          overflow: hidden;
        }
        
        .course-name {
          font-weight: 500;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .course-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #666;
          font-size: 12px;
          margin-top: 5px;
        }
        
        .no-courses {
          text-align: center;
          padding: 30px;
          color: #666;
        }
        
        .mega-menu-footer {
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .footer-content {
          margin-bottom: 15px;
        }
        
        .footer-content h6 {
          font-weight: bold;
          color: #ad2132;
          margin-bottom: 5px;
        }
        
        .footer-content p {
          color: #666;
          font-size: 13px;
          margin: 0;
        }
        
        .footer-actions {
          display: flex;
          gap: 10px;
        }
        
        .btn-outline {
          flex: 1;
          padding: 8px;
          background: none;
          border: 1px solid #ad2132;
          color: #ad2132;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
        }
        
        .btn-primary {
          flex: 1;
          padding: 8px;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
        }
        
        /* Resources Dropdown */
        .resources-dropdown {
          position: absolute;
          left: 0;
          top: 100%;
          min-width: 200px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 1050;
        }
        
        .resources-dropdown ul {
          list-style: none;
          padding: 10px;
          margin: 0;
        }
        
        .resource-item {
          width: 100%;
          padding: 10px 15px;
          text-align: left;
          background: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .resource-item:hover, .resource-item.active {
          color: #ad2132;
          background-color: #f8d7da;
        }
        
        /* Mobile Header */
        .mobile-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        @media (min-width: 992px) {
          .mobile-header-actions {
            display: none;
          }
        }
        
        .login-btn-mobile {
          padding: 8px 15px;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .menu-toggle {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Mobile Mega Menu */
        .mobile-mega-menu {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-top: 10px;
        }
        
        .mobile-category {
          margin-bottom: 20px;
        }
        
        .mobile-category h6 {
          font-weight: bold;
          color: #666;
          font-size: 13px;
          margin-bottom: 10px;
        }
        
        .mobile-category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .mobile-course-item {
          margin-bottom: 10px;
          cursor: pointer;
        }
        
        .mobile-course-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background-color: white;
          border-radius: 6px;
        }
        
        .mobile-course-image {
          width: 40px;
          height: 40px;
          background-color: #eee;
          border-radius: 4px;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .mobile-course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .mobile-course-info {
          flex-grow: 1;
          overflow: hidden;
        }
        
        .mobile-course-name {
          font-weight: 500;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .mobile-course-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #666;
          font-size: 11px;
          margin-top: 3px;
        }
        
        .mobile-course-meta svg {
          font-size: 10px;
        }
        
        .mobile-mega-menu-footer {
          display: grid;
          gap: 10px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
        }
        
        /* Mobile Sidebar */
        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1060;
          pointer-events: none;
        }
        
        .mobile-sidebar.open {
          pointer-events: auto;
        }
        
        .sidebar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .mobile-sidebar.open .sidebar-overlay {
          opacity: 1;
        }
        
        .sidebar-content {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background-color: white;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .mobile-sidebar.open .sidebar-content {
          transform: translateX(100%);
        }
        
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .sidebar-logo {
          height: 40px;
        }
        
        .sidebar-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #333;
          cursor: pointer;
        }
        
        .sidebar-menu {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px 0;
        }
        
        .sidebar-menu-item {
          border-bottom: 1px solid #f5f5f5;
        }
        
        .sidebar-menu-item:last-child {
          border-bottom: none;
        }
        
        .sidebar-menu-item.simple-item {
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .sidebar-menu-item.simple-item:hover,
        .sidebar-menu-item.simple-item.active {
          color: #ad2132;
          background-color: #f8d7da;
        }
        
        .sidebar-menu-item.simple-item span {
          font-size: 16px;
          font-weight: 500;
        }
        
        .menu-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .menu-title:hover {
          background-color: #f8f9fa;
        }
        
        .menu-title span {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        
        .arrow {
          font-size: 14px;
          color: #666;
          transition: transform 0.3s ease;
        }
        
        .arrow.rotate {
          transform: rotate(180deg);
        }
        
        .submenu {
          background-color: #f8f9fa;
          border-top: 1px solid #eee;
        }
        
        .submenu-item {
          padding: 12px 20px 12px 40px;
          cursor: pointer;
          font-size: 15px;
          color: #555;
          transition: all 0.2s ease;
          border-bottom: 1px solid #e9ecef;
        }
        
        .submenu-item:last-child {
          border-bottom: none;
        }
        
        .submenu-item:hover, 
        .submenu-item.active {
          color: #ad2132;
          background-color: #fff;
        }
        
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .sidebar-login-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
        }
        
        /* Login Modal */
        .login-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1070;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .login-modal-content {
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .modal-header h4 {
          color: #ad2132;
          margin: 0;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }
        
        .alert-error {
          padding: 10px;
          background-color: #f8d7da;
          color: #721c24;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .input-with-icon {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
        
        .input-with-icon input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .login-submit-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #ad2132, #d32f2f);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .login-submit-btn.loading {
          opacity: 0.8;
        }
        
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

const UserHeader = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef();
  const mobileUserMenuRef = useRef();

  const dashboardMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: FaUserCircle, shortLabel: 'Dashboard' },
    { label: 'Interviews', path: '/dashboard/interviews', icon: FaQuestionCircle, shortLabel: 'Interviews' },
    { label: 'Live Classes', path: '/dashboard/live-classes', icon: FaVideo, shortLabel: 'Live' },
    { label: 'Course Module', path: '/coursemodule', icon: FaBook, shortLabel: 'Courses' },
    { label: 'Doubt Session', path: '/dashboard/doubt-session', icon: FaQuestionCircle, shortLabel: 'Doubts' },
    { label: 'Certificate', path: '/dashboard/certificate', icon: FaCertificate, shortLabel: 'Cert' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
            <img
              src="/logo/hicaplogo.png"
              alt="HiCap Logo"
              className="logo"
            />
          </div>

          <div className="mobile-header-actions">
            <div className="user-dropdown-mobile" ref={mobileUserMenuRef}>
              <button
                className="user-btn-mobile"
                onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
              >
                <FaUserCircle className="user-icon" />
                <FaChevronDown className={`chevron ${showMobileUserMenu ? 'rotate' : ''}`} />
              </button>
              {showMobileUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-email">{user?.email || user?.phone}</div>
                  </div>
                  {dashboardMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        className={`dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <IconComponent className="dropdown-icon" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
            <button
              className="menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="desktop-nav">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <IconComponent className="nav-icon" />
                  <span className="full-label">{item.label}</span>
                  <span className="short-label">{item.shortLabel}</span>
                </button>
              );
            })}

            <div className="user-dropdown" ref={userMenuRef}>
              <button
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle className="user-icon" />
                <div className="user-details">
                  <div className="user-name">{user?.name || 'Account'}</div>
                  <div className="user-email">{user?.email || user?.phone}</div>
                </div>
                <FaChevronDown className={`chevron ${showUserMenu ? 'rotate' : ''}`} />
              </button>
              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-email">{user?.email || user?.phone || 'Welcome!'}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <img
              src="/logo/hicaplogo.png"
              alt="HiCap Logo"
              className="sidebar-logo"
            />
            <button 
              className="sidebar-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="user-profile">
            <div className="user-avatar">
              <FaUserCircle />
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name || 'User'}</div>
              <div className="user-email">{user?.email || user?.phone}</div>
            </div>
          </div>

          <div className="sidebar-menu">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <IconComponent className="menu-icon" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <button
              className="logout-btn"
              onClick={onLogout}
            >
              <FaSignOutAlt className="logout-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Base Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1050;
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          padding: 0 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .navbar-brand {
          cursor: pointer;
        }
        
        .logo {
          height: 50px;
        }
        
        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 5px;
        }
        
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex;
          }
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }
        
        .nav-link:hover, .nav-link.active {
          color: #ad2132;
          background-color: #f8d7da;
        }
        
        .nav-icon {
          font-size: 16px;
        }
        
        .short-label {
          display: none;
        }
        
        @media (max-width: 1200px) {
          .full-label {
            display: none;
          }
          .short-label {
            display: inline;
          }
        }
        
        /* User Dropdown */
        .user-dropdown {
          position: relative;
          margin-left: 10px;
        }
        
        .user-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: none;
          border: 1px solid #ddd;
          border-radius: 30px;
          cursor: pointer;
        }
        
        .user-icon {
          font-size: 20px;
          color: #666;
        }
        
        .user-details {
          text-align: left;
        }
        
        .user-name {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        
        .user-email {
          font-size: 11px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        
        .chevron {
          font-size: 12px;
          margin-left: 5px;
          transition: transform 0.3s ease;
        }
        
        .chevron.rotate {
          transform: rotate(180deg);
        }
        
        .user-dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          width: 220px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 1050;
          margin-top: 10px;
        }
        
        .user-info {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .user-info .user-name {
          font-weight: 600;
          font-size: 14px;
          max-width: 100%;
        }
        
        .user-info .user-email {
          font-size: 12px;
          max-width: 100%;
        }
        
        .dropdown-divider {
          height: 1px;
          background-color: #eee;
          margin: 5px 0;
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 15px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
          color: #ad2132;
        }
        
        .dropdown-item.active {
          color: #ad2132;
        }
        
        .dropdown-item.logout {
          color: #d32f2f;
        }
        
        .dropdown-icon {
          font-size: 14px;
        }
        
        /* Mobile Header */
        .mobile-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        @media (min-width: 992px) {
          .mobile-header-actions {
            display: none;
          }
        }
        
        .user-dropdown-mobile {
          position: relative;
        }
        
        .user-btn-mobile {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          background: none;
          border: 1px solid #ad2132;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .user-icon {
          color: #ad2132;
          font-size: 16px;
        }
        
        .user-dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          width: 220px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 1050;
          margin-top: 10px;
        }
        
        .menu-toggle {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid #ad2132;
          color: #ad2132;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Mobile Sidebar */
        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1060;
          pointer-events: none;
        }
        
        .mobile-sidebar.open {
          pointer-events: auto;
        }
        
        .sidebar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .mobile-sidebar.open .sidebar-overlay {
          opacity: 1;
        }
        
        .sidebar-content {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background-color: white;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .mobile-sidebar.open .sidebar-content {
          transform: translateX(100%);
        }
        
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .sidebar-logo {
          height: 40px;
        }
        
        .sidebar-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #333;
          cursor: pointer;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .user-avatar {
          font-size: 2.5rem;
          color: #ad2132;
        }
        
        .user-details {
          flex-grow: 1;
        }
        
        .user-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .user-email {
          font-size: 0.9rem;
          color: #666;
        }
        
        .sidebar-menu {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px 0;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          cursor: pointer;
        }
        
        .menu-item:hover, .menu-item.active {
          background-color: #f8f9fa;
          color: #ad2132;
        }
        
        .menu-icon {
          font-size: 1.2rem;
        }
        
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 15px;
          background: none;
          border: 1px solid #d32f2f;
          color: #d32f2f;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .logout-icon {
          font-size: 1.2rem;
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