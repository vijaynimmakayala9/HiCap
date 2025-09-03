import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const GetInTouch = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    iAm: "",
    collegeName: "",
    branch: "",
    yearOfPassedOut: "",
    companyName: "",
    roleTitle: "",
    experienceInYears: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        iAm: role,
      };

      if (role === "student") {
        payload.collegeName = formData.collegeName;
        payload.branch = formData.branch;
        payload.yearOfPassedOut = formData.yearOfPassedOut;
      } else if (role === "professional") {
        payload.companyName = formData.companyName;
        payload.role = formData.roleTitle;
        payload.experienceInYears = Number(formData.experienceInYears);
      }

      const response = await axios.post(
        "http://31.97.206.144:5001/api/getintouch",
        payload
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          confirmButtonColor: "#a51d34",
        });
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          message: "",
          iAm: "",
          collegeName: "",
          branch: "",
          yearOfPassedOut: "",
          companyName: "",
          roleTitle: "",
          experienceInYears: "",
        });
        setRole("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#a51d34",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to submit. Please try again later.",
        confirmButtonColor: "#a51d34",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a51d34]">
            Get in Touch
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Whether you're a student or a professional, we'd love to hear from you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <select
                name="iAm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
              >
                <option value="">Select...</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Student Fields */}
            {role === "student" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g., ABC College"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Passed Out
                  </label>
                  <input
                    type="number"
                    name="yearOfPassedOut"
                    value={formData.yearOfPassedOut}
                    onChange={handleChange}
                    placeholder="e.g., 2024"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
              </>
            )}

            {/* Professional Fields */}
            {role === "professional" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g., ABC Corporation"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (in years)
                  </label>
                  <input
                    type="number"
                    name="experienceInYears"
                    value={formData.experienceInYears}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
                  />
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your query or message here"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a51d34]"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-[#a51d34] to-[#d32f2f] text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition ${
                  loading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
