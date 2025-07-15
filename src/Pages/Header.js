import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      { label: 'Upcoming Batches', path: '/upcomingbatches' },
      { label: 'Our Mentors', path: '/ourmentors' },
      { label: 'Blog', path: '/blog' },
      { label: 'Clients', path: '/clients' },
      { label: 'Contact Us', path: '/contactus' },
      { label: 'FAQ', path: '/faq' },
    ];

  const courseCategories = {
    'HIGH RATED COURSES': [
      'AWS Training', 'Angular 2+', 'PowerBI', 'Cyber Security',
      'Azure', 'Data Science', 'PowerBI Power Apps Training', 'Salesforce Dev & Admin',
      'DevOps Training', 'MSBI', 'Data Analytics Training'
    ],
    'POPULAR COURSES': [
      'QA / Testing Tools', 'Python Training', 'Selenium Training',
      'RPA Training', 'Generative AI for Testing', 'Digital Marketing Training'
    ],
    'TESTING COURSES': [
      'Appium', 'Playwright', 'Full Stack QA (SDET)', 'JMeter', 'Protractor', 'UFT / QTP',
      'Cucumber', 'ETL Testing', 'ISTQB Training', 'LoadRunner', 'WebServices Testing', 'Manual Testing'
    ]
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

  // Close mega menu and login modal on outside click
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const handleLogin = async () => {
    if (!phoneNumber || !password) return alert('Phone number and password are required');
    if (!/^[0-9]{10}$/.test(phoneNumber)) return alert('Invalid phone number');

    try {
      setIsLoading(true);
      const res = await fetch('https://hicapbackend.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        navigate('/dashboard'); // 👈 Navigate to dashboard on login
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Login error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/'); // 👈 Navigate to home on logout
  };


  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007860]"
                  placeholder="Enter 10 digit phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007860]"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-[#007860] text-white font-bold rounded-md hover:bg-[#00604d]"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="text-xl font-bold text-black cursor-pointer hover:text-[#007860] transition-colors"
            onClick={() => navigate('/')}
          >
            LOGO
          </div>

          {/* Desktop Menu */}
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
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-[#007860] hover:bg-[#00604d] text-white px-4 py-2 rounded-md text-sm font-bold"
              >
                Logout →
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="ml-4 bg-[#007860] hover:bg-[#00604d] text-white px-4 py-2 rounded-md text-sm font-bold"
              >
                Login →
              </button>
            )}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#007860] p-2 rounded-md focus:outline-none"
            >
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
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(courseCategories).map(([category, courses]) => (
                  <div key={category}>
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">{category}</h4>
                    <ul className="space-y-3">
                      {courses.map((course, i) => (
                        <li
                          key={i}
                          className="text-sm font-medium text-gray-800 cursor-pointer hover:text-[#007860] hover:translate-x-1 transition-transform duration-200"
                          onClick={() => {
                            const courseIdMap = {
                              "AWS Training": "aws123",
                              "Angular 2+": "angular123",
                              "PowerBI": "powerbi123",
                              "Cyber Security": "cyber123",
                              "Azure": "azure123",
                              "Data Science": "datasci123",
                              "PowerBI Power Apps Training": "powerapps123",
                              "Salesforce Dev & Admin": "salesforce123",
                              "DevOps Training": "devops123",
                              "MSBI": "msbi123",
                              "Data Analytics Training": "dataanalytics123",
                              "QA / Testing Tools": "qa123",
                              "Python Training": "python123",
                              "Selenium Training": "selenium123",
                              "RPA Training": "rpa123",
                              "Generative AI for Testing": "genai123",
                              "Digital Marketing Training": "dm123",
                              "Appium": "appium123",
                              "Playwright": "playwright123",
                              "Full Stack QA (SDET)": "sdet123",
                              "JMeter": "jmeter123",
                              "Protractor": "protractor123",
                              "UFT / QTP": "uft123",
                              "Cucumber": "cucumber123",
                              "ETL Testing": "etl123",
                              "ISTQB Training": "istqb123",
                              "LoadRunner": "loadrunner123",
                              "WebServices Testing": "webtest123",
                              "Manual Testing": "manual123",
                            };

                            const courseId = courseIdMap[course];
                            if (courseId) {
                              navigate(`/course/${courseId}`);
                              setShowCoursesMenu(false);
                            } else {
                              alert('Course ID not found!');
                            }
                          }}
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {baseMenuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClick(item)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-md ${active === item.label
                    ? 'bg-gray-100 text-[#007860]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#007860]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-gray-50 rounded-md"
                >
                  Logout →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-[#007860] hover:bg-gray-50 rounded-md"
                >
                  Login →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
