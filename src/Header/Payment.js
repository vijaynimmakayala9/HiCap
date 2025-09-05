import React, { useState, useEffect, useRef } from "react";
import Footer from "../Pages/Footer";
import Header from "./Header";

const PaymentForm = () => {
    const [userType, setUserType] = useState("student");
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [agreed, setAgreed] = useState(false); // ✅ Track terms agreement

    const courseInputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        course: "",
        degree: "",
        department: "",
        yearOfPassedOut: "",
        company: "",
        role: "",
        experience: "",
    });

    // ✅ Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("http://31.97.206.144:5001/api/coursecontroller");
                const data = await res.json();
                setCourses(data.data || []);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // ✅ Hide suggestions when clicking outside
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Handle course search input
    const handleCourseInputChange = (e) => {
        setSearchTerm(e.target.value);
        setFormData((prev) => ({ ...prev, course: e.target.value }));
        setShowSuggestions(true);
    };

    const handleCourseSelect = (courseName) => {
        setFormData((prev) => ({ ...prev, course: courseName }));
        setSearchTerm(courseName);
        setShowSuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) return; // safety check
        console.log("Enrollment Submitted:", formData);
        // 🔹 integrate payment API here
    };

    const filteredCourses = courses.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 main-content">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Payment Form
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        {/* ✅ Searchable Courses Section */}
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
                                            onClick={() => handleCourseSelect(course.name)}
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

                        {/* ✅ Terms & Conditions */}
                        {/* <div className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="text-gray-600 text-sm">
                                By Selecting this, you acknowledge that you've read and agree to our{" "}
                                <a href="/terms" className="textcolor underline">
                                    Terms & Conditions
                                </a> and<br/>
                                <a href="/policies" className="textcolor underline">
                                    Privacy Statement.
                                </a>
                            </label>
                        </div> */}

                        {/* Submit */}
                        <button
                            type="submit"
                            //disabled={!agreed} // ✅ Disabled until checked
                            className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition ${!agreed
                                ? "bg-gradient-to-br from-[#a51d34] to-[#d32f2f] hover:opacity-90"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentForm;
