import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Upload } from 'lucide-react';

const DoubtSession = () => {
  const [formData, setFormData] = useState({
    course: '',
    batch: '',
    mentor: '',
    date: '',
    doubt: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Ticket Raised!');
  };

  return (
    <div>
      <Header />

      {/* Title Section */}
      <div className="container mt-5 pt-5">
        <h2 className="fw-bold text-dark">Doubt Session</h2>
        <div className="bg-success" style={{ width: '200px', height: '3px', borderRadius: '5px' }}></div>
      </div>

      {/* Banner Section with Background Image */}
      <div
        className="text-white text-center py-5 mt-4"
        style={{
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSma23d2tvqOhwJa9RG6FPpRD4MOJluWyCo3A&s")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Got a Question? We’ve Got Your Back!</h1>
        </div>
      </div>


      {/* Main Section */}
      <div className="container my-5">
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
            <div className="bg-success text-white p-4 rounded shadow">
              <h4 className="text-uppercase fw-semibold">Get in touch</h4>
              <h2 className="fw-bold mb-4">Submit Your Academic Query</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">Course</label>
                  <select
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="batch" className="form-label">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    className="form-control"
                    value={formData.batch}
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
                  <label htmlFor="doubt" className="form-label">Doubt Description</label>
                  <textarea
                    name="doubt"
                    className="form-control"
                    rows="3"
                    value={formData.doubt}
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
                </div>

                <button type="submit" className="btn btn-light w-100 fw-bold">
                  Raise Ticket
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
