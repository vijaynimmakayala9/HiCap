import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { mockCourseData } from './mockCourseData';

// 👇 Move Counter OUTSIDE the component
const Counter = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}</span>;
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const selectedCourse = mockCourseData[id];
    setCourse(selectedCourse);
  }, [id]);

  if (!course) return <div className="text-center py-10">Course not found.</div>;

  const lessons = course.lessons;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full px-4 md:px-[60px] py-10 flex flex-col gap-10 mt-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-800">{course.name}</h1>
            <h2 className="text-2xl text-green-600 font-extrabold mt-2">TRAINING</h2>
            <p className="mt-4 text-lg text-gray-700">
              Master {course.name} with hands-on training! Learn data visualization, dashboards,
              and app development with expert guidance and career support. Join Hyderabad's best
              {course.name} training institute — Magnitia!
            </p>
            <button className="mt-6 bg-purple-800 text-white px-6 py-2 rounded-md font-semibold">
              Apply Now
            </button>
          </div>
          <div className="flex justify-center">
            <img src={course.image} alt={course.name} className="max-h-80 w-auto" />
          </div>
        </div>

        {/* Course Card */}
        <div className="w-full border border-black/20 rounded-2xl bg-white overflow-hidden shadow-md">
          <div className="bg-[#007860] text-white text-center py-4 text-xl font-semibold font-roboto">
            {course.name}
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Duration Card */}
              <div className="bg-[#f0fdf4] border border-green-300 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <FaRegClock className="text-green-600 text-2xl mb-2" />
                <p className="text-lg font-semibold text-gray-800">
                  <Counter end={parseInt(course.duration)} /> hrs
                </p>
                <span className="text-sm text-gray-600">Duration</span>
              </div>

              {/* Lessons Card */}
              <div className="bg-[#fff7ed] border border-orange-300 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <FaBook className="text-orange-500 text-2xl mb-2" />
                <p className="text-lg font-semibold text-gray-800">
                  <Counter end={lessons.length} /> Lessons
                </p>
                <span className="text-sm text-gray-600">Total Lessons</span>
              </div>

              {/* Students Card */}
              <div className="bg-[#eff6ff] border border-blue-300 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <FaUserGraduate className="text-blue-600 text-2xl mb-2" />
                <p className="text-lg font-semibold text-gray-800">
                  <Counter end={course.students} />+ Students
                </p>
                <span className="text-sm text-gray-600">Enrolled</span>
              </div>
            </div>
          </div>
        </div>


        {/* Course Objectives as Cards */}
        <section className="bg-green-600 text-white p-6 rounded-xl">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-100">Course Objectives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="bg-white text-black p-4 rounded-xl shadow-md">
                <h4 className="font-semibold text-lg mb-2">Objective {index + 1}</h4>
                <p className="text-sm">{lesson}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Take This Course Section */}
        <section className="bg-orange-500 text-white p-6 rounded-xl shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-4">Why should you take {course.name}?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>The average base salary of a Power BI developer in India is 5.12 LPA - glassdoor.co.in</li>
              <li>Power BI has 6.08% market share globally and 45,000+ MNCs use it</li>
              <li>Microsoft is a leader in Gartner Magic Quadrant for 12 consecutive years</li>
            </ul>
          </div>
          <button className="mt-4 lg:mt-0 bg-green-500 text-white px-6 py-2 rounded font-semibold">Apply Now</button>
        </section>

        {/* Other Courses */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Explore Other Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(mockCourseData)
              .filter(c => c.id !== course.id)
              .slice(0, 4)
              .map(other => (
                <div
                  key={other.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={other.image}
                    alt={other.name}
                    className="h-32 w-full object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-2">{other.name}</h4>
                  <p className="text-sm text-gray-600">Duration: {other.duration}</p>
                  <p className="text-sm text-gray-600">{other.students}+ Students</p>
                </div>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
