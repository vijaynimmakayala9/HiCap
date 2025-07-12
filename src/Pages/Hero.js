import React, { useState } from 'react';
import { FaChalkboardTeacher, FaCertificate } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    currentStatus: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hicapbackend.onrender.com/api/users/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ fullName: '', email: '', mobile: '', currentStatus: '' });
        handleClosePopup();
      } else {
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className={`${
          showPopup ? 'blur-sm' : ''
        } transition-all w-full pt-[60px] px-6 mt-10 md:px-[60px] flex flex-col-reverse lg:flex-row items-start justify-between`}
      >
        {/* Left Content */}
        <div className="max-w-[678px] mt-10 lg:mt-0">
          <h1 className="font-roboto font-bold text-[36px] md:text-[48px] text-black leading-[1.1]">
            Upgrade Your Career With<br />
            Real-World <span style={{ color: '#007860' }}>Knowledge.</span>
          </h1>

          <p className="font-roboto text-[13px] mt-3 text-gray-700">
            Skill Up With India’s Top Experts — No Theory, Just Real Learning.
          </p>

          {/* Features */}
          <div className="flex space-x-6 mt-6 text-sm text-[#007860] flex-wrap">
            <div className="flex items-center mb-2 md:mb-0">
              <FaChalkboardTeacher className="mr-2" />
              Online & Offline
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <FaCertificate className="mr-2" />
              Certifications
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleOpenPopup}
            className="mt-6 flex items-center px-5 py-3 rounded-md text-white font-medium bg-[#007860]"
          >
            Connect With Us <FiSend className="ml-2" />
          </button>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-[360px] h-[300px] md:h-[360px] mt-6 md:mt-0">
          <img src="/girl.png" alt="Hero" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Cute Centered Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center z-50">
          <div className="mt-[80px] bg-[#027A62] w-[90%] sm:w-[420px] rounded-lg p-6 relative text-white shadow-lg">
            {/* Close Icon */}
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-4 text-white text-2xl hover:scale-110 transition-transform"
              title="Close"
            >
              <IoClose />
            </button>

            {/* Title */}
            <h2 className="text-white text-2xl font-bold text-center mb-6 leading-tight">
              Talk to our Academic Counsellors
            </h2>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full p-2 rounded text-black text-sm"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-2 rounded text-black text-sm"
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className="w-full p-2 rounded text-black text-sm"
              />
              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black text-sm"
              >
                <option value="">Select Current Status</option>
                <option>Student</option>
                <option>Working Professional</option>
                <option>Freelancer</option>
                <option>Other</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#027A62] font-semibold py-2 rounded hover:bg-gray-100 transition"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
