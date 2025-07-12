import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import Header from './Header'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';


const Courses = () => {

  const navigate = useNavigate(); // Hook to use navigation

  // States for courses and modal
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    additionalMessage: '',
    enrollmentDate: '',
  });

  
  const handleClick = () => {
    navigate('/courses'); // Navigate to the /courses page
  };

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicapbackend.onrender.com/api/users/allcourses');
        const data = await response.json();
        if (response.ok) {
          setCourses(data); // Set the fetched data into state
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle Enroll button click
  const handleEnrollClick = (course) => {
    setEnrolledCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enrollmentPayload = {
      courseId: enrolledCourse._id,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      additionalMessage: formData.additionalMessage,
    };

    try {
      const response = await fetch('https://hicapbackend.onrender.com/api/users/enrollcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Enrollment successful!');
        handleCloseModal(); // Close the modal after submission
      } else {
        alert(data.message || 'Error enrolling in course.');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Error submitting enrollment form.');
    }
  };

  return (
    <>
      <Header />

      {/* Section for Available Courses */}
      <section className="w-full px-6 md:px-[60px] py-20 pt-0 mt-20">
        {/* Heading with green line */}
        <div className="max-w-[600px] mb-12">
  <h1 className="font-roboto font-bold text-3xl mb-2 text-black">Available Courses</h1>
  <div
    style={{
      width: '216px',
      height: '8px',
      borderRadius: '20px',
      backgroundColor: '#007860',
      margin: '0', // Centering is removed
    }}
  />
</div>


        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1100px] mx-auto">
          {courses.map(({ _id, name, duration, liveProjects, rating, description, image }) => (
            <div
              key={_id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
              style={{
                border: '1px solid #00000033',
              }}
            >
              <div>
                <h2 className="font-roboto font-bold text-xl mb-2">{name}</h2>

                {/* Image of the Course */}
                <img src={image} alt={name} className="w-full h-36 object-cover rounded-md mb-4" />

                {/* Subtitle with icons */}
                <div className="flex flex-wrap items-center space-x-4 text-gray-600 text-sm mb-4 font-roboto">
                  <div className="flex items-center space-x-1">
                    <FaRegClock />
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaTasks />
                    <span>{liveProjects} Live Projects</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span>{rating}/5</span>
                  </div>
                </div>

                <p className="font-roboto text-base text-gray-700">{description}</p>
              </div>

              <button
                className="w-28 h-10 rounded-md bg-[#007860] text-white font-semibold cursor-pointer mt-4"
                onClick={() => handleEnrollClick({ title: name, duration, description, _id })}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>

        {/* View All button below grid */}
        <div className="max-w-[1100px] mx-auto mt-8 flex justify-center">
         <button
        onClick={handleClick} // OnClick handler added
        style={{
          padding: '10px 30px',
          borderRadius: '5px',
          border: '2px solid #007860',
          backgroundColor: 'transparent',
          color: '#007860',
          fontWeight: '600',
          fontFamily: 'Roboto, sans-serif',
          cursor: 'pointer',
        }}
      >
            View All
          </button>
        </div>
      </section>

      {/* Modal for Enroll Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{
            zIndex: 1000,
          }}
        >
          <div
            className="bg-[#007860] p-6 rounded-xl w-11/12 sm:w-96 text-white shadow-xl"
            style={{
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2 className="font-roboto text-xl font-bold mb-4">
              Enroll in {enrolledCourse?.title}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-md mb-4 text-black"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-3 rounded-md mb-4 text-black"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded-md mb-4 text-black"
                required
              />
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md mb-4 text-black"
              />
              <textarea
                name="additionalMessage"
                value={formData.additionalMessage}
                onChange={handleInputChange}
                placeholder="Additional Message or Comments"
                rows="3"
                className="w-full p-3 rounded-md mb-4 text-black"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="py-2 px-4 bg-[#f5f5f5] text-[#007860] border border-[#007860] rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-white text-[#007860] border border-[#007860] rounded-md cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
