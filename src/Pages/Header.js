import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaRegClock, FaUserGraduate, FaChevronDown, FaUser, FaLock, FaPhone } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef();
  const coursesBtnRef = useRef();
  const navRef = useRef();
  const modalRef = useRef();

  const baseMenuItems = isLoggedIn
    ? [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Courses', isMegaMenu: true },
      { label: 'Interviews', path: '/interviews' },
      { label: 'Certificate', path: '/certificate' },
      { label: 'Doubt Session', path: '/doubtsession' },
      { label: 'Contact Us', path: '/contactus' },
      { label: 'Blog', path: '/blog' },
      { label: 'Clients', path: '/clients' },
      { label: 'FAQ', path: '/faq' },
    ]
    : [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/aboutus' },
      { label: 'Courses', isMegaMenu: true },
      { label: 'Upcoming Batches', path: '/upcommingbatches' },
      { label: 'Our Mentors', path: '/ourmentors' },
      { label: 'Blog', path: '/blog' },
      { label: 'Clients', path: '/clients' },
      { label: 'Contact Us', path: '/contactus' },
      { label: 'FAQ', path: '/faq' },
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowCoursesMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        setIsLoggedIn(true);
        setShowLoginModal(false);
        const userData = result.data;
        setUser({
          id: userData._id,
          name: userData.name,
          phone: userData.phoneNumber,
          email: userData.email,
          token: userData.token
        });

        sessionStorage.setItem('user', JSON.stringify({
          id: userData._id,
          name: userData.name,
          phone: userData.phoneNumber,
          email: userData.email,
          token: userData.token
        }));

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const MegaMenu = () => (
    <div
      ref={megaMenuRef}
      className="absolute top-full left-0 bg-white shadow-xl rounded-md border border-gray-100 mt-2 p-4 md:p-6 z-50 w-full md:w-[90vw] max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="space-y-3 md:space-y-4">
          <h4 className="font-bold text-base md:text-lg text-green-700 border-b border-gray-200 pb-1 md:pb-2">
            {category}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {items.slice(0, 4).map((course) => (
              <li
                key={course._id}
                className="cursor-pointer group"
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="bg-gray-100 group-hover:bg-green-50 p-1 md:p-2 rounded-md">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-md flex items-center justify-center text-green-700">
                      <FaUserGraduate className="text-xs md:text-sm" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base font-medium group-hover:text-green-700 truncate">
                      {course.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-1 md:gap-2 mt-1">
                      <FaRegClock className="flex-shrink-0" />
                      <span className="truncate">{course.duration || 'N/A'}</span>
                      <span>•</span>
                      <span>{course.noOfStudents || 0}+ students</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-t border-gray-200 pt-3 md:pt-4 mt-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
          <div className="flex-1">
            <h4 className="font-bold text-green-700 text-sm md:text-base">
              Can't find what you're looking for?
            </h4>
            <p className="text-gray-600 text-xs md:text-sm mt-1">
              Browse our complete course catalog or talk to our advisors
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <button
              className="px-3 py-1 md:px-4 md:py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 text-xs md:text-sm font-medium whitespace-nowrap"
              onClick={() => {
                navigate('/courses');
                setShowCoursesMenu(false);
              }}
            >
              View All Courses
            </button>
            <button
              className="px-3 py-1 md:px-4 md:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs md:text-sm font-medium whitespace-nowrap"
              onClick={() => {
                navigate('/contact');
                setShowCoursesMenu(false);
              }}
            >
              Contact Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileMegaMenu = () => (
    <div className="pl-4 space-y-3">
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="mb-2">
          <h5 className="text-sm font-bold text-gray-700 mb-1">{category}</h5>
          <ul className="pl-2 space-y-2">
            {items.map((course) => (
              <li
                key={course._id}
                className="cursor-pointer hover:underline flex items-start"
                onClick={() => handleCourseClick(course._id)}
              >
                <span className="bg-gray-100 p-1 rounded mr-2 flex-shrink-0">
                  <FaUserGraduate className="text-xs text-green-700" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{course.name}</div>
                  <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                    <FaRegClock className="flex-shrink-0" />
                    <span className="truncate">{course.duration || 'N/A'}</span>
                    <span>•</span>
                    <span>{course.noOfStudents || 0}+ students</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="pt-3 border-t border-gray-200 space-y-2">
        <button
          className="w-full px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 text-sm font-medium"
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className="w-full px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
          onClick={() => {
            navigate('/contact');
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
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate('/')}
        >
          HiCap
        </div>

        <div className="md:hidden flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm mr-3"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm mr-3 login-button"
            >
              Login
            </button>
          )}
          <button
            className="text-green-700 text-2xl login-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav
          ref={navRef}
          className="hidden md:flex gap-4 lg:gap-6 items-center relative"
          onMouseLeave={() => setShowCoursesMenu(false)}
        >
          {baseMenuItems.map((item, idx) =>
            item.isMegaMenu ? (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setShowCoursesMenu(true)}
              >
                <div className="inline-flex items-center gap-1">
                  <span
                    ref={coursesBtnRef}
                    className={`cursor-pointer font-medium hover:text-green-700 flex items-center ${location.pathname === item.path ? 'text-green-700' : ''
                      }`}
                  >
                    Courses <FaChevronDown className="ml-1 text-xs" />
                  </span>
                </div>
                {showCoursesMenu && <MegaMenu />}
              </div>
            ) : (
              <span
                key={idx}
                className={`cursor-pointer font-medium hover:text-green-700 whitespace-nowrap ${location.pathname === item.path ? 'text-green-700' : ''
                  }`}
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </span>
            )
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm ml-4"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm ml-4 login-button"
            >
              Login
            </button>
          )}
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 border-t absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto">
            {baseMenuItems.map((item, idx) =>
              item.isMegaMenu ? (
                <div key={idx} className="mb-3">
                  <div
                    className="flex items-center justify-between font-semibold text-green-700 mb-1 cursor-pointer"
                    onClick={() => setShowCoursesMenu(!showCoursesMenu)}
                  >
                    <span>Courses</span>
                    <FaChevronDown className={`transition-transform ${showCoursesMenu ? 'rotate-180' : ''}`} />
                  </div>
                  {showCoursesMenu && <MobileMegaMenu />}
                </div>
              ) : (
                <div
                  key={idx}
                  className={`text-sm cursor-pointer hover:text-green-700 ${location.pathname === item.path ? 'text-green-700' : ''
                    }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </div>
              )
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm w-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm w-full login-button"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-fadeIn"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-green-700">Login</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                  {loginError}
                </div>
              )}

              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={loginData.phoneNumber}
                  onChange={handleLoginChange}
                  placeholder="Phone Number"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-2 px-4 rounded-md font-medium text-white transition duration-200 ease-in-out flex items-center justify-center ${isLoggingIn
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isLoggingIn ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
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
    </header>
  );
};

export default Header;