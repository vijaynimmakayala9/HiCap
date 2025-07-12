// src/pages/DeleteAccount.jsx
import React from 'react';

const DeleteAccount = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Your Account</h1>
        <p className="text-gray-700 mb-4">
          If you wish to delete your account and all associated data, please contact our support team or follow the instructions below.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Go to the app settings</li>
          <li>Click "Delete Account"</li>
          <li>Confirm your identity and proceed</li>
        </ul>
        <p className="text-gray-700 mb-6">
          Alternatively, you can send a deletion request to:
          <br />
          <strong className="text-blue-700">varahiautomotives@gmail.com</strong>
        </p>
        <p className="text-sm text-gray-500">
          Once your request is processed, all your personal data will be permanently deleted from our servers within 7 working days.
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
