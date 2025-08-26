import React, { useEffect, useState } from "react";
import { FaBook, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Sample course data
    const sampleCourses = [
      {
        _id: "68aaec5ae9bb87ffb9f5db86",
        name: "React for Beginners",
        category: "Web Development",
        duration: 3,
        description: "Learn the basics of React.js and build interactive UIs.",
        image: "https://res.cloudinary.com/dwmna13fi/image/upload/v1756122092/courses/main/jdrmbbi8pqkuwwb55ig4.jpg",
        pdf: "https://res.cloudinary.com/dwmna13fi/raw/upload/v1756200349/courses/pdf/cthzvr3khao0eaaxsjm1",
        enrollmentDate: "2025-08-01",
      },
      {
        _id: "68aaec5ae9bb87ffb9f5db86",
        name: "Advanced JavaScript",
        category: "Programming",
        duration: 4,
        description: "Deep dive into JavaScript concepts and ES6 features.",
        image: "https://res.cloudinary.com/dwmna13fi/image/upload/v1756122092/courses/main/jdrmbbi8pqkuwwb55ig4.jpg",
        pdf: "https://res.cloudinary.com/dwmna13fi/raw/upload/v1756200349/courses/pdf/cthzvr3khao0eaaxsjm1",
        enrollmentDate: "2025-07-15",
      },
      {
        _id: "68aaec5ae9bb87ffb9f5db86",
        name: "Python for Data Science",
        category: "Data Science",
        duration: 6,
        description: "Master Python programming for data analysis and visualization.",
        image: "https://res.cloudinary.com/dwmna13fi/image/upload/v1756122092/courses/main/jdrmbbi8pqkuwwb55ig4.jpg",
        pdf: "https://res.cloudinary.com/dwmna13fi/raw/upload/v1756200349/courses/pdf/cthzvr3khao0eaaxsjm1",
        enrollmentDate: "2025-06-20",
      },
      {
        _id: "68aaec5ae9bb87ffb9f5db86",
        name: "Machine Learning Basics",
        category: "AI & ML",
        duration: 5,
        description: "Understand the fundamentals of machine learning algorithms.",
        image: "https://res.cloudinary.com/dwmna13fi/image/upload/v1756122092/courses/main/jdrmbbi8pqkuwwb55ig4.jpg",
        pdf: "https://res.cloudinary.com/dwmna13fi/raw/upload/v1756200349/courses/pdf/cthzvr3khao0eaaxsjm1",
        enrollmentDate: "2025-05-10",
      },
    ];

    setEnrolledCourses(sampleCourses);
    setLoading(false);
  }, []);

  const nextSlide = () => {
    if (enrolledCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= enrolledCourses.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    if (enrolledCourses.length <= 3) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(enrolledCourses.length - 3, 0) : prevIndex - 3
    );



  };
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || "course.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const visibleCourses = enrolledCourses.slice(currentIndex, currentIndex + 3);

  return (
    <div className="max-w-7xl mx-auto mt-8 bg-gray-50 rounded-xl shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="flex items-center text-xl font-semibold text-gray-800">
          <FaBook className="mr-2 text-[#ad2132]" />
          Enrolled Courses
        </h3>
        {enrolledCourses.length > 3 && (
          <div className="space-x-2">
            <button
              className="p-2 rounded-full border border-[#ad2132] text-[#ad2132] hover:bg-[#ad2132] hover:text-white transition"
              onClick={prevSlide}
            >
              <FaArrowLeft />
            </button>
            <button
              className="p-2 rounded-full border border-[#ad2132] text-[#ad2132] hover:bg-[#ad2132] hover:text-white transition"
              onClick={nextSlide}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-[#ad2132]/40 border-t-[#ad2132] rounded-full animate-spin"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="p-4 bg-blue-50 text-blue-700 rounded">
          No enrolled courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-44 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x180?text=Course+Image";
                }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.name}
                </h5>
                <div className="flex space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                    {course.duration} months
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex-grow">
                  {course.description?.length > 100
                    ? `${course.description.substring(0, 100)}...`
                    : course.description}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="bg-[#ad2132]/10 text-[#ad2132] text-xs font-semibold px-2 py-1 rounded">
                    Enrolled
                  </span>
                  <small className="text-gray-500 text-xs">
                    {new Date(course.enrollmentDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <div className="p-4 border-t">
                <button
                  className="w-full bg-[#ad2132] text-white py-2 rounded-md font-medium hover:bg-[#8a1a2a] transition"
                  onClick={() => {
                    window.location.href = `/dashboard/coursemodule`;
                  }}
                >
                  Continue Learning
                </button>

                <button
                  onClick={() => handleDownload(course.pdf, `${course.name}.pdf`)}
                  className="block mt-2 w-full text-center text-sm text-[#ad2132] hover:underline"
                >
                  Download PDF
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
