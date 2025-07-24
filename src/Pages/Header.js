import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegClock, FaUserGraduate } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const megaMenuRef = useRef();
  const loginModalRef = useRef();

  const baseMenuItems = isLoggedIn
    ? [
        { label: 'Home', path: '/' },
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

  // Fetch course data
  useEffect(() => {
    fetch('https://hicap-backend-4rat.onrender.com/api/course1')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const courseCategories = {
    'HIGH RATED COURSES': courses.filter(course => course.isHighRated),
    'POPULAR COURSES': courses.filter(course => course.isPopular),
    'CLOUD & DEVOPS': courses.filter(course =>
      ['Cloud Computing', 'DevOps'].includes(course.category)
    ),
    'DATA SCIENCE & ANALYTICS': courses.filter(course =>
      ['Data Science', 'Data Analytics'].includes(course.category)
    ),
    'TESTING & QA': courses.filter(course =>
      ['Testing', 'QA'].some(keyword =>
        course.category?.includes(keyword) || course.subcategory?.includes(keyword)
      )
    ),
    'PROGRAMMING': courses.filter(course => course.category === 'Programming'),
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!(token && userId));
  }, []);

  useEffect(() => {
    const found = baseMenuItems.find(item => item.path === location.pathname);
    setActive(found?.label || '');
  }, [location.pathname, isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setShowCoursesMenu(false);
      }
      if (loginModalRef.current && !loginModalRef.current.contains(e.target)) {
        setShowLoginModal(false);
      }
    };

    if (showCoursesMenu || showLoginModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCoursesMenu, showLoginModal]);

  const handleClick = (item) => {
    if (item.isMegaMenu) {
      setShowCoursesMenu(!showCoursesMenu);
    } else {
      navigate(item.path);
      setIsOpen(false);
      setShowCoursesMenu(false);
    }
    setActive(item.label);
  };

  const handleLogin = () => {
    const defaultEmail = 'admin@gmail.com';
    const defaultPassword = 'admin123';

    if (!identifier || !password) {
      return alert('Email/Phone and password are required');
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^[0-9]{10}$/.test(identifier);

    if (!isEmail && !isPhone) {
      return alert('Invalid email or phone number');
    }

    if (
      (identifier === defaultEmail || identifier === '9999999999') &&
      password === defaultPassword
    ) {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('userId', 'admin-user-id');
      setIsLoggedIn(true);
      setShowLoginModal(false);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-[#007860]" />
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div
            ref={loginModalRef}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email or Phone</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter email or 10-digit phone"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button onClick={() => setShowLoginModal(false)} className="text-sm font-semibold text-gray-600">
                  Cancel
                </button>
                <button onClick={handleLogin} className="bg-[#007860] text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="text-xl font-bold text-black cursor-pointer hover:text-[#007860]"
            onClick={() => navigate('/')}
          >
            LOGO
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 h-full">
            {baseMenuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.isMegaMenu && setShowCoursesMenu(true)}
              >
                <button
                  onClick={() => handleClick(item)}
                  className={`px-3 py-2 font-medium text-sm lg:text-base h-full flex items-center ${active === item.label
                      ? 'text-[#007860] border-b-2 border-[#007860]'
                      : 'text-gray-700 hover:text-[#007860]'
                    }`}
                >
                  {item.label}
                  {item.isMegaMenu && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-[#007860] text-white px-4 py-2 rounded-md text-sm font-bold">
                Logout →
              </button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="bg-[#007860] text-white px-4 py-2 rounded-md text-sm font-bold">
                Login →
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {showCoursesMenu && (
          <div
            ref={megaMenuRef}
            className="hidden md:block absolute left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40"
            onMouseLeave={() => setShowCoursesMenu(false)}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(courseCategories).map(([category, courseList]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase">{category}</h4>
                    <ul className="space-y-3">
                      {courseList.map((course, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 cursor-pointer group"
                          onClick={() => {
                            navigate(`/course/${course._id}`);
                            setShowCoursesMenu(false);
                          }}
                        >
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-600 border">
                            {course.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 group-hover:text-[#007860]">{course.name}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="flex items-center mr-3">
                                <FaRegClock className="mr-1" /> {course.duration || 'NA'} months
                              </span>
                              <span className="flex items-center">
                                <FaUserGraduate className="mr-1" /> {course.noOfStudents || 0}+ students
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
