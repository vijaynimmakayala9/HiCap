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
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaBookOpen
} from 'react-icons/fa';
import Footer from './Footer';
import Header from './Header';

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

const StarRating = ({ rating, reviewCount }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-2 text-sm text-gray-600">({reviewCount} reviews)</span>
    </div>
  );
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

        // Fetch data from the API endpoint
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/course1');
        const coursesData = await response.json();

        if (coursesData.success) {
          setAllCourses(coursesData.data);

          // Find the specific course from all courses
          const selectedCourse = coursesData.data.find(c => c._id === id);
          if (selectedCourse) {
            // Enhance course data with additional properties
            const enhancedCourse = {
              ...selectedCourse,
              image: selectedCourse.image || "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
              students: selectedCourse.noOfStudents,
              features: selectedCourse.features?.map((feature, i) => ({
                ...feature,
                title: feature.title || [
                  "Industry-recognized certification",
                  "Hands-on projects",
                  "Lifetime access to course materials",
                  "Expert instructor support",
                  "Career guidance sessions"
                ][i],
                image: feature.image || [
                  "https://cdn-icons-png.flaticon.com/512/3176/3176272.png",
                  "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
                  "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
                  "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
                  "https://cdn-icons-png.flaticon.com/512/3281/3281289.png"
                ][i]
              })) || []
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700 mb-4"></div>
        <p>Loading course details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center py-10">
        <p>Course not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors"
        >
          Browse Courses
        </button>
      </div>
    </div>
  );

  // Get related courses (excluding current course)
  const relatedCourses = allCourses.filter(c => c._id !== id).slice(0, 3);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow my-2 px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="relative py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="p-4 md:p-6 lg:p-8 order-2 lg:order-1">
                <p className="text-green-600 font-semibold mb-2 uppercase tracking-wide text-xs sm:text-sm">
                  {course.category} Training
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 mb-3 sm:mb-4">
                  {course.name}
                </h1>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  {course.description}
                </p>

                {/* Rating Display */}
                <div className="mb-3 sm:mb-4">
                  <StarRating rating={course.rating} reviewCount={course.reviewCount} />
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                    <FaRegClock className="text-xs" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                    <FaUserGraduate className="text-xs" /> {course.noOfStudents}+ Students
                  </span>
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                    <FaBook className="text-xs" /> {course.noOfLessons} Lessons
                  </span>
                </div>

                {/* Course Metadata */}
                <div className="mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">Subcategory:</span> {course.subcategory}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Mode:</span> {course.mode}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 text-xs sm:text-sm md:text-base">
                    Enroll Now - ${course.price}
                  </button>
                  <button className="border border-purple-700 text-purple-700 hover:bg-purple-50 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 text-xs sm:text-sm md:text-base">
                    Download Syllabus
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center items-center order-1 lg:order-2">
                <div className="relative group w-full max-w-md">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl border-2 sm:border-4 border-white w-full h-auto transition duration-300 group-hover:scale-105 aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-white text-green-800 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md">
                    New Batch Starting Soon!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto py-6 md:py-10 lg:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Students Enrolled */}
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg flex flex-col items-center text-center">
                <FaUserGraduate className="text-green-600 text-2xl sm:text-3xl mb-1 sm:mb-2" />
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  <Counter end={course.noOfStudents} suffix="+" />
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Students Enrolled</p>
              </div>

              {/* Lessons */}
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg flex flex-col items-center text-center">
                <FaBookOpen className="text-green-600 text-2xl sm:text-3xl mb-1 sm:mb-2" />
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  <Counter end={course.noOfLessons} />
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Lessons</p>
              </div>

              {/* Reviews */}
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg flex flex-col items-center text-center">
                <FaStar className="text-yellow-500 text-2xl sm:text-3xl mb-1 sm:mb-2" />
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  {course.rating}/5
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Reviews</p>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-green-800 flex items-center gap-2">
                  <FaCertificate className="text-green-600" /> What You'll Get
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
                  {course.features.map((feature, index) => (
                    <div key={index} className="bg-green-50 rounded-lg shadow-sm p-2 sm:p-3 flex flex-col items-center text-center">
                      {feature.image && (
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover mb-1 sm:mb-2"
                          loading="lazy"
                        />
                      )}
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-green-800 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-green-600" /> Training Options
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">Mode:</p>
                    <p className="capitalize bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full inline-block text-xs sm:text-sm">
                      {course.mode}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">Status:</p>
                    <p className={`px-2 sm:px-3 py-1 rounded-full inline-block text-xs sm:text-sm ${course.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {course.status === 'available' ? 'Available Now' : 'Coming Soon'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">Price:</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">${course.price}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {course.isPopular && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Popular Course
                      </span>
                    )}
                    {course.isHighRated && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Top Rated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Objectives */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200 mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-green-800 border-b pb-2">
                Learning Objectives
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {course.courseObject?.map((item, index) => (
                  <div key={index} className="bg-green-50 border border-green-100 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-green-800 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                      {item.title || `Objective ${index + 1}`}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {course.faq && course.faq.length > 0 && (
              <div className="p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-orange-200 mb-8 sm:mb-12 bg-orange-500">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-white pb-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {course.faq.map((item, index) => (
                    <div key={index} className="rounded-lg bg-white text-gray-900 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm md:text-base bg-white hover:bg-orange-50 transition-colors"
                      >
                        <span className="text-left">{item.question}</span>
                        {openFAQIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      <div
                        className={`px-3 sm:px-4 pt-0 pb-3 sm:pb-4 text-gray-700 text-xs sm:text-sm transition-all duration-300 ease-in-out ${openFAQIndex === index ? 'block' : 'hidden'
                          }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Who Can Learn */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200 mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-green-800 border-b pb-2">
                Who Can Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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
                  <div key={index} className="flex gap-2 sm:gap-3 md:gap-4 items-start p-2 sm:p-3 hover:bg-green-50 rounded-lg transition">
                    <img
                      src={learner.image}
                      alt={learner.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-green-300"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-green-700 mb-1">
                        {learner.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {learner.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Course Information */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200 mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-green-800 border-b pb-2">
                Course Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">
                    Technical Details
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Total Lessons:</span>
                      <span className="text-gray-800 font-medium">{course.noOfLessons}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Enrolled Students:</span>
                      <span className="text-gray-800 font-medium">
                        {course.noOfStudents.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">
                    Course Statistics
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Course Category:</span>
                      <span className="text-gray-800 font-medium">{course.category}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Subcategory:</span>
                      <span className="text-gray-800 font-medium">{course.subcategory}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Average Rating:</span>
                      <span className="text-gray-800 font-medium">{course.rating}/5.0</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span className="text-gray-600">Total Reviews:</span>
                      <span className="text-gray-800 font-medium">
                        {course.reviewCount.toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="mb-8 sm:mb-12">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-green-800">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {relatedCourses.map(relatedCourse => (
                    <div key={relatedCourse._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                      <img
                        src={relatedCourse.image || "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"}
                        alt={relatedCourse.name}
                        className="w-full h-36 sm:h-40 md:h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 line-clamp-2">
                            {relatedCourse.name}
                          </h3>
                          <span className="text-base sm:text-lg md:text-xl font-bold text-green-600 whitespace-nowrap ml-2">
                            ${relatedCourse.price}
                          </span>
                        </div>

                        <div className="mb-1 sm:mb-2">
                          <StarRating rating={relatedCourse.rating} reviewCount={relatedCourse.reviewCount} />
                        </div>

                        <div className="flex items-center gap-1 text-2xs sm:text-xs text-gray-600 mb-2 sm:mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <FaRegClock className="text-2xs" /> {relatedCourse.duration}
                          </span>
                          <span className="mx-1">•</span>
                          <span className="flex items-center gap-1">
                            <FaUserGraduate className="text-2xs" /> {relatedCourse.noOfStudents}+
                          </span>
                          <span className="mx-1">•</span>
                          <span className="flex items-center gap-1">
                            <FaBook className="text-2xs" /> {relatedCourse.noOfLessons}
                          </span>
                        </div>

                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                          {relatedCourse.description}
                        </p>

                        <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                          {relatedCourse.isPopular && (
                            <span className="bg-yellow-100 text-yellow-800 px-1 sm:px-2 py-1 rounded-full text-2xs sm:text-xs">
                              Popular
                            </span>
                          )}
                          {relatedCourse.isHighRated && (
                            <span className="bg-blue-100 text-blue-800 px-1 sm:px-2 py-1 rounded-full text-2xs sm:text-xs">
                              Top Rated
                            </span>
                          )}
                          <span className={`px-1 sm:px-2 py-1 rounded-full text-2xs sm:text-xs ${relatedCourse.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {relatedCourse.status === 'available' ? 'Available' : 'Coming Soon'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            navigate(`/course/${relatedCourse._id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-1 sm:py-2 rounded-lg transition text-xs sm:text-sm"
                        >
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
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;