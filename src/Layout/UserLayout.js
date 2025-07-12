import React from 'react';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';
import { Outlet } from 'react-router-dom'; // This will render the nested routes

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <UserHeader />
        <main className="p-6">
          <Outlet /> {/* This will render the child route like Dashboard */}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
