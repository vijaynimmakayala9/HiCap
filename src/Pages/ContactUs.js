import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaPlus, FaMinus } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import AboutMagnitia from './AboutMagnitia';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [courses, setCourses] = useState([]);
  const [isBranchVisible, setIsBranchVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    city: '',
    timing: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicapbackend.onrender.com/api/users/allcourses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      section: [{ name: formData.course }],
      city: formData.city,
      timings: [{ preferred: formData.timing }],
      message: formData.message
    };

    try {
      const response = await fetch('https://hicap-backend-4rat.onrender.com/api/enquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire('Success', 'Your enquiry has been submitted!', 'success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: '',
          city: '',
          timing: '',
          message: '',
        });
      } else {
        Swal.fire('Error', result.message || 'Submission failed. Try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-[1440px] mx-auto px-4 py-5">
        <AboutMagnitia />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-10">
        <div className="mb-10 text-center my-2">
          <h1 className="text-3xl font-bold" style={{ color: "#9c27b0" }}>
            Looking for Classroom/Online Training?
          </h1>
          <p className="text-gray-800 mt-2">
            <strong>Tel :</strong>{' '}
            <a href="tel:+916309161616" className="text-green-700 font-semibold">
              +91 6309 16 16 16
            </a>{' '}
            /{' '}
            <strong>E-Mail :</strong>{' '}
            <a href="mailto:info.courses@gmail.com" className="text-green-700 font-semibold">
              info.courses@gmail.com
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          {/* Enquiry Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Course Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="city"
                placeholder="City Name"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <select
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="">Preferred Timings</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Weekend">Weekend</option>
                <option value="Online">Online</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded resize-none"
              />
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded font-semibold hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>

          {/* Branch Details Toggle Section */}
          <div className="rounded-lg border shadow overflow-hidden">
            <div
              className="bg-green-700 text-white px-5 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => setIsBranchVisible(!isBranchVisible)}
            >
              <span className="font-semibold uppercase">Hyderabad</span>
              {isBranchVisible ? <FaMinus /> : <FaPlus />}
            </div>

            {isBranchVisible && (
              <>
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-purple-700">Hyderabad Branch</h3>
                  <p className="text-gray-800">
                    Plot No. MIG-208, GSR Enclave, 3rd Floor, Above the Arvind Store,<br />
                    Road No. 1, KPHB Colony, Kukatpally, Hyderabad, 500072
                  </p>
                  <p className="text-gray-800">
                    <strong>Tel :</strong>{' '}
                    <a href="tel:+916309161616" className="text-green-700 font-semibold">
                      +91 6309 16 16 16
                    </a>{' '}
                    /{' '}
                    <a href="tel:+916309171717" className="text-green-700 font-semibold">
                      +91 6309 17 17 17
                    </a>
                  </p>
                  <p className="text-gray-800">
                    <strong>Email :</strong>{' '}
                    <a href="mailto:info@magnitia.com" className="text-green-700 font-semibold">
                      info@magnitia.com
                    </a>
                  </p>
                </div>
                <div className="w-full h-[300px]">
                  <iframe
                    title="Magnitia IT Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3433657893185!2d78.39761891418862!3d17.44246400523407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9156ed0e6b8f%3A0x8ac1071d0275821f!2sMAGNITIA%20-%20IT%20Training%20Institute!5e0!3m2!1sen!2sin!4v1659340731616!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
