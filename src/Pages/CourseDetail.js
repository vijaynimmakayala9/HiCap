import React from 'react';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import { MoveRight, Upload } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const lessons = [
  'Introduction to AI',
  'Supervised Learning',
  'Unsupervised Learning',
  'Neural Networks',
  'Deep Learning',
  'NLP Basics',
  'Computer Vision',
  'Model Evaluation',
  'Deployment',
  'Ethics in AI',
  'Capstone Project',
  'Final Review',
];

const CourseDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full px-6 md:px-[60px] py-10 flex flex-col gap-10 mt-10"> {/* Added mt-10 */}
        {/* Course Card */}
        <div className="w-full max-w-md border border-black/20 rounded-2xl bg-white overflow-hidden shadow-md">
          <div className="bg-[#007860] text-white text-center py-3 text-lg font-semibold font-roboto">
            AI & Machine Learning
          </div>
          <div className="p-5">
            <img
              src="/ai.png"
              alt="course"
              className="w-full h-44 object-cover rounded-lg"
            />
            <div className="flex justify-between my-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <FaRegClock />
                <span>6 Months</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBook />
                <span>{lessons.length} Lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUserGraduate />
                <span>300+ Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Calendar */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Lesson Calendar</h3>
          <div className="grid grid-cols-7 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm flex flex-col items-start justify-between h-24"
              >
                <div className="text-xs text-gray-400">Lesson {index + 1}</div>
                <div className="text-sm font-semibold text-gray-800">{lesson}</div>
              </div>
            ))}
            {Array.from({ length: (7 - (lessons.length % 7)) % 7 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24"></div>
            ))}
          </div>
        </div>

        {/* Take Test Section */}
        <div className="w-full bg-[#007860] rounded-2xl border border-black/20 p-6 text-white flex flex-col items-center gap-6">
          <div className="bg-white text-black px-6 py-2 text-2xl font-semibold rounded-lg font-roboto">
            Take Test For Lesson 1
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
              Take Test
              <MoveRight size={20} />
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
              Upload Test
              <Upload size={20} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
