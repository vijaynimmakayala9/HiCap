import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    additionalMessage: '',
    enrollmentDate: '',
  });

  const handleClick = () => {
    navigate('/courses');
  };
  const toggleDescription = (id) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://hicapbackend.onrender.com/api/users/allcourses');
        const data = await response.json();
        if (response.ok) {
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollmentPayload),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Enrollment successful!');
        handleCloseModal();
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
      <section className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold display-6">Available Courses</h1>
          <div className="bg-success rounded-pill" style={{ width: '216px', height: '8px' }}></div>
        </div>

        <div className="row">
          {courses.map(({ _id, name, duration, liveProjects, rating, description, image }) => (
            <div key={_id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={image} className="card-img-top rounded-top-4" alt={name} style={{ height: '160px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-success">{name}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {expandedCourses[_id]
                      ? description
                      : `${description?.substring(0, 100)}...`}
                  </p>
                  {description?.length > 100 && (
                    <button
                      className="btn btn-link px-0 mb-2 text-success"
                      style={{ fontSize: '0.85rem' }}
                      onClick={() => toggleDescription(_id)}
                    >
                      {expandedCourses[_id] ? 'View Less' : 'View All'}
                    </button>
                  )}
                  <div className="d-flex flex-wrap text-muted small mb-3">
                    <div className="me-3 d-flex align-items-center">
                      <FaRegClock className="me-1" /> {duration}
                    </div>
                    <div className="me-3 d-flex align-items-center">
                      <FaTasks className="me-1" /> {liveProjects} Live Projects
                    </div>
                    <div className="d-flex align-items-center">
                      <FaStar className="me-1 text-warning" /> {rating}/5
                    </div>
                  </div>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleEnrollClick({ title: name, duration, description, _id })}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-success px-5 py-2 fw-semibold rounded-pill" onClick={handleClick}>View All</button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header bg-success text-white rounded-top-4">
                <h5 className="modal-title">Enroll in {enrolledCourse?.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-control mb-3" placeholder="Full Name" required />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control mb-3" placeholder="Email" required />
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="form-control mb-3" placeholder="Phone Number" required />
                  <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleInputChange} className="form-control mb-3" />
                  <textarea name="additionalMessage" value={formData.additionalMessage} onChange={handleInputChange} rows="3" className="form-control mb-3" placeholder="Additional Message or Comments"></textarea>
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>Cancel</button>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
