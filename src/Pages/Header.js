import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const resourcesSubMenu = [
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
  ];

  const baseMenuItems = isLoggedIn
    ? [
        { label: 'Home', path: '/' },
        { label: 'Courses', path: '/courses' },
        { label: 'Interviews', path: '/interviews' },
        { label: 'Certificate', path: '/certificate' },
        { label: 'Doubt Session', path: '/doubtsession' },
        { label: 'Contact Us', path: '/contactus' },
        { label: 'Resources', subMenu: resourcesSubMenu },
        { label: 'Clients', path: '/clients' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/aboutus'},
        { label: 'Courses', path: '/courses' },
        { label: 'Contact Us', path: '/contactus' },
        { label: 'Our Mentors', path: '/ourmentors' },
        { label: 'Resources', subMenu: resourcesSubMenu },        
        { label: 'UpCommingBatches', path: '/upcommingbatches'},
        { label: 'Clients', path: '/clients' },
      ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!(token && userId));
  }, []);

  useEffect(() => {
    const found = baseMenuItems.find(item =>
      item.path === location.pathname || item.subMenu?.some(sub => sub.path === location.pathname)
    );
    setActive(found?.label || '');
  }, [location.pathname]);

  const handleClick = (item) => {
    if (item.subMenu) {
      setShowResourcesDropdown((prev) => !prev);
    } else {
      navigate(item.path);
      setIsOpen(false);
      setShowResourcesDropdown(false);
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
        window.location.reload();
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
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-[#007860]" />
        </div>
      )}

      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between">
        <div className="text-xl font-bold text-black">LOGO</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium relative">
          {baseMenuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => item.subMenu && setShowResourcesDropdown(true)}
              onMouseLeave={() => item.subMenu && setShowResourcesDropdown(false)}
            >
              <button
                onClick={() => handleClick(item)}
                className={`px-1 py-2 cursor-pointer ${
                  active === item.label ? 'border-b-[2px] border-[#007860] font-semibold' : ''
                }`}
              >
                {item.label}
              </button>

              {/* Dropdown for Resources */}
              {item.label === 'Resources' && showResourcesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg rounded z-10">
                  {item.subMenu.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(sub.path);
                        setShowResourcesDropdown(false);
                        setActive(item.label);
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-[#007860] hover:bg-[#00604d] text-white px-4 py-1.5 rounded"
            >
              Logout →
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="ml-4 bg-[#007860] hover:bg-[#00604d] text-white px-4 py-1.5 rounded"
            >
              Login →
            </button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 text-sm">
          {baseMenuItems.map((item, idx) => (
            <div key={idx}>
              <div
                className={`py-2 cursor-pointer ${
                  active === item.label ? 'font-semibold border-b-[2px] border-[#007860]' : ''
                }`}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </div>

              {item.label === 'Resources' && showResourcesDropdown && (
                <div className="pl-4 space-y-1">
                  {item.subMenu.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="text-sm cursor-pointer py-1"
                      onClick={() => {
                        navigate(sub.path);
                        setShowResourcesDropdown(false);
                        setIsOpen(false);
                        setActive(item.label);
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-[#007860] text-white py-2 rounded"
            >
              Logout →
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full bg-[#007860] text-white py-2 rounded"
            >
              Login →
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-2 rounded text-white ${
                isLoading ? 'bg-gray-400' : 'bg-[#007860]'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full mt-2 text-[#007860] text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
