import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaUserGraduate, FaRegClock, FaUserCircle, FaSignOutAlt, FaPhone, FaLock, FaVideo, FaBook, FaQuestionCircle, FaCertificate } from 'react-icons/fa';
import ContactUsModal from '../models/ContactUsModal';

const GuestHeader = ({ onLogin }) => {
  const [showMobileCoursesMenu, setShowMobileCoursesMenu] = useState(false);
  const [showMobileResourcesMenu, setShowMobileResourcesMenu] = useState(false);
  const [showMobileCompanyMenu, setShowMobileCompanyMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Popular Courses');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef();
  const coursesBtnRef = useRef();
  const resourcesBtnRef = useRef();
  const companyBtnRef = useRef();
  const resourcesDropdownRef = useRef();
  const companyDropdownRef = useRef();
  const navRef = useRef();
  const modalRef = useRef();
  const coursesTimeoutRef = useRef();
  const resourcesTimeoutRef = useRef();
  const companyTimeoutRef = useRef();

  const [showContactModal, setShowContactModal] = useState(false);

  const menuItems = [
    { label: 'Courses', isMegaMenu: true },
    { label: 'Upcoming Batches', path: '/upcommingbatches' },
    {
      label: 'Services',
      isDropdown: true,
      items: [
        { label: 'Resume Building', path: '/resumebuilding' },
        { label: 'Mock Interviews', path: '/mockinterviews' },
        { label: 'Real time Assistance', path: '/realtimeassistance' },
        { label: 'Project Assistance', path: '/projectassistance' },
        { label: 'Placements Assistance', path: '/placements' },
        { label: 'One-One Session', path: '/onetoone' },
      ]
    },
    {
      label: 'Company',
      isDropdown: true,
      items: [
        { label: 'About Us', path: '/aboutus' },
        { label: 'Contact Us', path: '/contactus' },
        { label: 'Blog', path: '/blog' },
        { label: 'Our Mentors', path: '/ourmentors' },
        { label: 'Certificates', path: '#' },
        { label: 'FAQs', path: '/faqs' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
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
        (!companyBtnRef.current || !companyBtnRef.current.contains(e.target)) &&
        (!navRef.current || !navRef.current.contains(e.target))
      ) {
        setShowCoursesMenu(false);
        setShowResourcesMenu(false);
        setShowCompanyMenu(false);
      }

      if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.classList.contains('login-button')) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Improved menu closing logic with proper timeout management
  const handleCoursesMouseEnter = () => {
    if (coursesTimeoutRef.current) {
      clearTimeout(coursesTimeoutRef.current);
    }
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    if (companyTimeoutRef.current) {
      clearTimeout(companyTimeoutRef.current);
    }
    setShowCoursesMenu(true);
    setShowResourcesMenu(false);
    setShowCompanyMenu(false);
  };

  const handleCoursesMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      coursesTimeoutRef.current = setTimeout(() => {
        setShowCoursesMenu(false);
      }, 300);
    }
  };

  const handleResourcesMouseEnter = () => {
    if (coursesTimeoutRef.current) {
      clearTimeout(coursesTimeoutRef.current);
    }
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    if (companyTimeoutRef.current) {
      clearTimeout(companyTimeoutRef.current);
    }
    setShowResourcesMenu(true);
    setShowCoursesMenu(false);
    setShowCompanyMenu(false);
  };

  const handleResourcesMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      resourcesTimeoutRef.current = setTimeout(() => {
        setShowResourcesMenu(false);
      }, 300);
    }
  };

  const handleCompanyMouseEnter = () => {
    if (coursesTimeoutRef.current) {
      clearTimeout(coursesTimeoutRef.current);
    }
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    if (companyTimeoutRef.current) {
      clearTimeout(companyTimeoutRef.current);
    }
    setShowCompanyMenu(true);
    setShowCoursesMenu(false);
    setShowResourcesMenu(false);
  };

  const handleCompanyMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      companyTimeoutRef.current = setTimeout(() => {
        setShowCompanyMenu(false);
      }, 300);
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (coursesTimeoutRef.current) {
        clearTimeout(coursesTimeoutRef.current);
      }
      if (resourcesTimeoutRef.current) {
        clearTimeout(resourcesTimeoutRef.current);
      }
      if (companyTimeoutRef.current) {
        clearTimeout(companyTimeoutRef.current);
      }
    };
  }, []);

  const groupedCourses = {
    'High Rated Courses': Array.isArray(courses) ? courses.filter(course => course.isHighRated) : [],
    'Popular Courses': Array.isArray(courses) ? courses.filter(course => course.isPopular) : [],
    'Testing Courses': Array.isArray(courses)
      ? courses.filter(course => (course.name || '').toLowerCase().includes('java'))
      : [],
  };

  const handleCourseClick = (id) => {
    console.log('Course clicked, ID:', id);
    navigate(`/course/${id}`);
    setShowCoursesMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (path) => {
    if (path === "/contactus") {
      setShowContactModal(true);
    } else {
      navigate(path);
    }

    setIsMobileMenuOpen(false);
    setShowResourcesMenu(false);
    setShowCoursesMenu(false);
    setShowCompanyMenu(false);
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
      className={`absolute ${isTablet ? 'left-0' : 'left-1/2 transform -translate-x-1/2'} w-[95vw] max-w-[900px] bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto`}
      onMouseEnter={handleCoursesMouseEnter}
      onMouseLeave={handleCoursesMouseLeave}
    >
      <div className="flex flex-col md:flex-row p-4 md:p-5">
        <div className="flex-none w-full md:w-1/4 md:pr-4 md:border-r border-gray-200 mb-4 md:mb-0">
          <h6 className="font-bold text-[#ad2132] mb-3 text-sm md:text-base">Course Categories</h6>
          <ul className="list-none p-0 m-0 flex flex-col md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {Object.keys(groupedCourses).map((category) => (
              <li key={category} className="mb-2 flex-shrink-0 md:flex-shrink mr-2 md:mr-0">
                <button
                  className={`w-full text-left p-2 rounded-md text-xs md:text-sm ${selectedCategory === category ? 'bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white' : 'bg-transparent hover:bg-gray-100'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 md:pl-4">
          <h6 className="font-bold text-[#ad2132] mb-3 text-sm md:text-base">{selectedCategory}</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groupedCourses[selectedCategory]?.slice(0, 6).map((course) => (
              <div key={course._id} className="cursor-pointer">
                <div
                  className="flex gap-3 p-3 rounded-lg transition-colors hover:bg-[#f8d7da]"
                  onClick={() => {
                    handleCourseClick(course._id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="font-medium text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{course.name}</div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs mt-1">
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
            <div className="text-center p-6 text-gray-600 text-sm">
              No courses available in this category
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 border-t border-gray-200">
        <div className="mb-3">
          <h6 className="font-bold text-[#ad2132] mb-1 text-sm md:text-base">Can't find what you're looking for?</h6>
          <p className="text-gray-600 text-xs md:text-sm m-0">Browse our complete course catalog or talk to our advisors</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="flex-1 p-2 bg-transparent border border-[#ad2132] text-[#ad2132] rounded text-xs md:text-sm cursor-pointer hover:bg-[#ad2132] hover:text-white transition-colors"
            onClick={() => {
              navigate('/courses');
              setShowCoursesMenu(false);
            }}
          >
            View All Courses
          </button>
          <button
            className="flex-1 p-2 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded text-xs md:text-sm cursor-pointer hover:opacity-90 transition-opacity"
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
      className="absolute left-0 top-full min-w-[180px] md:min-w-[200px] bg-white rounded-lg shadow-lg z-50"
      onMouseEnter={handleResourcesMouseEnter}
      onMouseLeave={handleResourcesMouseLeave}
    >
      <ul className="list-none p-2 m-0">
        {menuItems.find(item => item.label === 'Services').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left p-2 rounded-md text-xs md:text-sm transition-all hover:bg-[#f8d7da] hover:text-[#ad2132] ${location.pathname === item.path ? 'text-[#ad2132] bg-[#f8d7da]' : 'bg-transparent'}`}
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

  const CompanyDropdown = () => (
    <div
      ref={companyDropdownRef}
      className="absolute left-0 top-full min-w-[180px] md:min-w-[200px] bg-white rounded-lg shadow-lg z-50"
      onMouseEnter={handleCompanyMouseEnter}
      onMouseLeave={handleCompanyMouseLeave}
    >
      <ul className="list-none p-2 m-0">
        {menuItems.find(item => item.label === 'Company').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left p-2 rounded-md text-xs md:text-sm transition-all hover:bg-[#f8d7da] hover:text-[#ad2132] ${location.pathname === item.path ? 'text-[#ad2132] bg-[#f8d7da]' : 'bg-transparent'}`}
              onClick={() => {
                handleNavigate(item.path);
                setShowCompanyMenu(false);
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
    <div className="p-3 bg-gray-50 rounded-lg mt-2">
      {Object.entries(groupedCourses).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h6 className="font-bold text-gray-600 text-xs md:text-sm mb-2">{category}</h6>
          <ul className="list-none p-0 m-0">
            {items.slice(0, 6).map((course) => (
              <li key={course._id} className="mb-2 cursor-pointer">
                <div
                  className="flex items-center gap-2 p-2 bg-white rounded-md hover:bg-[#f8d7da] transition-colors"
                  onClick={() => {
                    console.log('Mobile course clicked:', course._id);
                    handleCourseClick(course._id);
                  }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="font-medium text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{course.name}</div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
                      <FaRegClock className="text-[10px]" />
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
      <div className="grid gap-2 pt-2 border-t border-gray-300">
        <button
          className="p-2 bg-transparent border border-[#ad2132] text-[#ad2132] rounded cursor-pointer text-xs md:text-sm hover:bg-[#ad2132] hover:text-white transition-colors"
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className="p-2 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded cursor-pointer text-xs md:text-sm hover:opacity-90 transition-opacity"
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
      <nav className={`fixed top-0 left-0 w-full h-16 md:h-[70px] bg-white shadow-md z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur-md' : ''}`}>
        <div className="flex justify-between items-center h-full px-3 sm:px-4 md:px-5 max-w-[1400px] mx-auto">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo/smalllogo.png"
              alt="HiCap Logo"
              className="max-h-8 md:max-h-10 lg:max-h-11 w-auto"
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-3 py-1.5 md:px-3.5 md:py-2 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded text-xs md:text-sm cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Login
            </button>
            <button
              className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes className="text-sm md:text-base" /> : <FaBars className="text-sm md:text-base" />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-0">
            {menuItems.map((item, idx) => {
              if (item.isMegaMenu) {
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={handleCoursesMouseEnter}
                    onMouseLeave={handleCoursesMouseLeave}
                  >
                    <span
                      ref={coursesBtnRef}
                      className={`flex items-center px-4 py-3 md:px-5 md:py-4 text-sm md:text-base font-medium text-gray-800 cursor-pointer rounded-md transition-all relative mr-2 ${showCoursesMenu ? 'text-[#ad2132]' : 'hover:text-[#ad2132]'}`}
                      onClick={() => {
                        setShowCoursesMenu(!showCoursesMenu);
                        setShowResourcesMenu(false);
                        setShowCompanyMenu(false);
                      }}
                    >
                      Courses <FaChevronDown className={`ml-1.5 text-xs transition-transform ${showCoursesMenu ? 'rotate-180' : ''}`} />
                    </span>
                    {showCoursesMenu && <MegaMenu />}
                    {/* Vertical divider line */}
                    <div className="absolute right-[-8px] md:right-[-10px] top-1/2 transform -translate-y-1/2 h-5 md:h-6 w-px bg-gray-300"></div>
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={item.label === 'Services' ? handleResourcesMouseEnter : handleCompanyMouseEnter}
                    onMouseLeave={item.label === 'Services' ? handleResourcesMouseLeave : handleCompanyMouseLeave}
                  >
                    <span
                      ref={item.label === 'Services' ? resourcesBtnRef : companyBtnRef}
                      className={`flex items-center px-4 py-3 md:px-5 md:py-4 text-sm md:text-base font-medium text-gray-800 cursor-pointer rounded-md transition-all relative mr-2 ${(item.label === 'Services' && showResourcesMenu) || (item.label === 'Company' && showCompanyMenu) ? 'text-[#ad2132]' : 'hover:text-[#ad2132]'}`}
                      onClick={() => {
                        if (item.label === 'Services') {
                          setShowResourcesMenu(!showResourcesMenu);
                          setShowCoursesMenu(false);
                          setShowCompanyMenu(false);
                        } else {
                          setShowCompanyMenu(!showCompanyMenu);
                          setShowCoursesMenu(false);
                          setShowResourcesMenu(false);
                        }
                      }}
                    >
                      {item.label} <FaChevronDown className={`ml-1.5 text-xs transition-transform ${(item.label === 'Services' && showResourcesMenu) || (item.label === 'Company' && showCompanyMenu) ? 'rotate-180' : ''}`} />
                    </span>
                    {item.label === 'Services' && showResourcesMenu && <ResourcesDropdown />}
                    {item.label === 'Company' && showCompanyMenu && <CompanyDropdown />}
                    {/* Vertical divider line */}
                    <div className="absolute right-[-8px] md:right-[-7px] top-1/2 transform -translate-y-1/2 h-5 md:h-6 w-px bg-gray-300"></div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="relative flex items-center">
                    <span
                      className={`px-4 py-3 md:px-5 md:py-4 text-sm md:text-base font-medium cursor-pointer rounded-md transition-colors ${location.pathname === item.path
                        ? 'text-[#ad2132]'
                        : 'text-gray-800 hover:text-[#ad2132]'
                        }`}
                      onClick={() => handleNavigate(item.path)}
                    >
                      {item.label}
                    </span>

                    {/* Vertical divider line - hide for last item */}
                    {idx < menuItems.length - 1 && (
                      <div className="h-5 md:h-6 w-px bg-gray-300 ml-2"></div>
                    )}
                  </div>
                );
              }
            })}

            <button
              onClick={() => setShowLoginModal(true)}
              className="ml-2 px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-2 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded-full font-semibold text-sm md:text-base cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-full h-full z-[1060] pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`absolute top-0 left-0 w-full h-full bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 left-[-100%] w-full h-full bg-white transition-transform flex flex-col ${isMobileMenuOpen ? 'translate-x-full' : ''}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <img
              src="/logo/hicapnewlogo.png"
              alt="HiCap Logo"
              className="h-8 md:h-10"
            />
            <button
              className="bg-transparent border-none text-xl md:text-2xl text-gray-800 cursor-pointer hover:text-[#ad2132] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto py-2">
            {menuItems.map((item, idx) => {
              if (item.isMegaMenu) {
                return (
                  <div key={idx} className="border-b border-gray-100 last:border-b-0">
                    <div
                      className="flex justify-between items-center p-3 cursor-pointer transition-all hover:bg-gray-50"
                      onClick={() => {
                        setShowMobileCoursesMenu(!showMobileCoursesMenu);
                        setShowMobileResourcesMenu(false);
                        setShowMobileCompanyMenu(false);
                      }}
                    >
                      <span className="text-sm md:text-base font-medium text-gray-800">{item.label}</span>
                      <FaChevronDown className={`text-xs md:text-sm text-gray-600 transition-transform ${showMobileCoursesMenu ? 'rotate-180' : ''}`} />
                    </div>
                    {showMobileCoursesMenu && <MobileMegaMenu />}
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div key={idx} className="border-b border-gray-100 last:border-b-0">
                    <div
                      className="flex justify-between items-center p-3 cursor-pointer transition-all hover:bg-gray-50"
                      onClick={() => {
                        if (item.label === 'Services') {
                          setShowMobileResourcesMenu(!showMobileResourcesMenu);
                          setShowMobileCoursesMenu(false);
                          setShowMobileCompanyMenu(false);
                        } else if (item.label === 'Company') {
                          setShowMobileCompanyMenu(!showMobileCompanyMenu);
                          setShowMobileCoursesMenu(false);
                          setShowMobileResourcesMenu(false);
                        }
                      }}
                    >
                      <span className="text-sm md:text-base font-medium text-gray-800">{item.label}</span>
                      <FaChevronDown className={`text-xs md:text-sm text-gray-600 transition-transform ${(item.label === 'Services' && showMobileResourcesMenu) || (item.label === 'Company' && showMobileCompanyMenu) ? 'rotate-180' : ''}`} />
                    </div>
                    {showMobileResourcesMenu && item.label === 'Services' && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {item.items.map((subItem, subIdx) => (
                          <div
                            key={subIdx}
                            className={`p-3 pl-8 cursor-pointer text-xs md:text-sm text-gray-700 transition-all border-b border-gray-100 last:border-b-0 hover:bg-white hover:text-[#ad2132] ${location.pathname === subItem.path ? 'text-[#ad2132] bg-white' : ''}`}
                            onClick={() => handleNavigate(subItem.path)}
                          >
                            {subItem.label}
                          </div>
                        ))}
                      </div>
                    )}
                    {showMobileCompanyMenu && item.label === 'Company' && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {item.items.map((subItem, subIdx) => (
                          <div
                            key={subIdx}
                            className={`p-3 pl-8 cursor-pointer text-xs md:text-sm text-gray-700 transition-all border-b border-gray-100 last:border-b-0 hover:bg-white hover:text-[#ad2132] ${location.pathname === subItem.path ? 'text-[#ad2132] bg-white' : ''}`}
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
                    className={`p-3 cursor-pointer transition-all border-b border-gray-100 last:border-b-0 hover:bg-gray-50 hover:text-[#ad2132] ${location.pathname === item.path ? 'text-[#ad2132] bg-[#f8d7da]' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span className="text-sm md:text-base font-medium">{item.label}</span>
                  </div>
                );
              }
            })}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              className="w-full p-3 md:p-4 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded-md font-semibold cursor-pointer text-sm md:text-base hover:opacity-90 transition-opacity"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-[1070] flex items-center justify-center p-3 sm:p-4 md:p-5">
          <div
            ref={modalRef}
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-5 lg:mb-6">
              <h4 className="text-[#ad2132] text-base md:text-lg lg:text-xl font-semibold m-0">
                Login
              </h4>
              <button
                onClick={() => setShowLoginModal(false)}
                className="bg-transparent border-none text-base md:text-lg lg:text-xl cursor-pointer hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="p-2 md:p-2.5 bg-[#f8d7da] text-[#721c24] rounded mb-3 md:mb-4 text-xs md:text-sm">
                  {loginError}
                </div>
              )}

              {/* Phone Input */}
              <div className="mb-3 md:mb-4 lg:mb-5">
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs md:text-sm" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleLoginChange}
                    placeholder="Phone Number"
                    required
                    className="w-full p-2 md:p-2.5 lg:p-3 pl-8 md:pl-9 lg:pl-10 border border-gray-300 rounded-md text-xs md:text-sm focus:border-[#ad2132] focus:outline-none focus:ring-1 focus:ring-[#ad2132] transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-3 md:mb-4 lg:mb-5">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs md:text-sm" />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                    className="w-full p-2 md:p-2.5 lg:p-3 pl-8 md:pl-9 lg:pl-10 border border-gray-300 rounded-md text-xs md:text-sm focus:border-[#ad2132] focus:outline-none focus:ring-1 focus:ring-[#ad2132] transition-colors"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full p-2 md:p-2.5 lg:p-3 bg-gradient-to-br from-[#ad2132] to-[#d32f2f] text-white border-none rounded-md font-semibold text-xs md:text-sm cursor-pointer hover:opacity-90 transition-opacity ${isLoggingIn ? 'opacity-80' : ''}`}
              >
                {isLoggingIn ? (
                  <>
                    <span className="inline-block w-3 h-3 md:w-4 md:h-4 border-2 border-white/30 rounded-full border-t-white animate-spin mr-2"></span>
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

      <ContactUsModal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
      />
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
      <nav className={`fixed top-0 left-0 w-full h-16 md:h-20 bg-white shadow-md z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur-md' : ''}`}>
        <div className="flex justify-between items-center h-full px-3 sm:px-4 md:px-5 max-w-[1400px] mx-auto">
          <div className="cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img
              src="/logo/hicaplogo.png"
              alt="HiCap Logo"
              className="h-8 md:h-10"
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="relative" ref={mobileUserMenuRef}>
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-2 bg-transparent border border-[#ad2132] rounded cursor-pointer hover:bg-[#f8d7da] transition-colors"
                onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
              >
                <FaUserCircle className="text-[#ad2132] text-sm md:text-base" />
                <FaChevronDown className={`text-xs transition-transform ${showMobileUserMenu ? 'rotate-180' : ''}`} />
              </button>
              {showMobileUserMenu && (
                <div className="absolute right-0 top-full w-48 md:w-56 bg-white rounded-lg shadow-lg z-50 mt-2">
                  <div className="p-3 md:p-4 border-b border-gray-200">
                    <div className="font-semibold text-xs md:text-sm truncate max-w-full">{user?.name || 'User'}</div>
                    <div className="text-gray-600 text-xs truncate max-w-full">{user?.email || user?.phone}</div>
                  </div>
                  {dashboardMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        className={`flex items-center gap-2 w-full p-2.5 md:p-3 bg-transparent border-none text-left cursor-pointer text-xs md:text-sm hover:bg-[#f8d7da] hover:text-[#ad2132] transition-colors ${location.pathname === item.path ? 'text-[#ad2132]' : ''}`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <IconComponent className="text-xs md:text-sm" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <div className="h-px bg-gray-200 my-1"></div>
                  <button
                    className="flex items-center gap-2 w-full p-2.5 md:p-3 bg-transparent border-none text-left cursor-pointer text-xs md:text-sm text-[#d32f2f] hover:bg-[#f8d7da] transition-colors"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="text-xs md:text-sm" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
            <button
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-transparent border border-[#ad2132] text-[#ad2132] rounded cursor-pointer hover:bg-[#f8d7da] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes className="text-sm md:text-base" /> : <FaBars className="text-sm md:text-base" />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-0">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="relative">
                  <button
                    className={`flex items-center gap-1 md:gap-2 px-3 py-3 md:px-4 md:py-4 lg:px-5 lg:py-4 bg-transparent border-none rounded-md cursor-pointer text-sm md:text-base hover:text-[#ad2132] hover:bg-[#f8d7da] transition-colors ${location.pathname === item.path ? 'text-[#ad2132] bg-[#f8d7da]' : 'text-gray-600'}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <IconComponent className="text-sm md:text-base" />
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.shortLabel}</span>
                  </button>
                  {/* Vertical divider line - hide for last item */}
                  {idx < dashboardMenuItems.length - 1 && (
                    <div className="absolute right-[-5px] md:right-[-8px] lg:right-[-10px] top-1/2 transform -translate-y-1/2 h-4 md:h-5 lg:h-6 w-px bg-gray-300"></div>
                  )}
                </div>
              );
            })}

            <div className="relative ml-2" ref={userMenuRef}>
              <button
                className="flex items-center gap-1.5 md:gap-2.5 px-2.5 py-1.5 md:px-3 md:py-2 bg-transparent border border-gray-300 rounded-full cursor-pointer hover:border-[#ad2132] hover:bg-[#f8d7da] transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUserCircle className="text-lg md:text-xl text-gray-600" />
                <div className="text-left">
                  <div className="text-xs md:text-sm font-medium truncate max-w-[100px] md:max-w-[120px]">{user?.name || 'Account'}</div>
                  <div className="text-xs text-gray-600 truncate max-w-[100px] md:max-w-[120px]">{user?.email || user?.phone}</div>
                </div>
                <FaChevronDown className={`text-xs transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full w-48 md:w-56 bg-white rounded-lg shadow-lg z-50 mt-2">
                  <div className="p-3 md:p-4 border-b border-gray-200">
                    <div className="font-semibold text-xs md:text-sm truncate max-w-full">{user?.name || 'User'}</div>
                    <div className="text-gray-600 text-xs truncate max-w-full">{user?.email || user?.phone || 'Welcome!'}</div>
                  </div>
                  <div className="h-px bg-gray-200 my-1"></div>
                  <button
                    className="flex items-center gap-2 w-full p-2.5 md:p-3 bg-transparent border-none text-left cursor-pointer text-xs md:text-sm text-[#d32f2f] hover:bg-[#f8d7da] transition-colors"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="text-xs md:text-sm" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-full h-full z-[1060] pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`absolute top-0 left-0 w-full h-full bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 left-[-100%] w-full h-full bg-white transition-transform flex flex-col ${isMobileMenuOpen ? 'translate-x-full' : ''}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <img
              src="/logo/smalllogo.png"
              alt="HiCap Logo"
              className="h-8 md:h-10"
            />
            <button
              className="bg-transparent border-none text-xl md:text-2xl text-gray-800 cursor-pointer hover:text-[#ad2132] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-4 p-4 border-b border-gray-200">
            <div className="text-3xl md:text-4xl text-[#ad2132]">
              <FaUserCircle />
            </div>
            <div className="flex-grow">
              <div className="font-semibold mb-1 text-sm md:text-base">{user?.name || 'User'}</div>
              <div className="text-xs md:text-sm text-gray-600">{user?.email || user?.phone}</div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto py-2">
            {dashboardMenuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 cursor-pointer hover:bg-gray-50 hover:text-[#ad2132] transition-colors ${location.pathname === item.path ? 'bg-gray-50 text-[#ad2132]' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <IconComponent className="text-lg md:text-xl" />
                  <span className="text-sm md:text-base">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              className="flex items-center justify-center gap-2 w-full p-3 md:p-4 bg-transparent border border-[#d32f2f] text-[#d32f2f] rounded-md font-semibold cursor-pointer text-sm md:text-base hover:bg-[#f8d7da] transition-colors"
              onClick={onLogout}
            >
              <FaSignOutAlt className="text-lg md:text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
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
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return isLoggedIn ? (
    <UserHeader user={user} onLogout={handleLogout} />
  ) : (
    <GuestHeader onLogin={handleLogin} />
  );
};

export default Header;