import React, { useState, useEffect, useRef } from "react";
import Footer from "../Pages/Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  const [userType, setUserType] = useState("student");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const courseInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    courseId: "",
    course: "",
    degree: "",
    department: "",
    yearOfPassedOut: "",
    company: "",
    role: "",
    experience: "",
  });

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.techsterker.com/api/coursecontroller"
        );
        if (res.data.success) {
          setCourses(res.data.data); // API returns {success, count, data:[...]}
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        courseInputRef.current &&
        !courseInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Email uniqueness check
    if (name === "email") {
      if (!value) {
        setEmailError("Email is required");
        return;
      }

      try {
        const res = await axios.get("https://api.techsterker.com/api/allusers");
        if (res.data.success) {
          const exists = res.data.data.some(
            (u) => u.email.toLowerCase() === value.toLowerCase()
          );
          if (exists) {
            setEmailError("This email is already registered. Try another.");
          } else {
            setEmailError("");
          }
        }
      } catch (err) {
        console.error("Error checking email uniqueness:", err);
      }
    }
  };

  // Handle course search input
  const handleCourseInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFormData((prev) => ({ ...prev, course: e.target.value }));
    setShowSuggestions(true);
  };

  const handleCourseSelect = (course) => {
    setFormData((prev) => ({
      ...prev,
      course: course.name,
      courseId: course._id,
    }));
    setSearchTerm(course.name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.email || !formData.courseId) {
      alert("Please fill all required fields");
      return;
    }

    if (emailError) {
      alert("Please fix email issue before continuing.");
      return;
    }

    navigate("/ourpolicies", {
      state: {
        formData: formData,
        userType: userType,
        selectedCourse: courses.find((c) => c._id === formData.courseId),
      },
    });
    window.scrollTo(0, 0);
  };

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fdf1f2] to-[#f9e6e7] p-4 main-content">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-[#a51d34]/30">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#a51d34]">
            Course Registration Form
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-[#a51d34] font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-[#a51d34] font-medium mb-1">
                Mobile *
              </label>
              <input
                type="tel"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
                required
                className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#a51d34] font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#a51d34]/40 focus:ring-[#a51d34]"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Searchable Courses */}
            <div className="relative" ref={courseInputRef}>
              <label className="block text-[#a51d34] font-medium mb-1">
                Course *
              </label>
              <input
                type="text"
                placeholder="Search or Select Course"
                value={searchTerm}
                onChange={handleCourseInputChange}
                onFocus={() => setShowSuggestions(true)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
              />

              {showSuggestions && filteredCourses.length > 0 && (
                <ul
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 bg-white border border-[#a51d34]/40 rounded-lg shadow-md max-h-48 overflow-y-auto mt-1 z-50"
                >
                  {filteredCourses.map((course) => (
                    <li
                      key={course._id}
                      onClick={() => handleCourseSelect(course)}
                      className="px-4 py-2 hover:bg-[#fcebed] cursor-pointer text-[#a51d34] flex justify-between"
                    >
                      <span>{course.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* User Type */}
            <div>
              <label className="block text-[#a51d34] font-medium mb-1">
                I am a *
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none "
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Conditional fields */}
            {userType === "student" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    name="degree"
                    onChange={handleChange}
                    value={formData.degree}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleChange}
                    value={formData.department}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Year of Passed Out
                  </label>
                  <input
                    type="text"
                    name="yearOfPassedOut"
                    onChange={handleChange}
                    value={formData.yearOfPassedOut}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    onChange={handleChange}
                    value={formData.company}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    onChange={handleChange}
                    value={formData.role}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#a51d34] font-medium mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    onChange={handleChange}
                    value={formData.experience}
                    className="w-full px-4 py-2 border border-[#a51d34]/40 rounded-lg focus:ring-2 focus:ring-[#a51d34] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.courseId || loading || !!emailError}
              className="w-full text-white font-semibold py-3 rounded-lg shadow-md transition bg-gradient-to-br from-[#a51d34] to-[#d32f2f] hover:opacity-90 disabled:opacity-50"
            >
              {formData.courseId
                ? `Continue with ${
                    courses.find((c) => c._id === formData.courseId)?.name || ""
                  } - ₹${
                    courses.find((c) => c._id === formData.courseId)?.price || 0
                  }/-`
                : loading
                ? "Loading Courses..."
                : "Select a Course to Continue"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentForm;
