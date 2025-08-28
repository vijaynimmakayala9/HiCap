import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Building2, DollarSign, Filter, Search } from 'lucide-react';

const InterviewCard = ({ interview }) => {
  return (
    <div
      className="card mb-4 rounded-4 position-relative d-flex flex-column overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        minHeight: '420px',
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
        style={{
          backgroundColor: '#f1f3f5',
          fontSize: '0.75rem',
          fontWeight: '500',
        }}
      >
        <Calendar size={14} className="me-1" />
        {new Date(interview.date).toLocaleDateString('en-IN')}
      </div>

      {/* Top-right Logo */}
      <div
        className="position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#f1f3f5',
        }}
      >
        <img
          src={interview.image}
          alt="Logo"
          className="img-fluid"
          style={{ width: '30px', height: '30px', objectFit: 'contain' }}
        />
      </div>

      {/* Card Body */}
      <div className="mt-5 p-4 d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <p className="mb-1 fw-medium small d-flex align-items-center text-primary">
            <Building2 size={14} className="me-1" />
            {interview.companyName}
          </p>

          <h5 className="fw-semibold mb-2 text-dark">{interview.role}</h5>

          <span
            className="badge mb-2 px-3 py-2"
            style={{
              backgroundColor: '#e9ecef',
              color: '#495057',
              fontSize: '0.75rem',
              borderRadius: '12px',
            }}
          >
            {interview.type}
          </span>

          <p className="small d-flex align-items-center mt-3 text-muted">
            <DollarSign size={14} className="me-1" />
            {interview.salary}
          </p>

          {interview.content && (
            <p className="small mt-2 text-muted" style={{ lineHeight: '1.5' }}>
              {interview.content.length > 80
                ? `${interview.content.substring(0, 80)}...`
                : interview.content}
            </p>
          )}
        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={() => window.open(interview.link, '_blank')}
          className="btn w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 mt-3 py-2"
          style={{
            backgroundColor: '#0d6efd',
            color: '#fff',
            fontWeight: '600',
            border: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b5ed7')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0d6efd')}
        >
          Apply Now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch(
          'https://hicap-backend-4rat.onrender.com/api/interviews'
        );
        if (!response.ok) throw new Error('Failed to fetch interviews');
        const data = await response.json();
        if (data.success) setInterviews(data.data);
        else throw new Error('Failed to load interview data');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter((interview) => {
    const matchesFilter =
      filter === 'all' || interview.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      interview.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        <button
          className="btn btn-primary mt-3 rounded-pill px-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="container py-5 min-vh-100">
      <div className="mb-4 text-center text-md-start">
        <h1 className="display-6 fw-bold text-dark mb-2">Interview Opportunities</h1>
        <p className="text-muted">Discover your next career move with these opportunities</p>

        {/* Search & Filter */}
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

          <div className="col-12 col-md-7 d-flex flex-wrap gap-2 align-items-center mt-2 mt-md-0">
            <span className="text-muted small d-flex align-items-center me-2">
              <Filter size={16} className="me-1" /> Filter by:
            </span>
            {['all', 'full-time', 'part-time', 'internship'].map((type) => (
              <button
                key={type}
                className={`btn rounded-pill px-3 py-2 ${filter === type ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setFilter(type)}
              >
                {type === 'all'
                  ? 'All'
                  : type.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="text-center py-5">
          <div className="bg-white rounded-4 p-5 shadow-sm border">
            <h4 className="text-muted">No interviews found</h4>
            <p className="text-muted">We couldn't find any interviews matching your criteria</p>
            <button
              className="btn btn-primary rounded-pill px-4 mt-3"
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredInterviews.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-md-6 col-lg-3">
              <InterviewCard interview={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviews;
