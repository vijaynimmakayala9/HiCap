import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');  // Renamed from mobile to phoneNumber
  const [password, setPassword] = useState('');  // Added password field
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = isLoggedIn 
    ? ['Home', 'Courses', 'Interviews', 'Certificate', 'Doubt Session', 'Contact Us', 'Resources'] 
    : ['Home', 'Courses', 'Contact Us', 'Our Mentors', 'Resources'];

  // Check login status on mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!(userId && token));
  }, []);

  // Handle active menu highlighting
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActive('Home');
    else if (path === '/courses') setActive('Courses');
    else if (path === '/contactus') setActive('Contact Us');
    else if (path === '/ourmentors') setActive('Our Mentors');
    else if (path === '/doubtsession') setActive('Doubt Session');
    else if (path === '/certificate') setActive('Certificate');
    else if (path === '/interviews') setActive('Interviews');
    else if (['/aboutus', '/blog', '/faq'].includes(path)) setActive('Resources');
    else setActive('');  // Default fallback
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle login with loader
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      alert('Phone number and password are required');
      return;
    }

    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      alert('Invalid phone number format');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://hicapbackend.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),  // Sending phoneNumber and password
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        window.location.reload();
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout with loader
  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Handle menu clicks
  const handleClick = (item) => {
    setActive(item);
    if (item !== 'Resources') {
      navigate(getPath(item));
      setShowResourcesDropdown(false);
      setIsOpen(false);
    } else {
      setShowResourcesDropdown((prev) => !prev);
    }
  };

  // Path mapping helper
  const getPath = (item) => {
    switch (item) {
      case 'Home': return '/';
      case 'Courses': return '/courses';
      case 'Contact Us': return '/contactus';
      case 'Our Mentors': return '/ourmentors';
      case 'Doubt Session': return '/doubtsession';
      case 'Certificate': return '/certificate';
      case 'Interviews': return '/interviews';
      case 'About Us': return '/aboutus';
      case 'Blog': return '/blog';
      case 'FAQ': return '/faq';
      default: return '/';
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md h-[60px] font-roboto z-50">
      {/* Global Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#007860]"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* LOGO */}
        <div className="text-xl font-bold text-black">LOGO</div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 text-black font-medium relative">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center cursor-pointer ${active === item ? 'font-bold' : 'font-normal'}`}
              onClick={() => handleClick(item)}
              onMouseEnter={() => item === 'Resources' && setShowResourcesDropdown(true)}
              onMouseLeave={() => item === 'Resources' && setShowResourcesDropdown(false)}
            >
              <span>{item}</span>

              {active === item && (
                <span className="absolute left-0 bottom-[-6px] h-1.5 rounded-full bg-[#007860]" style={{ width: '100%' }} />
              )}

              {item === 'Resources' && showResourcesDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded border w-48 z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => handleClick('About Us')}
                  >
                    About Us
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => handleClick('Blog')}
                  >
                    Blog
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => handleClick('FAQ')}
                  >
                    FAQ
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#007860] hover:bg-[#00604d] text-white px-4 py-1.5 rounded flex items-center space-x-2"
            >
              <span>Logout</span>
              <span className="text-lg">→</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#007860] hover:bg-[#00604d] text-white px-4 py-1.5 rounded flex items-center space-x-2"
            >
              <span>Login</span>
              <span className="text-lg">→</span>
            </button>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden ml-auto">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-black">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleClick(item)}
                className={`cursor-pointer flex items-center justify-between py-2 ${active === item ? 'font-bold' : ''}`}
              >
                <span>{item}</span>
              </div>

              {item === 'Resources' && showResourcesDropdown && (
                <div className="pl-4 space-y-1">
                  <button onClick={() => handleClick('About Us')} className="text-sm">About Us</button>
                  <button onClick={() => handleClick('Blog')} className="text-sm">Blog</button>
                  <button onClick={() => handleClick('FAQ')} className="text-sm">FAQ</button>
                </div>
              )}
            </div>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-[#007860] hover:bg-[#00604d] text-white py-2 rounded flex items-center justify-center space-x-2"
            >
              <span>Logout</span>
              <span className="text-lg">→</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full bg-[#007860] hover:bg-[#00604d] text-white py-2 rounded flex items-center justify-center space-x-2"
            >
              <span>Login</span>
              <span className="text-lg">→</span>
            </button>
          )}
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mt-1"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg mt-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#007860] hover:bg-[#00604d]'} text-white py-2 rounded-lg flex items-center justify-center`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              disabled={isLoading}
              className="w-full text-center mt-2 text-[#007860] disabled:text-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
