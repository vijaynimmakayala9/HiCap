import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const courseData = {
  'AI & Machine Learning': {
    practical: [500, 600, 700, 800, 900, 1000, 1100],
    theoretical: [300, 400, 450, 500, 550, 600, 650]
  },
  'Web Development': {
    practical: [400, 450, 500, 550, 600, 650, 700],
    theoretical: [200, 250, 300, 350, 400, 450, 500]
  },
  'Data Science': {
    practical: [600, 650, 700, 750, 800, 850, 900],
    theoretical: [400, 450, 500, 550, 600, 650, 700]
  },
  'Cyber Security': {
    practical: [300, 350, 400, 450, 500, 550, 600],
    theoretical: [200, 250, 300, 350, 400, 450, 500]
  }
};

// Start from 1st Monday of July 2025
const startDate = new Date('2025-07-07'); // Monday

const COLORS = ['#007860', '#2ecc71'];

const formatDateLabel = (dateObj) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = dayNames[dateObj.getDay()];
  const date = dateObj.getDate().toString().padStart(2, '0');
  const month = monthNames[dateObj.getMonth()];
  return `${day} (${date} ${month})`;
};

const YourStatistics = () => {
  const [selectedCourse, setSelectedCourse] = useState('AI & Machine Learning');

  const prepareChartData = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const dateObj = new Date(startDate);
      dateObj.setDate(startDate.getDate() + i);

      const practical = courseData[selectedCourse].practical[i];
      const theoretical = courseData[selectedCourse].theoretical[i];
      const total = practical + theoretical;

      return {
        day: formatDateLabel(dateObj),
        practical: total > 0 ? parseFloat(((practical / total) * 100).toFixed(2)) : 0,
        theoretical: total > 0 ? parseFloat(((theoretical / total) * 100).toFixed(2)) : 0,
      };
    });
  };

  const chartData = prepareChartData();

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-8 font-roboto">
      {/* Header and Dropdown */}
      <div className="max-w-[800px] mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-black mb-2">Your Course Performance (July 2025)</h2>
            <div className="w-[180px] h-2 bg-[#007860] rounded-[20px]" />
          </div>
          <div className="w-full md:w-auto">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007860]"
            >
              {Object.keys(courseData).map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h5 className="text-lg font-semibold mb-4">Performance Breakdown (%) - {selectedCourse}</h5>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" angle={-25} textAnchor="end" height={60} />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="practical" fill={COLORS[0]} radius={[4, 4, 0, 0]} name="Practical (%)" />
            <Bar dataKey="theoretical" fill={COLORS[1]} radius={[4, 4, 0, 0]} name="Theoretical (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default YourStatistics;
