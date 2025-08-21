import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { Upload } from 'lucide-react';

const DoubtSession = () => {
  const [formData, setFormData] = useState({
    enrolledcourses: '',
    batchNumber: '',
    mentor: '',
    date: '',
    description: '',
    image: null,
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`);
        if (response.data.success) {
          setEnrolledCourses(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch enrolled courses:', err);
        setError('Failed to load your enrolled courses. Please try again later.');
      }
    };
    fetchEnrolledCourses();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('enrolledcourses', formData.enrolledcourses);
      formDataToSend.append('batchNumber', formData.batchNumber);
      formDataToSend.append('mentor', formData.mentor);
      formDataToSend.append('date', new Date(formData.date).toISOString());
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(
        'https://hicap-backend-4rat.onrender.com/api/doubtsession',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          enrolledcourses: '',
          batchNumber: '',
          mentor: '',
          date: '',
          description: '',
          image: null,
        });
      } else {
        setError('Failed to submit doubt. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error submitting doubt:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      {/* Title Section */}
      <div className="container mt-5 pt-5">
        <h2 className="fw-bold textcolor">Doubt Session</h2>
        {/* <div className="bg-meroon" style={{ width: '200px', height: '3px', borderRadius: '5px' }}></div> */}
      </div>

      {/* Banner Section with Background Image */}
      <div
        className="text-white text-center py-5 mt-4 "
        style={{
          backgroundImage: 'url("https://media.istockphoto.com/id/1072859840/vector/a-rectangular-creative-merry-christmas-red-self-chequered-checkered-background-vector-xmas.jpg?s=612x612&w=0&k=20&c=e5z3mCrP-WLXi8CWbpgVJ5Lg5uUin-uX6Hh8emHzb9M=")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Got a Question? We've Got Your Back!</h1>
        </div>
      </div>

      {/* Main Section */}
      <div className="container my-5">
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Your doubt has been submitted successfully!
            <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
          </div>
        )}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <div className="row align-items-center flex-column-reverse flex-lg-row">
          {/* Left: Image */}
          <div className="col-lg-6 mb-4 mb-lg-0 text-center">
            <img
              src="https://png.pngtree.com/png-clipart/20230815/original/pngtree-problem-and-solution-in-business-solving-to-look-ideas-with-the-concept-of-teamwork-can-use-for-web-banner-or-background-flat-illustration-picture-image_7945409.png"
              alt="doubt illustration"
              className="img-fluid"
            />
          </div>

          {/* Right: Form */}
          <div className="col-lg-6">
            <div className="bg-meroon text-white p-4 rounded shadow">
              <h4 className="text-uppercase fw-semibold">Get in touch</h4>
              <h2 className="fw-bold mb-4">Submit Your Academic Query</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="enrolledcourses" className="form-label">Course</label>
                  <select
                    name="enrolledcourses"
                    id="enrolledcourses"
                    value={formData.enrolledcourses}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Course</option>
                    {enrolledCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="batchNumber" className="form-label">Batch</label>
                  <input
                    type="text"
                    name="batchNumber"
                    className="form-control"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    placeholder="e.g., Jan 2025 Weekday"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mentor" className="form-label">Mentor</label>
                  <input
                    type="text"
                    name="mentor"
                    className="form-control"
                    value={formData.mentor}
                    onChange={handleChange}
                    placeholder="Mentor Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Doubt Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your doubt"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-2 cursor-pointer">
                    <Upload size={20} />
                    Upload Image (optional)
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="form-control d-none"
                    />
                  </label>
                  {formData.image && (
                    <div className="mt-2">
                      <small>Selected: {formData.image.name}</small>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-light w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Raise Ticket'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoubtSession;