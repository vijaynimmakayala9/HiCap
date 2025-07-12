import React from 'react';
import {
  FaHome,
  FaAddressBook,
  FaCogs,
  FaLock,
  FaInfoCircle,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt // ✅ Import new Dashboard icon
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-8">User Panel</h2>
      <ul className="space-y-6">

        {/* ✅ Dashboard Section with new icon */}
        <li
          className="flex items-center gap-4 cursor-pointer hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/user/dashboard')}
        >
          <FaTachometerAlt className="text-xl" /> Dashboard
        </li>

        {/* Profile */}
        <li
          className="flex items-center gap-4 cursor-pointer hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/user/profile')}
        >
          <FaUser className="text-xl" /> Profile
        </li>

        {/* Bookings */}
        <li
          className="flex items-center gap-4 cursor-pointer hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/user/booking-history')}
        >
          <FaHome className="text-xl" /> Bookings
        </li>

        {/* Settings */}
        <li
          className="flex items-center gap-4 cursor-pointer hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/user/settings')}
        >
          <FaCogs className="text-xl" /> Support & Settings
        </li>

        {/* Logout */}
        <li
          className="flex items-center gap-4 cursor-pointer hover:text-red-500 py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/logout')}
        >
          <FaSignOutAlt className="text-xl" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
