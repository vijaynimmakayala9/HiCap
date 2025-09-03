import React, { useState, useEffect } from "react";
import axios from "axios";

const TopPerformers = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://backend-hicap.onrender.com/api/coursecontroller"
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        const availableCourses = response.data.data || [];
        setCourses(availableCourses);

        if (availableCourses.length > 0) {
          const firstCourse = availableCourses[0];
          if (firstCourse && firstCourse._id) {
            setSelectedCourse(firstCourse);
            fetchTopPerformers(firstCourse._id);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]); // fallback
    }
  };

  // ✅ Fetch top performers
  const fetchTopPerformers = async (courseId) => {
    if (!courseId) return; // prevent 404s
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-hicap.onrender.com/api/enrollments/top-practical/${courseId}`
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        setTopPerformers(response.data.data);
      } else {
        setTopPerformers([]);
      }
    } catch (error) {
      console.error("Error fetching top performers:", error);
      setTopPerformers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Handle course change
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    const selected = courses.find((c) => c._id === courseId);
    setSelectedCourse(selected);
    fetchTopPerformers(courseId);
  };

  // ✅ Split performers into top 3 and others
  const top3 = Array.isArray(topPerformers) ? topPerformers.slice(0, 3) : [];
  const others = Array.isArray(topPerformers) ? topPerformers.slice(3) : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🎓 Top Performers
      </h2>

      {/* Course Selector */}
      <div className="mb-6 text-center">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
          value={selectedCourse?._id || ""}
          onChange={handleCourseChange}
        >
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName || "Unnamed Course"}
              </option>
            ))
          ) : (
            <option disabled>No Courses Available</option>
          )}
        </select>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center">Loading performers...</p>}

      {/* Top 3 Performers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {top3.length > 0 ? (
          top3.map((performer, index) => (
            <div
              key={performer._id || index}
              className="bg-white shadow-lg rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold">{performer.name}</h3>
              <p className="text-gray-500">Rank #{index + 1}</p>
              <p className="mt-2 font-bold text-indigo-600">
                {performer.score || 0} pts
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No top performers found.
          </p>
        )}
      </div>

      {/* Other Performers */}
      <div>
        <h3 className="text-xl font-bold mb-4">Other Performers</h3>
        {others.length > 0 ? (
          <ul className="space-y-3">
            {others.map((performer, index) => (
              <li
                key={performer._id || index}
                className="bg-white p-4 rounded-lg shadow flex justify-between"
              >
                <span>{performer.name}</span>
                <span className="text-indigo-600 font-bold">
                  {performer.score || 0} pts
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No other performers.</p>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;
