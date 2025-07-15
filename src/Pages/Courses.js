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

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

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

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIdx = (currentPage - 1) * coursesPerPage;
  const currentCourses = courses.slice(startIdx, startIdx + coursesPerPage);

  const toggleDescription = (id) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEnrollClick = (course) => {
    setEnrolledCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      courseId: enrolledCourse._id,
      ...formData,
    };

    try {
      const res = await fetch('https://hicapbackend.onrender.com/api/users/enrollcourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Enrollment successful!');
        handleCloseModal();
      } else {
        alert(data.message || 'Error enrolling.');
      }
    } catch (error) {
      alert('Submission failed.');
    }
  };

  const renderPagination = () => (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link text-success border-success" onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, idx) => (
          <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
            <button
              className={`page-link ${currentPage === idx + 1 ? 'bg-success border-success text-white' : 'text-success border-success'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link text-success border-success" onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );


  return (
    <>
      <Header />
      <section className="container py-5 my-5">
        <div className="mb-4 text-center text-md-start">
          <h1 className="fw-bold display-6">Available Courses</h1>
          <div className="bg-success rounded-pill mx-auto mx-md-0" style={{ width: '216px', height: '3px' }}></div>
        </div>

        <div className="row">
          {currentCourses.map(({ _id, name, duration, liveProjects, rating, description, image }) => (
            <div key={_id} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img src={image} alt={name} className="card-img-top rounded-top-4" style={{ height: '160px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-success">{name}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {expandedCourses[_id] ? description : `${description?.substring(0, 100)}...`}
                  </p>
                  {description?.length > 100 && (
                    <button className="btn btn-link px-0 mb-2 text-success" style={{ fontSize: '0.85rem' }} onClick={() => toggleDescription(_id)}>
                      {expandedCourses[_id] ? 'View Less' : 'View All'}
                    </button>
                  )}
                  <div className="d-flex flex-wrap text-muted small mb-3 gap-3">
                    <div className="d-flex align-items-center"><FaRegClock className="me-1" /> {duration}</div>
                    <div className="d-flex align-items-center"><FaTasks className="me-1" /> {liveProjects} Projects</div>
                    <div className="d-flex align-items-center"><FaStar className="me-1 text-warning" /> {rating}/5</div>
                  </div>
                  <button className="btn btn-success w-100 mt-auto" onClick={() => handleEnrollClick({ title: name, duration, description, _id })}>
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {renderPagination()}
      </section>

      {/* Modal remains unchanged */}
      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header bg-success text-white rounded-top-4">
                <h5 className="modal-title">Enroll in {enrolledCourse?.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3"><input type="text" name="fullName" className="form-control" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required /></div>
                    <div className="col-md-6 mb-3"><input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleInputChange} required /></div>
                    <div className="col-md-6 mb-3"><input type="tel" name="phoneNumber" className="form-control" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required /></div>
                    <div className="col-md-6 mb-3"><input type="date" name="enrollmentDate" className="form-control" value={formData.enrollmentDate} onChange={handleInputChange} /></div>
                    <div className="col-12 mb-3"><textarea name="additionalMessage" className="form-control" rows="3" placeholder="Additional Message or Comments" value={formData.additionalMessage} onChange={handleInputChange}></textarea></div>
                  </div>
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
