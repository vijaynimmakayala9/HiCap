import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserLayout = ({ user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setIsSidebarCollapsed(true);
      } else {
        // Keep user preference on desktop, default to expanded
        const savedPreference = localStorage.getItem('sidebarCollapsed');
        if (savedPreference !== null) {
          setIsSidebarCollapsed(savedPreference === 'true');
        } else {
          setIsSidebarCollapsed(false);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save sidebar state preference
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
    }
  }, [isSidebarCollapsed, isMobile]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="d-flex bg-light" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <UserSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        isMobile={isMobile}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isMobile ? 0 : (isSidebarCollapsed ? '80px' : '250px'),
          transition: 'margin-left 0.3s ease',
          width: isMobile ? '100%' : `calc(100% - ${isSidebarCollapsed ? '80px' : '250px'})`
        }}
      >
        {/* Top Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ 
            background: 'linear-gradient(90deg, #ff5e62, #ff9966)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '0.75rem 1rem'
          }}
        >
          <div className="container-fluid">
            {isMobile && (
              <button
                className="btn btn-outline-light me-2"
                onClick={handleToggleSidebar}
                aria-label="Toggle sidebar"
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
            <div className="ms-auto text-white text-end">
              <div className="fw-bold">{user?.name || 'User'}</div>
              <small>{user?.email || user?.phone}</small>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-3 p-md-4" style={{ minHeight: 'calc(100vh - 80px)', background: '#f8f9fa' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;