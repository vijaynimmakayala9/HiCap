import React, { useState, useEffect, useRef } from "react";
import Footer from "../Pages/Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [userType, setUserType] = useState("student");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "http://31.97.206.144:5001/api/coursecontroller"
        );
        const data = await res.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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


    const payload = {
      fullName: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      courseId: formData.courseId,
      roleType: userType,
      company: formData.company,
      role: formData.role,
      experience: formData.experience,
      isPrivacyAccepted: true
    };

    try {
      setLoading(true);
      const res = await fetch("https://backend-hicap.onrender.com/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        console.log("Form submitted successfully:", data);
        
        // Pass formId and mobile through state when navigating
        navigate("/ourpolicies", { 
          state: { 
            formId: data.data._id, // Assuming the API returns the created form ID
            mobile: formData.mobile 
          } 
        });
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 main-content">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Payment Form
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Searchable Courses Section */}
            <div className="relative" ref={courseInputRef}>
              <label className="block text-gray-700 mb-1">Course</label>
              <input
                type="text"
                placeholder="Search or Select Course"
                value={searchTerm}
                onChange={handleCourseInputChange}
                onFocus={() => setShowSuggestions(true)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {showSuggestions && filteredCourses.length > 0 && (
                <ul
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto mt-1 z-50"
                >
                  {filteredCourses.map((course) => (
                    <li
                      key={course._id}
                      onClick={() => handleCourseSelect(course)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {course.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-gray-700 mb-1">I am a</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Student Fields */}
            {userType === "student" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    onChange={handleChange}
                    value={formData.degree}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    onChange={handleChange}
                    value={formData.department}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Year of Passed Out
                  </label>
                  <input
                    type="text"
                    name="yearOfPassedOut"
                    onChange={handleChange}
                    value={formData.yearOfPassedOut}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Professional Fields */}
            {userType === "professional" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    onChange={handleChange}
                    value={formData.company}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    onChange={handleChange}
                    value={formData.role}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    onChange={handleChange}
                    value={formData.experience}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            

            {/* Submit */}
            <button
              type="submit"
              className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition bg-gradient-to-br from-[#a51d34] to-[#d32f2f] hover:opacity-90}`}
            >
              {loading ? "Submitting..." : "Proceed"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentForm;