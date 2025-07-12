import React from 'react';

const UserHeader = () => {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center ml-64">
      {/* ml-64 adds margin-left equal to the width of the sidebar */}
      <h1 className="text-xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
    </header>
  );
};

export default UserHeader;
