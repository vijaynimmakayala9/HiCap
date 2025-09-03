import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaRegClock, FaPhone, FaLock } from 'react-icons/fa';
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
  const [selectedCategory, setSelectedCategory] = useState('Certified Programs');
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [categories, setCategories] = useState([]);
  const [categoryCourses, setCategoryCourses] = useState({});

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
        // { label: 'Blog', path: '/blog' },
        // { label: 'Events', path: '/events' },
        // { label: 'Certificates', path: '#' },
        { label: 'FAQs', path: '/faqs' }
      ]
    }
  ];

  // Enhanced screen size detection for better responsiveness
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) return 'mobile-small';
      if (width < 640) return 'mobile';
      if (width < 768) return 'mobile-large';
      if (width < 1024) return 'tablet';
      if (width < 1280) return 'laptop';
      if (width < 1536) return 'desktop';
      return 'desktop-large';
    };

    const checkScreenSize = () => {
      setScreenSize(getScreenSize());
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetch('http://31.97.206.144:5001/api/coursecontroller')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setCourses(data.data);

          // Define allowed categories
          const allowedCategories = ['Certified Programs', 'Elite Courses', 'Healthcare Courses'];

          // Filter categories to only include allowed ones
          const uniqueCategories = [...new Set(data.data.map(course => course.category))]
            .filter(category => allowedCategories.includes(category));

          // Set categories with View All option
          setCategories([...uniqueCategories, 'View All']);

          // Group courses by category, only for allowed categories
          const grouped = {};
          data.data.forEach(course => {
            if (allowedCategories.includes(course.category)) {
              if (!grouped[course.category]) {
                grouped[course.category] = [];
              }
              grouped[course.category].push(course);
            }
          });

          setCategoryCourses(grouped);
        } else {
          setCourses([]);
          setCategories(['Certified Programs', 'Elite Courses', 'Healthcare Courses', 'View All']);
        }
      })
      .catch((err) => {
        console.error(err);
        setCourses([]);
        setCategories(['Certified Programs', 'Elite Courses', 'Healthcare Courses', 'View All']);
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
      const response = await fetch('http://31.97.206.144:5001/api/userlogin', {
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

  const getResponsiveClasses = () => {
    switch (screenSize) {
      case 'mobile-small':
        return {
          navHeight: 'h-14',
          logoHeight: 'max-h-6',
          menuPadding: 'px-2',
          buttonPadding: 'px-2 py-1',
          buttonText: 'text-xs',
          iconSize: 'w-7 h-7',
          iconText: 'text-xs'
        };
      case 'mobile':
        return {
          navHeight: 'h-16',
          logoHeight: 'max-h-7',
          menuPadding: 'px-3',
          buttonPadding: 'px-2.5 py-1.5',
          buttonText: 'text-xs',
          iconSize: 'w-8 h-8',
          iconText: 'text-sm'
        };
      case 'mobile-large':
        return {
          navHeight: 'h-16',
          logoHeight: 'max-h-8',
          menuPadding: 'px-4',
          buttonPadding: 'px-3 py-1.5',
          buttonText: 'text-sm',
          iconSize: 'w-9 h-9',
          iconText: 'text-sm'
        };
      case 'tablet':
        return {
          navHeight: 'h-[70px]',
          logoHeight: 'max-h-9',
          menuPadding: 'px-5',
          buttonPadding: 'px-4 py-2',
          buttonText: 'text-sm',
          iconSize: 'w-10 h-10',
          iconText: 'text-base'
        };
      case 'laptop':
        return {
          navHeight: 'h-[70px]',
          logoHeight: 'max-h-10',
          menuPadding: 'px-6',
          buttonPadding: 'px-5 py-2',
          buttonText: 'text-sm',
          iconSize: 'w-10 h-10',
          iconText: 'text-base'
        };
      case 'desktop':
        return {
          navHeight: 'h-[75px]',
          logoHeight: 'max-h-11',
          menuPadding: 'px-6',
          buttonPadding: 'px-6 py-2.5',
          buttonText: 'text-base',
          iconSize: 'w-11 h-11',
          iconText: 'text-base'
        };
      default: // desktop-large
        return {
          navHeight: 'h-20',
          logoHeight: 'max-h-12',
          menuPadding: 'px-8',
          buttonPadding: 'px-8 py-3',
          buttonText: 'text-base',
          iconSize: 'w-12 h-12',
          iconText: 'text-lg'
        };
    }
  };

  const responsiveClasses = getResponsiveClasses();

  const MegaMenu = () => (
    <div
      ref={megaMenuRef}
      className={`absolute ${screenSize === 'tablet' ? 'left-0' : 'left-1/2 transform -translate-x-1/2'} 
        ${screenSize === 'mobile-small' ? 'w-[98vw]' : screenSize === 'mobile' ? 'w-[96vw]' : 'w-[95vw]'} 
        ${screenSize === 'desktop-large' ? 'max-w-[1000px]' : screenSize === 'desktop' ? 'max-w-[900px]' : screenSize === 'laptop' ? 'max-w-[800px]' : 'max-w-[700px]'} 
        bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto top-full mt-1`}
      onMouseEnter={handleCoursesMouseEnter}
      onMouseLeave={handleCoursesMouseLeave}
    >
      <div className={`flex flex-col ${screenSize === 'mobile-small' ? 'p-2' : screenSize === 'mobile' ? 'p-3' : 'p-4'} ${screenSize === 'laptop' || screenSize === 'desktop' || screenSize === 'desktop-large' ? 'md:flex-row' : ''} ${screenSize === 'desktop' || screenSize === 'desktop-large' ? 'md:p-6' : 'md:p-5'}`}>
        <div className={`flex-none w-full ${screenSize === 'laptop' || screenSize === 'desktop' || screenSize === 'desktop-large' ? 'md:w-1/4 md:pr-4 md:border-r' : ''} border-gray-200 ${screenSize === 'laptop' || screenSize === 'desktop' || screenSize === 'desktop-large' ? 'mb-4 md:mb-0' : 'mb-4'}`}>
          <h6 className={`font-bold text-[#a51d34] mb-3 ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' ? 'text-sm' : 'text-base'}`}>Course Categories</h6>
          <ul className={`list-none p-0 m-0 flex ${screenSize === 'laptop' || screenSize === 'desktop' || screenSize === 'desktop-large' ? 'flex-col md:flex-col' : 'flex-col'} ${screenSize === 'mobile-small' || screenSize === 'mobile' ? 'overflow-x-auto' : ''} ${screenSize === 'mobile-small' || screenSize === 'mobile' ? 'pb-2 md:pb-0' : ''}`}>
            {categories.map((category) => (
              <li
                key={category}
                className={`mb-2 ${screenSize === 'mobile-small' || screenSize === 'mobile' ? 'flex-shrink-0 md:flex-shrink mr-2 md:mr-0' : ''}`}
                onMouseEnter={() => {
                  if (category !== 'View All') {
                    setSelectedCategory(category);
                  }
                }}
              >
                <button
                  className={`w-full text-left p-2 rounded-md ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' || screenSize === 'tablet' ? 'text-sm' : 'text-sm md:text-base'} ${selectedCategory === category ? 'bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white' : 'bg-transparent hover:bg-gray-100'}`}
                  onClick={() => {
                    if (category === 'View All') {
                      navigate('/allcourses');
                      setShowCoursesMenu(false);
                    } else {
                      setSelectedCategory(category);
                    }
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex-1 ${screenSize === 'laptop' || screenSize === 'desktop' || screenSize === 'desktop-large' ? 'md:pl-4' : ''}`}>
          <h6 className={`font-bold text-[#a51d34] mb-3 ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' ? 'text-sm' : 'text-base'}`}>{selectedCategory}</h6>
          <div className={`grid ${screenSize === 'mobile-small' ? 'grid-cols-1' : screenSize === 'mobile' || screenSize === 'mobile-large' ? 'grid-cols-1 sm:grid-cols-2' : screenSize === 'tablet' ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-2'} ${screenSize === 'mobile-small' ? 'gap-2' : 'gap-3'}`}>
            {categoryCourses[selectedCategory]?.slice(0, screenSize === 'desktop-large' ? 12 : 10).map((course) => (
              <div key={course._id} className="cursor-pointer">
                <div
                  className={`flex gap-2 ${screenSize === 'mobile-small' ? 'p-2' : 'p-3'} rounded-lg transition-colors hover:bg-[#f8d7da]`}
                  onClick={() => {
                    handleCourseClick(course._id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className={`flex-shrink-0 p-1 rounded-circle ${screenSize === 'mobile-small' ? 'w-6 h-6' : screenSize === 'mobile' ? 'w-7 h-7' : screenSize === 'mobile-large' ? 'w-8 h-8' : 'w-10 h-10'} bg-white-500 rounded-lg flex items-center justify-center overflow-hidden`}>
                    <img src={course.logoImage} alt={course.name} className="w-full h-full object-cover img-fluid  rounded-square" />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className={`font-medium ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' ? 'text-sm' : 'text-sm md:text-base'} whitespace-nowrap overflow-hidden text-ellipsis`}>{course.name}</div>
                    <div className={`flex items-center gap-1 text-gray-600 ${screenSize === 'mobile-small' ? 'text-xs' : 'text-xs'} mt-1`}>
                      <span>{course.category || 'N/A'}</span>
                      <span>•</span>
                      <span>{course.duration || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!categoryCourses[selectedCategory] || categoryCourses[selectedCategory].length === 0) && (
            <div className={`text-center p-6 text-gray-600 ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'}`}>
              No courses available in this category
            </div>
          )}
        </div>
      </div>

      <div className={`${screenSize === 'mobile-small' ? 'p-2' : screenSize === 'mobile' ? 'p-3' : 'p-4'} ${screenSize === 'desktop' || screenSize === 'desktop-large' ? 'md:p-5' : ''} border-t border-gray-200`}>
        <div className="mb-3">
          <h6 className={`font-bold text-[#a51d34] mb-1 ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' ? 'text-sm' : 'text-base'}`}>Can't find what you're looking for?</h6>
          <p className={`text-gray-600 ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} m-0`}>Browse our complete course catalog or talk to our advisors</p>
        </div>
        <div className={`flex ${screenSize === 'mobile-small' ? 'flex-col' : 'flex-col sm:flex-row'} gap-2`}>
          <button
            className={`flex-1 p-2 bg-transparent border border-[#a51d34] text-[#a51d34] rounded ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} cursor-pointer hover:bg-[#a51d34] hover:text-black transition-colors`}
            onClick={() => {
              navigate('/courses');
              setShowCoursesMenu(false);
            }}
          >
            View All Courses
          </button>
          <button
            className={`p-2 bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} hover:opacity-90 transition-opacity`}
            onClick={() => {
              setShowCoursesMenu(false);
              setIsMobileMenuOpen(false);
              window.location.href = "tel:9876543211";
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
      className={`absolute left-0 top-full ${screenSize === 'tablet' ? 'min-w-[180px]' : screenSize === 'laptop' ? 'min-w-[200px]' : screenSize === 'desktop' || screenSize === 'desktop-large' ? 'min-w-[220px]' : 'min-w-[160px]'} bg-white rounded-lg shadow-lg z-50 mt-1`}
      onMouseEnter={handleResourcesMouseEnter}
      onMouseLeave={handleResourcesMouseLeave}
    >
      <ul className="list-none p-2 m-0">
        {menuItems.find(item => item.label === 'Services').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left p-2 rounded-md ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' || screenSize === 'tablet' ? 'text-sm' : 'text-sm md:text-base'} transition-all hover:bg-[#f8d7da] hover:text-[#a51d34] ${location.pathname === item.path ? 'text-[#a51d34] bg-[#f8d7da]' : 'bg-transparent'}`}
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
      className={`absolute left-0 top-full ${screenSize === 'tablet' ? 'min-w-[180px]' : screenSize === 'laptop' ? 'min-w-[200px]' : screenSize === 'desktop' || screenSize === 'desktop-large' ? 'min-w-[220px]' : 'min-w-[160px]'} bg-white rounded-lg shadow-lg z-50 mt-1`}
      onMouseEnter={handleCompanyMouseEnter}
      onMouseLeave={handleCompanyMouseLeave}
    >
      <ul className="list-none p-2 m-0">
        {menuItems.find(item => item.label === 'Company').items.map((item, idx) => (
          <li key={idx}>
            <button
              className={`w-full text-left p-2 rounded-md ${screenSize === 'mobile-small' ? 'text-xs' : screenSize === 'mobile' || screenSize === 'mobile-large' || screenSize === 'tablet' ? 'text-sm' : 'text-sm md:text-base'} transition-all hover:bg-[#f8d7da] hover:text-[#a51d34] ${location.pathname === item.path ? 'text-[#a51d34] bg-[#f8d7da]' : 'bg-transparent'}`}
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
    <div className={`${screenSize === 'mobile-small' ? 'p-2' : 'p-3'} bg-gray-50 rounded-lg mt-2`}>
      {categories.map((category) => (
        <div
          key={category}
          className="mb-4"
          onMouseEnter={() => {
            if (category !== 'View All') {
              setSelectedCategory(category);
            }
          }}
        >
          <h6 className={`font-bold text-gray-600 ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} mb-2`}>{category}</h6>
          {category !== 'View All' ? (
            <ul className="list-none p-0 m-0">
              {categoryCourses[category]?.slice(0, 10).map((course) => (
                <li key={course._id} className="mb-2 cursor-pointer">
                  <div
                    className={`flex items-center gap-2 ${screenSize === 'mobile-small' ? 'p-1.5' : 'p-2'} bg-white rounded-md hover:bg-[#f8d7da] transition-colors`}
                    onClick={() => {
                      console.log('Mobile course clicked:', course._id);
                      handleCourseClick(course._id);
                    }}
                  >
                    <div className={`${screenSize === 'mobile-small' ? 'w-6 h-6' : screenSize === 'mobile' ? 'w-7 h-7' : 'w-8 h-8'} ${screenSize === 'tablet' ? 'md:w-10 md:h-10' : ''} bg-gray-200 rounded-md overflow-hidden flex-shrink-0`}>
                      <img src={course.logoImage} alt={course.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className={`font-medium ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} ${screenSize === 'tablet' ? 'md:text-base' : ''} whitespace-nowrap overflow-hidden text-ellipsis`}>{course.name}</div>
                      <div className={`flex items-center gap-1 text-gray-600 ${screenSize === 'mobile-small' ? 'text-xs' : 'text-xs'} mt-0.5`}>
                        <FaRegClock className="text-[10px]" />
                        <span>{course.category || 'N/A'}</span>
                        <span>•</span>
                        <span>{course.duration || 0}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <button
              className={`w-full p-2 bg-transparent border border-[#a51d34] text-[#a51d34] rounded cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} hover:bg-[#a51d34] hover:text-black transition-colors`}
              onClick={() => {
                navigate('/allcourses');
                setShowCoursesMenu(false);
                setIsMobileMenuOpen(false);
              }}
            >
              View All Courses
            </button>
          )}
        </div>
      ))}
      <div className={`grid gap-2 pt-2 border-t border-gray-300`}>
        <button
          className={`p-2 bg-transparent border border-[#a51d34] text-[#a51d34] rounded cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} hover:bg-[#a51d34] hover:text-white transition-colors`}
          onClick={() => {
            navigate('/courses');
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
          }}
        >
          View All Courses
        </button>
        <button
          className={`p-2 bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} hover:opacity-90 transition-opacity`}
          onClick={() => {
            setShowCoursesMenu(false);
            setIsMobileMenuOpen(false);
            window.location.href = "tel:9876543211";
          }}
        >
          Contact Advisor
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full ${responsiveClasses.navHeight} bg-white shadow-md z-50 transition-all ${isScrolled ? 'bg-white/95 backdrop-blur-md' : ''}`}>
        <div className={`flex justify-around items-center h-full ${responsiveClasses.menuPadding} ${screenSize === 'desktop-large' ? 'max-w-[1600px]' : screenSize === 'desktop' ? 'max-w-[1400px]' : screenSize === 'laptop' ? 'max-w-[1200px]' : 'max-w-full'} mx-auto`}>
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo/smalllogo.png"
              alt="HiCap Logo"
              className={`${responsiveClasses.logoHeight} w-auto object-contain`}
            />
          </div>

          {/* Mobile Menu Button and Login */}
          <div className={`flex items-center ${screenSize === 'mobile-small' ? 'gap-1.5' : 'gap-2'} lg:hidden`}>
            <button
              onClick={() => setShowLoginModal(true)}
              className={`${responsiveClasses.buttonPadding} bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded ${responsiveClasses.buttonText} cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity`}
            >
              Login
            </button>
            <button
              className={`${responsiveClasses.iconSize} flex items-center justify-center bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FaTimes className={responsiveClasses.iconText} /> : <FaBars className={responsiveClasses.iconText} />}
            </button>
          </div>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-4">
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
                      className={`flex items-center px-3 py-2 text-base font-medium text-gray-800 cursor-pointer rounded-md transition-all relative ${showCoursesMenu ? 'text-[#a51d34]' : 'hover:text-[#a51d34]'}`}
                      onClick={() => {
                        setShowCoursesMenu(!showCoursesMenu);
                        setShowResourcesMenu(false);
                        setShowCompanyMenu(false);
                      }}
                    >
                      Courses <FaChevronDown className={`ml-1 text-sm transition-transform ${showCoursesMenu ? 'rotate-180' : ''}`} />
                    </span>
                    {showCoursesMenu && <MegaMenu />}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-5 border-r border-gray-300"></span>
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
                      className={`flex items-center px-3 py-2 text-base font-medium cursor-pointer rounded-md transition-all ${((item.label === 'Services' && showResourcesMenu) || (item.label === 'Company' && showCompanyMenu)) ? 'text-[#a51d34]' : 'text-gray-800 hover:text-[#a51d34]'}`}
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
                      {item.label} <FaChevronDown className={`ml-1 text-sm transition-transform ${((item.label === 'Services' && showResourcesMenu) || (item.label === 'Company' && showCompanyMenu)) ? 'rotate-180' : ''}`} />
                    </span>
                    {item.label === 'Services' && showResourcesMenu && <ResourcesDropdown />}
                    {item.label === 'Company' && showCompanyMenu && <CompanyDropdown />}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-5 w-px bg-gray-300"></div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="relative flex items-center">
                    <span
                      className={`px-3 py-2 text-base font-medium cursor-pointer rounded-md transition-colors ${location.pathname === item.path ? 'text-[#a51d34]' : 'text-gray-800 hover:text-[#a51d34]'}`}
                      onClick={() => handleNavigate(item.path)}
                    >
                      {item.label}
                    </span>
                    {/* Optional vertical separator */}
                    {idx < menuItems.length - 1 && <div className="h-5 w-px bg-gray-300 ml-1"></div>}
                  </div>
                );
              }
            })}



            <button
              onClick={() => setShowLoginModal(true)}
              className={`ml-2 ${screenSize === 'laptop' ? 'mx-2 px-4 py-2' : screenSize === 'desktop' ? 'mx-2.5 px-4 py-2' : 'mx-3 px-8 py-2'} bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded-full font-semibold ${screenSize === 'laptop' ? 'text-sm' : screenSize === 'desktop' ? 'text-base' : 'text-base'} cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity`}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed top-0 left-0 w-full h-full z-[1060] pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`absolute top-0 left-0 w-full h-full bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 left-[-100%] w-full h-full bg-white transition-transform flex flex-col ${isMobileMenuOpen ? 'translate-x-full' : ''}`}>
          <div className={`flex justify-between items-center ${screenSize === 'mobile-small' ? 'p-3' : 'p-4'} border-b border-gray-200`}>
            <img
              src="/logo/hicapnewlogo.png"
              alt="HiCap Logo"
              className={`${screenSize === 'mobile-small' ? 'h-7' : screenSize === 'mobile' ? 'h-8' : 'h-10'}`}
            />
            <button
              className={`bg-transparent border-none ${screenSize === 'mobile-small' ? 'text-lg' : screenSize === 'mobile' ? 'text-xl' : 'text-2xl'} text-gray-800 cursor-pointer hover:text-[#a51d34] transition-colors`}
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
                      className={`flex justify-between items-center ${screenSize === 'mobile-small' ? 'p-2.5' : 'p-3'} cursor-pointer transition-all hover:bg-gray-50`}
                      onClick={() => {
                        setShowMobileCoursesMenu(!showMobileCoursesMenu);
                        setShowMobileResourcesMenu(false);
                        setShowMobileCompanyMenu(false);
                      }}
                    >
                      <span className={`${screenSize === 'mobile-small' ? 'text-sm' : 'text-base'} font-medium text-gray-800`}>{item.label}</span>
                      <FaChevronDown className={`${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} text-gray-600 transition-transform ${showMobileCoursesMenu ? 'rotate-180' : ''}`} />
                    </div>
                    {showMobileCoursesMenu && <MobileMegaMenu />}
                  </div>
                );
              } else if (item.isDropdown) {
                return (
                  <div key={idx} className="border-b border-gray-100 last:border-b-0">
                    <div
                      className={`flex justify-between items-center ${screenSize === 'mobile-small' ? 'p-2.5' : 'p-3'} cursor-pointer transition-all hover:bg-gray-50`}
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
                      <span className={`${screenSize === 'mobile-small' ? 'text-sm' : 'text-base'} font-medium text-gray-800`}>{item.label}</span>
                      <FaChevronDown className={`${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} text-gray-600 transition-transform ${(item.label === 'Services' && showMobileResourcesMenu) || (item.label === 'Company' && showMobileCompanyMenu) ? 'rotate-180' : ''}`} />
                    </div>
                    {showMobileResourcesMenu && item.label === 'Services' && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {item.items.map((subItem, subIdx) => (
                          <div
                            key={subIdx}
                            className={`${screenSize === 'mobile-small' ? 'p-2.5 pl-6' : 'p-3 pl-8'} cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} text-gray-700 transition-all border-b border-gray-100 last:border-b-0 hover:bg-white hover:text-[#a51d34] ${location.pathname === subItem.path ? 'text-[#a51d34] bg-white' : ''}`}
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
                            className={`${screenSize === 'mobile-small' ? 'p-2.5 pl-6' : 'p-3 pl-8'} cursor-pointer ${screenSize === 'mobile-small' ? 'text-xs' : 'text-sm'} text-gray-700 transition-all border-b border-gray-100 last:border-b-0 hover:bg-white hover:text-[#a51d34] ${location.pathname === subItem.path ? 'text-[#a51d34] bg-white' : ''}`}
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
                    className={`${screenSize === 'mobile-small' ? 'p-2.5' : 'p-3'} cursor-pointer transition-all border-b border-gray-100 last:border-b-0 hover:bg-gray-50 hover:text-[#a51d34] ${location.pathname === item.path ? 'text-[#a51d34] bg-[#f8d7da]' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span className={`${screenSize === 'mobile-small' ? 'text-sm' : 'text-base'} font-medium`}>{item.label}</span>
                  </div>
                );
              }
            })}
          </div>

          <div className={`${screenSize === 'mobile-small' ? 'p-3' : 'p-4'} border-t border-gray-200`}>
            <button
              className={`w-full ${screenSize === 'mobile-small' ? 'p-2.5' : 'p-3'} bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white border-none rounded-md font-semibold cursor-pointer ${screenSize === 'mobile-small' ? 'text-sm' : 'text-base'} hover:opacity-90 transition-opacity`}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1070] flex items-center justify-center p-2 sm:p-4 md:p-6">
          <div
            ref={modalRef}
            className={`bg-white rounded-lg md:rounded-xl ${screenSize === 'mobile-small' ? 'p-4 w-full max-w-[95%]' : screenSize === 'mobile' ? 'p-4 w-full max-w-[90%]' : screenSize === 'mobile-large' ? 'p-5 w-full max-w-[85%] sm:max-w-[360px]' : screenSize === 'tablet' ? 'p-5 w-full max-w-[420px]' : screenSize === 'laptop' ? 'p-6 w-full max-w-[450px]' : 'p-6 w-full max-w-[480px]'} shadow-2xl`}
          >
            <div className={`flex justify-center ${screenSize === 'mobile-small' ? 'mb-3' : 'mb-4 sm:mb-5'}`}>
              <img
                src="/logo/hicaplogo.png"
                alt="Logo"
                className={`${screenSize === 'mobile-small' ? 'w-14' : screenSize === 'mobile' ? 'w-16' : screenSize === 'mobile-large' ? 'w-18 sm:w-20' : screenSize === 'tablet' ? 'w-22 md:w-24' : screenSize === 'laptop' ? 'w-24 lg:w-26' : 'w-26 lg:w-28'} h-auto object-contain`}
              />
            </div>

            <div className={`flex justify-between items-center ${screenSize === 'mobile-small' ? 'mb-4' : 'mb-4 sm:mb-5 md:mb-6'}`}>
              <h4 className={`text-[#a51d34] ${screenSize === 'mobile-small' ? 'text-base' : screenSize === 'mobile' ? 'text-lg' : screenSize === 'mobile-large' ? 'text-lg sm:text-xl' : screenSize === 'tablet' ? 'text-xl md:text-2xl' : 'text-xl lg:text-2xl'} font-semibold m-0`}>
                Login
              </h4>
              <button
                onClick={() => setShowLoginModal(false)}
                className={`bg-transparent border-none ${screenSize === 'mobile-small' ? 'text-lg' : screenSize === 'mobile' ? 'text-xl' : 'text-xl sm:text-2xl'} cursor-pointer hover:text-gray-600 transition-colors`}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className={`${screenSize === 'mobile-small' ? 'p-2' : 'p-2 sm:p-2.5'} bg-[#f8d7da] text-[#721c24] rounded ${screenSize === 'mobile-small' ? 'mb-3' : 'mb-3 sm:mb-4'} ${screenSize === 'mobile-small' ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                  {loginError}
                </div>
              )}

              <div className={`${screenSize === 'mobile-small' ? 'mb-3' : 'mb-3 sm:mb-4 md:mb-5'}`}>
                <div className="relative">
                  <FaPhone className={`absolute ${screenSize === 'mobile-small' ? 'left-3' : 'left-3 sm:left-4'} top-1/2 -translate-y-1/2 text-gray-600 ${screenSize === 'mobile-small' ? 'text-sm' : screenSize === 'mobile' ? 'text-base' : 'text-base sm:text-lg md:text-xl'}`} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleLoginChange}
                    placeholder="Phone Number"
                    required
                    className={`w-full ${screenSize === 'mobile-small' ? 'py-2 pl-9 pr-3' : screenSize === 'mobile' ? 'py-2 pl-10 pr-3' : 'py-2 sm:py-2.5 md:py-3 pl-10 sm:pl-12 md:pl-12 pr-3'} border border-gray-300 rounded-md ${screenSize === 'mobile-small' ? 'text-sm' : screenSize === 'mobile' ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} focus:border-[#a51d34] focus:outline-none focus:ring-1 focus:ring-[#a51d34] transition-colors`}
                  />
                </div>
              </div>

              <div className={`${screenSize === 'mobile-small' ? 'mb-3' : 'mb-3 sm:mb-4 md:mb-5'}`}>
                <div className="relative">
                  <FaLock className={`absolute ${screenSize === 'mobile-small' ? 'left-3' : 'left-3 sm:left-4'} top-1/2 -translate-y-1/2 text-gray-600 ${screenSize === 'mobile-small' ? 'text-sm' : screenSize === 'mobile' ? 'text-base' : 'text-base sm:text-lg md:text-xl'}`} />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                    className={`w-full ${screenSize === 'mobile-small' ? 'py-2 pl-9 pr-3' : screenSize === 'mobile' ? 'py-2 pl-10 pr-3' : 'py-2 sm:py-2.5 md:py-3 pl-10 sm:pl-12 md:pl-12 pr-3'} border border-gray-300 rounded-md ${screenSize === 'mobile-small' ? 'text-sm' : screenSize === 'mobile' ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} focus:border-[#a51d34] focus:outline-none focus:ring-1 focus:ring-[#a51d34] transition-colors`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full ${screenSize === 'mobile-small' ? 'py-2' : screenSize === 'mobile' ? 'py-2.5' : 'py-2 sm:py-2.5 md:py-3'} bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white rounded-md font-semibold ${screenSize === 'mobile-small' ? 'text-sm' : screenSize === 'mobile' ? 'text-sm' : 'text-sm sm:text-base md:text-lg'} cursor-pointer hover:opacity-90 transition-opacity ${isLoggingIn ? "opacity-80" : ""}`}
              >
                {isLoggingIn ? (
                  <>
                    <span className={`inline-block ${screenSize === 'mobile-small' ? 'w-3 h-3' : screenSize === 'mobile' ? 'w-3 h-3' : 'w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'} border-2 border-white/30 rounded-full border-t-white animate-spin mr-2`}></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
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

export default GuestHeader;