import React from 'react';
import { FaTrain, FaBus, FaFilm } from 'react-icons/fa';

const FeatureCards = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900 drop-shadow-md">
        Our Ticket Services
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        
        {/* Train Card */}
        <div className="bg-white rounded-lg p-8 text-center transition-transform transform hover:scale-105
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] hover:bg-blue-50 border-b-4 border-blue-700 cursor-pointer">
          <FaTrain size={52} className="text-blue-600 mb-5 mx-auto" />
          <h3 className="text-2xl font-semibold mb-3 text-blue-800">Train Tickets</h3>
          <p className="text-gray-700">
            Book your train tickets easily and get real-time schedules & availability.
          </p>
          <p className="mt-5 text-sm text-gray-500">
            You can also <span className="text-blue-700 font-semibold">sell</span> train tickets here.
          </p>
        </div>

        {/* Bus Card */}
        <div className="bg-white rounded-lg p-8 text-center transition-transform transform hover:scale-105
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] hover:bg-blue-50 border-b-4 border-green-600 cursor-pointer">
          <FaBus size={52} className="text-green-600 mb-5 mx-auto" />
          <h3 className="text-2xl font-semibold mb-3 text-green-700">Bus Tickets</h3>
          <p className="text-gray-700">
            Find and reserve comfortable bus seats for all major routes.
          </p>
          <p className="mt-5 text-sm text-gray-500">
            You can also <span className="text-blue-700 font-semibold">sell</span> bus tickets here.
          </p>
        </div>

        {/* Movie Card */}
        <div className="bg-white rounded-lg p-8 text-center transition-transform transform hover:scale-105
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] hover:bg-blue-50 border-b-4 border-red-600 cursor-pointer">
          <FaFilm size={52} className="text-red-600 mb-5 mx-auto" />
          <h3 className="text-2xl font-semibold mb-3 text-red-700">Movie Tickets</h3>
          <p className="text-gray-700">
            Discover the latest movies and book your cinema tickets instantly.
          </p>
          <p className="mt-5 text-sm text-gray-500">
            You can also <span className="text-blue-700 font-semibold">sell</span> movie tickets here.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;
