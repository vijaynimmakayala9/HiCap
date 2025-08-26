import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-5 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold textcolor">Welcome</h1>
          <p className="textcolorlight mt-1">Angela Della</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button className="gradient-button px-4 py-2 rounded-md transition-colors">
            Home
          </button>
          <button className="btn-outline-meroon px-4 py-2 rounded-md border transition-colors">
            Course
          </button>
          <button className="btn-outline-meroon px-4 py-2 rounded-md border transition-colors">
            Exam
          </button>
          <button className="btn-outline-meroon px-4 py-2 rounded-md border transition-colors">
            Schedule
          </button>
          <button className="btn-outline-meroon px-4 py-2 rounded-md border transition-colors">
            Clear
          </button>
          <button className="btn-outline-meroon px-4 py-2 rounded-md border transition-colors">
            Financial
          </button>
        </div>
      </div>

      {/* Active Courses Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold textcolor mb-4">Active Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Course Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 hover:-translate-y-0.5 border-l-4 border-meroon-back">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-semibold gradient-text mr-2 flex-1">
                Learn UI ix with ZHF Design Studio
              </h3>
              <span className="bg-meroonlight text-white text-xs font-medium px-2 py-1 rounded-full">
                35 Tutorials
              </span>
            </div>
            <div>
              <p className="textcolorlight text-sm">08:30 hours/Doisy</p>
              <p className="textcolor font-medium text-sm mt-1">
                Next class starting in 30 mins
              </p>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 hover:-translate-y-0.5 border-l-4 border-meroon-back">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-semibold gradient-text mr-2 flex-1">
                Structure Expert - Making Things Look 3D
              </h3>
              <span className="bg-meroonlight text-white text-xs font-medium px-2 py-1 rounded-full">
                130 Tutorials
              </span>
            </div>
            <div>
              <p className="textcolorlight text-sm">08:00 hours/Doisy</p>
              <p className="textcolor font-medium text-sm mt-1">
                Next class starting in 01:24 hours
              </p>
            </div>
          </div>

          {/* Course Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 hover:-translate-y-0.5 border-l-4 border-meroon-back">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-semibold gradient-text mr-2 flex-1">
                Learn Programming FAST! My Favorite Method!
              </h3>
              <span className="bg-meroonlight text-white text-xs font-medium px-2 py-1 rounded-full">
                55 Tutorials
              </span>
            </div>
            <div>
              <p className="textcolorlight text-sm">03:00 hours/Doisy</p>
              <p className="textcolor font-medium text-sm mt-1">
                Next class starting in 25:24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-md lg:col-span-2 border-l-4 border-meroon-back">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold textcolor">Exam Grade Statistics</h3>
            <select className="border border-meroon-back rounded-md px-3 py-1 bg-gray-50 textcolor">
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-end h-48 gap-2 mb-2 px-2 w-full justify-between">
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '60%' }}></div>
              <div className="w-8 bg-meroon-back rounded-t-md" style={{ height: '80%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '40%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '70%' }}></div>
              <div className="w-8 bg-meroon-back rounded-t-md" style={{ height: '90%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '50%' }}></div>
              <div className="w-8 bg-meroon-back rounded-t-md" style={{ height: '75%' }}></div>
              <div className="w-8 bg-meroon-back rounded-t-md" style={{ height: '85%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '65%' }}></div>
              <div className="w-8 bg-meroon-back rounded-t-md" style={{ height: '95%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '55%' }}></div>
              <div className="w-8 bg-meroonlight rounded-t-md" style={{ height: '45%' }}></div>
            </div>
            <div className="flex justify-between w-full px-1">
              <span className="text-xs textcolorlight w-8 text-center">Jan</span>
              <span className="text-xs textcolorlight w-8 text-center">Feb</span>
              <span className="text-xs textcolorlight w-8 text-center">Mar</span>
              <span className="text-xs textcolorlight w-8 text-center">Apr</span>
              <span className="text-xs textcolorlight w-8 text-center">May</span>
              <span className="text-xs textcolorlight w-8 text-center">Jun</span>
              <span className="text-xs textcolorlight w-8 text-center">Jul</span>
              <span className="text-xs textcolorlight w-8 text-center">Aug</span>
              <span className="text-xs textcolorlight w-8 text-center">Sep</span>
              <span className="text-xs textcolorlight w-8 text-center">Oct</span>
              <span className="text-xs textcolorlight w-8 text-center">Nov</span>
              <span className="text-xs textcolorlight w-8 text-center">Dec</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-xl p-5 shadow-md text-center border-l-4 border-meroon-back">
            <h4 className="text-sm textcolorlight mb-2 font-medium">Total Courses</h4>
            <p className="text-2xl font-bold textcolor">10</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md text-center border-l-4 border-meroon-back">
            <h4 className="text-sm textcolorlight mb-2 font-medium">Hours Spend</h4>
            <p className="text-2xl font-bold textcolor">245+</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-meroon-back">
        <h3 className="text-lg font-semibold textcolor mb-5">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-meroon-back textcolor flex items-center justify-center font-bold text-lg mb-2">
              BAI
            </div>
            <p className="text-sm textcolor">Complete 5 Full Course</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-meroon-back textcolor flex items-center justify-center font-bold text-lg mb-2">
              ✓
            </div>
            <p className="text-sm textcolor">Available On Time</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-meroon-back textcolor flex items-center justify-center font-bold text-lg mb-2">
              500
            </div>
            <p className="text-sm textcolor">Complete 500 Hours</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
            <div className="w-12 h-12 rounded-full bg-meroon-back textcolor flex items-center justify-center font-bold text-lg mb-2">
              10
            </div>
            <p className="text-sm textcolor">Once 10 Events</p>
          </div>
        </div>
      </div>

      {/* Add the custom styles */}
      <style>
        {`
        .gradient-button {
          background-color: #ad2132 !important;
          color: white !important;
        }
        
        .gradient-button:hover {
          background-color: #8a1a28 !important;
        }
        
        .gradient-text {
          color: #000 !important;
        }
        
        .textcolor {
          color: #ad2132 !important;
        }
        
        .textcolorlight {
          color: #c34153 !important;
        }
        
        .meroon-back {
          background-color: #ad2132 !important;
        }
        
        .bg-meroon {
          background-color: #ad2132 !important;
          color: #fff !important;
        }
        
        .bg-meroonlight {
          background-color: #c34153 !important;
          color: #fff;
        }
        
        .btn-outline-meroon {
          color: #ad2132 !important;
          border-color: #ad2132 !important;
          background: transparent;
        }
        
        .btn-outline-meroon:hover,
        .btn-outline-meroon:focus,
        .btn-outline-meroon:active {
          color: #fff !important;
          background-color: #ad2132 !important;
          border-color: #ad2132 !important;
        }
        
        .border-meroon-back {
          border-color: #ad2132 !important;
        }
        `}
      </style>
    </div>
  );
};

export default Dashboard;