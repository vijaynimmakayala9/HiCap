import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaRegClock,
  FaUserGraduate,
  FaBook,
  FaCheck,
  FaChartLine,
  FaCertificate,
  FaChalkboardTeacher,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const Counter = ({ end, duration = 1000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / 50;
    const stepTime = Math.abs(Math.floor(duration / 50));
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.ceil(start));
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}{suffix}</span>;
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all courses first
        const coursesResponse = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses data');
        }
        const coursesData = await coursesResponse.json();
        
        if (coursesData.success) {
          setAllCourses(coursesData.data);
          
          // Find the specific course from all courses
          const selectedCourse = coursesData.data.find(c => c._id === id);
          if (selectedCourse) {
            // Enhance course data with additional properties
            const enhancedCourse = {
              ...selectedCourse,
              image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
              students: selectedCourse.noOfStudents,
              features: selectedCourse.features.map((_, i) => ({
                title: [
                  "Industry-recognized certification",
                  "Hands-on projects",
                  "Lifetime access to course materials",
                  "Expert instructor support",
                  "Career guidance sessions"
                ][i]
              }))
            };
            setCourse(enhancedCourse);
          } else {
            throw new Error('Course not found');
          }
        } else {
          throw new Error('Failed to load courses');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  if (loading) return <div className="text-center py-10">Loading course details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  // Get related courses (excluding current course)
  const relatedCourses = allCourses.filter(c => c._id !== id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white-200">
      <Header />
      <main className="flex-grow my-2">

        {/* Hero Banner */}
        <div className="relative py-16 px-4 md:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <div className="p-6 md:p-8">
              <p className="text-green-600 font-semibold mb-2 uppercase tracking-wide">{course.category} Training</p>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">{course.name}</h1>
              <p className="text-gray-700 text-lg md:text-xl mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  <FaRegClock /> {course.duration} months
                </span>
                <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  <FaUserGraduate /> {course.noOfStudents}+ Students
                </span>
                <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  <FaBook /> {course.noOfLessons} Lessons
                </span>
              </div>

              <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105">
                Enroll Now - ${course.price}
              </button>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center">
              <div className="relative group">
                <img
                  src={course.image}
                  alt={course.name}
                  className="rounded-3xl shadow-2xl border-4 border-white w-full max-w-md transition duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-white text-green-800 text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                  New Batch Starting Soon!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          {/* Highlights, Features, Mode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-green-200 p-6 rounded-xl shadow-md border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
                <FaChartLine /> Course Highlights
              </h3>
              <div className="space-y-4  text-center">
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    <Counter end={course.noOfStudents} suffix="+" />
                  </p>
                  <p className="text-gray-600">Students Enrolled</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    <Counter end={course.noOfLessons} />
                  </p>
                  <p className="text-gray-600">Comprehensive Lessons</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">{course.rating}/5</p>
                  <p className="text-gray-600">({course.reviewCount} reviews)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-200 p-6 rounded-xl shadow-md border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
                <FaCertificate /> What You'll Get
              </h3>
              <ul className="space-y-3">
                {(course.features || []).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1"><FaCheck /></span>
                    <span className="text-gray-700">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-200 p-6 rounded-xl shadow-md border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
                <FaChalkboardTeacher /> Training Options
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800">Mode:</p>
                  <p className="capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block">{course.mode}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Status:</p>
                  <p className={`px-3 py-1 rounded-full inline-block ${course.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {course.status === 'available' ? 'Available' : 'Coming Soon'}
                  </p>
                </div>
                {course.isPopular && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
                    Popular Course
                  </div>
                )}
                {course.isHighRated && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block ml-2">
                    Top Rated
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Objectives */}
          <div className="bg-green-200 p-8 rounded-xl shadow-md border border-green-200 mb-12">
            <h2 className="text-2xl font-bold mb-6 bg-green-200 text-green-800 border-b pb-2">Learning Objectives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(course.courseObject || []).map((item, index) => (
                <div key={index} className="bg-green-50 border border-green-100 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold text-green-800 mb-2">{item.title || `Objective ${index + 1}`}</h3>
                  <p className="text-gray-700 text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="p-8 rounded-xl shadow-md border border-green-200 mb-12" style={{ backgroundColor: "#f97316" }}>
            <h2 className="text-2xl font-bold mb-6 text-white pb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {(course.faq || []).map((item, index) => (
                <div key={index} className="rounded-lg bg-white text-green-900 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-3 font-semibold text-lg bg-white hover:bg-green-100 transition-colors"
                  >
                    <span>{item.question}</span>
                    {openFAQIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <div
                    className={`px-4 pt-1 pb-4 text-gray-700 text-sm transition-all duration-300 ease-in-out ${openFAQIndex === index ? 'block' : 'hidden'
                      }`}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Learn */}
          <div className="bg-green-200 p-8 rounded-xl shadow-md border border-green-200 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-800 border-b pb-2">Who Can Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                  title: "Students & Freshers",
                  description: "Ideal for those starting their career and seeking strong foundational skills."
                },
                {
                  image: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png",
                  title: "Working Professionals",
                  description: "Upgrade your skills or pivot your career into high-demand roles."
                },
                {
                  image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
                  title: "Freelancers",
                  description: "Enhance your service offering and land better-paying projects."
                },
                {
                  image: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
                  title: "Entrepreneurs",
                  description: "Gain practical knowledge to grow and manage your own business more effectively."
                }
              ].map((learner, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    src={learner.image}
                    alt={learner.title}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-green-700 mb-1">{learner.title}</h3>
                    <p className="text-gray-600 text-sm">{learner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-green-800">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map(course => (
                  <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                      alt={course.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{course.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <FaRegClock /> {course.duration} months
                        <span className="mx-1">•</span>
                        <FaUserGraduate /> {course.noOfStudents}+ students
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <button
                        onClick={() => {
                          navigate(`/course/${course._id}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 rounded-lg transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;