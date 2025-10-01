import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaTachometerAlt,
  FaQuestionCircle,
  FaVideo,
  FaBook,
  FaCertificate,
  FaBars,
  FaArrowLeft,
  FaArrowRight,
  FaSignOutAlt,
  FaUserCircle,
  FaReceipt
} from 'react-icons/fa';

const UserSidebar = ({ isCollapsed, onToggleCollapse, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/dashboard/interviews', icon: <FaQuestionCircle />, label: 'Interviews' },
    { path: '/dashboard/live-classes', icon: <FaVideo />, label: 'Live Classes' },
    { path: '/dashboard/coursemodule', icon: <FaBook />, label: 'Course Module' },
    // { path: '/dashboard/doubt-session', icon: <FaQuestionCircle />, label: 'Doubt Session' },
    { path: '/dashboard/certificate', icon: <FaCertificate />, label: 'Certificate' },
    // { path: '/dashboard/acknowledge', icon: <FaReceipt />, label: 'Acknowledgement' },    
    { path: '/', icon: <FaSignOutAlt />, label: 'Logout', onClick: handleLogout }
  ];


  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="position-fixed vh-100 vw-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1029, left: 0, top: 0 }}
          onClick={() => onToggleCollapse(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className="position-fixed vh-100 d-flex flex-column"
        style={{
          width: isMobile ? (isCollapsed ? '0' : '250px') : isCollapsed ? '80px' : '250px',
          background: 'linear-gradient(to bottom, #c94a5a, #c94a5a, #c94a5a, #c94a5a, #c94a5a)',
          color: 'white',
          zIndex: 1030,
          transition: 'all 0.3s ease',
          overflowX: 'hidden',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Collapse Button */}
        <div className="d-flex justify-content-end align-items-center p-3">
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            onClick={() => onToggleCollapse(!isCollapsed)}
          >
            {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
          </button>
        </div>

        {/* Profile Section */}
        {!isCollapsed && (
          <div className="d-flex flex-column align-items-center text-center mt-3 mb-3 px-2">
            <div
              className="bg-light rounded-circle mb-2"
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <FaUserCircle className="text-danger" size={40} />
            </div>
            <p className="text-white fw-semibold mb-0">{user?.name || 'Student Name'}</p>
            <p className="text-white-50 small mb-0">{user?.email || 'student@example.com'}</p>
          </div>
        )}

        {/* Menu */}
        <ul className="nav flex-column px-2 mt-3">
          {menuItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <li key={item.label} className="nav-item mb-2">
                {item.onClick ? (
                  <div
                    className={`nav-link d-flex align-items-center text-white rounded ${isActive ? 'active' : ''
                      }`}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'all 0.2s ease',
                      padding: '12px 15px'
                    }}
                    onClick={item.onClick}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className={isCollapsed ? '' : 'me-3'} style={{ fontSize: '1.1rem' }}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span style={{ fontSize: '0.95rem' }}>{item.label}</span>}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center text-white rounded ${isActive ? 'active' : ''
                      }`}
                    style={{
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'all 0.2s ease',
                      padding: '12px 15px',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className={isCollapsed ? '' : 'me-3'} style={{ fontSize: '1.1rem' }}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span style={{ fontSize: '0.95rem' }}>{item.label}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

UserSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
};

export default UserSidebar;
