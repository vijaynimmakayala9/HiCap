import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaUpload } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const interviews = [
  {
    id: 1,
    company: 'Amazon',
    role: 'Senior UI/UX Designer',
    date: '20-06-2025',
    workMode: 'Full Time',
    lpa: '20 LPA',
    logo: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
  },
  {
    id: 2,
    company: 'Google',
    role: 'Frontend Developer',
    date: '22-06-2025',
    workMode: 'Part Time',
    lpa: '15 LPA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    id: 3,
    company: 'Microsoft',
    role: 'Product Designer',
    date: '25-06-2025',
    workMode: 'Remote',
    lpa: '18 LPA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    id: 4,
    company: 'Netflix',
    role: 'UX Researcher',
    date: '28-06-2025',
    workMode: 'Contract',
    lpa: '17 LPA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 5,
    company: 'Apple',
    role: 'Product Manager',
    date: '30-06-2025',
    workMode: 'Full Time',
    lpa: '22 LPA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
];

const InterviewCard = ({ interview, onApplyClick }) => {
  return (
    <div className="card p-3 mb-4 shadow-sm rounded-4 position-relative" style={{ minHeight: '340px' }}>
      <div className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-light rounded-pill border text-muted small">
        {interview.date}
      </div>
      <div className="position-absolute top-0 end-0 m-2 rounded-circle bg-white d-flex align-items-center justify-content-center shadow" style={{ width: '50px', height: '50px' }}>
        <img src={interview.logo} alt="Logo" className="img-fluid" style={{ width: '30px', height: '30px' }} />
      </div>
      <div className="mt-5 p-3 bg-light rounded-4 d-flex flex-column justify-content-between" style={{ height: '220px' }}>
        <div>
          <p className="mb-1 fw-medium text-dark small">{interview.company}</p>
          <p className="fw-semibold text-dark mb-2">{interview.role}</p>
          <div className="badge bg-white text-dark shadow-sm mb-2">{interview.workMode}</div>
          <p className="small text-muted">{interview.lpa}</p>
        </div>
        <button
          onClick={() => onApplyClick(interview)}
          className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 mt-2"
        >
          Apply <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Interviews = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', resume: null });

  const closeModal = () => {
    setSelectedInterview(null);
    setFormData({ name: '', email: '', phone: '', resume: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You have applied for the role: ${selectedInterview.role} at ${selectedInterview.company}`);
    closeModal();
  };

  return (
    <>
      <Header />
      <div className="container py-5 my-5 bg-light">
        <div className="mb-4">
          <h1 className="display-6 fw-bold text-dark">Interviews</h1>
          <div className="bg-success" style={{ width: '200px', height: '3px', borderRadius: '20px' }}></div>
        </div>
        <div className="row">
          {interviews.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <InterviewCard interview={item} onApplyClick={setSelectedInterview} />
            </div>
          ))}
        </div>
      </div>

      {selectedInterview && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={closeModal}
              ></button>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img src={selectedInterview.logo} alt={selectedInterview.company} className="img-fluid" style={{ width: '60px' }} />
                <div>
                  <h5 className="mb-0 fw-bold">{selectedInterview.company}</h5>
                  <small className="text-muted">{selectedInterview.role}</small>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Upload Resume</label>
                  <div className="d-flex align-items-center gap-2">
                    <label htmlFor="resume" className="btn btn-outline-primary btn-sm">
                      <FaUpload className="me-1" /> Upload
                    </label>
                    {formData.resume && (
                      <span className="small text-muted">{formData.resume.name}</span>
                    )}
                  </div>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="d-none"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-pill mt-3 d-flex align-items-center justify-content-center gap-2">
                  Submit Application <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Interviews;
