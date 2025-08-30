import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Calendar,
  Building2,
  MapPin,
  Briefcase,
  Search,
} from 'lucide-react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InterviewCard = ({ interview, onOpen }) => (
  <div
    className="card mb-4 rounded-4 position-relative d-flex flex-column overflow-hidden"
    style={{
      backgroundColor: '#ffffff',
      minHeight: '100px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 16px 28px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
    }}
  >
    {/* Top-left Date */}
    <div
      className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill d-flex align-items-center text-muted"
      style={{ backgroundColor: '#f1f3f5', fontSize: '0.75rem', fontWeight: '500' }}
    >
      <Calendar size={14} className="me-1" />
      {new Date(interview.createdAt).toLocaleDateString('en-IN')}
    </div>

    

    {/* Card Body */}
    <div className="mt-5 p-4 d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <p className="mb-1 fw-medium small d-flex align-items-center text-primary">
          <Building2 size={14} className="me-1" />
          {interview.companyName}
        </p>

        <h5 className="fw-semibold mb-2 text-dark">{interview.role}</h5>

        {interview.content && (
          <p className="small mt-2 text-muted" style={{ lineHeight: '1.5' }}>
            {interview.content.length > 80
              ? `${interview.content.substring(0, 80)}...`
              : interview.content}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpen(interview)}
        className="btn w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 mt-3 py-2"
        style={{ backgroundColor: '#0d6efd', color: '#fff', fontWeight: '600', border: 'none', transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b5ed7')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0d6efd')}
      >
        View Details <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterview, setSelectedInterview] = useState(null);

  // Get user from session storage
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userId = user.id;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch(
          `https://hicap-backend-4rat.onrender.com/api/interview/user/${userId}`
        );
        if (!response.ok) throw new Error('Failed to fetch interviews');
        const data = await response.json();
        if (data.success) {
          // Remove duplicates by _id
          const uniqueInterviews = Array.from(
            new Map(data.data.map((i) => [i._id, i])).values()
          );
          setInterviews(uniqueInterviews);
        } else throw new Error('Failed to load interview data');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter((interview) =>
    interview.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading interviews...</p>
      </div>
    );

  if (error)
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="alert alert-light rounded-4 shadow-sm border">
          <h5 className="text-danger">Oops! Something went wrong</h5>
          <p className="mb-0 text-muted">{error}</p>
        </div>
        <button className="btn bg-danger mt-3 rounded-pill px-4" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );

  return (
    <div className="container py-5 min-vh-100">
      <div className="mb-4 text-center text-md-start">
        <h1 className="display-6 fw-bold text-dark mb-2">Your Interviews</h1>
        <p className="text-muted">Track the interviews you are enrolled in</p>

        {/* Search */}
        <div className="row g-3 mt-3 justify-content-center justify-content-md-start">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ backgroundColor: '#f8f9fa' }}
              />
            </div>
          </div>
        </div>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="text-center py-5">
          <div className="bg-white rounded-4 p-5 shadow-sm border">
            <h4 className="text-muted">No interviews found</h4>
            <p className="text-muted">No interviews match your search</p>
            <button
              className="btn btn-primary rounded-pill px-4 mt-3"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredInterviews.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
              <InterviewCard interview={item} onOpen={setSelectedInterview} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal show={!!selectedInterview} onHide={() => setSelectedInterview(null)} centered size="lg">
        {selectedInterview && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedInterview.companyName} - {selectedInterview.role}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Experience:</strong> {selectedInterview.experience}</p>
              <p className="d-flex align-items-center">
                <MapPin size={16} className="me-2 text-muted" /> {selectedInterview.location}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedInterview(null)}>Close</Button>
              <Button className='bg-meroon' onClick={() => window.open(selectedInterview.link, '_blank')}>Apply Now</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Interviews;
