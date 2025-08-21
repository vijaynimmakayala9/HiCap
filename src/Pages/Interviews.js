import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const InterviewCard = ({ interview }) => {
  return (
    <div className="card p-3 mb-4 shadow-sm rounded-4 position-relative" style={{ minHeight: '340px' }}>
      <div className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-light rounded-pill border text-muted small">
        {new Date(interview.date).toLocaleDateString('en-IN')}
      </div>
      <div className="position-absolute top-0 end-0 m-2 rounded-circle bg-white d-flex align-items-center justify-content-center shadow" style={{ width: '50px', height: '50px' }}>
        <img src={interview.image} alt="Logo" className="img-fluid" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
      </div>
      <div className="mt-5 p-3 bg-light rounded-4 d-flex flex-column justify-content-between" style={{ height: '220px' }}>
        <div>
          <p className="mb-1 fw-medium textcolor small">{interview.companyName}</p>
          <p className="fw-semibold textcolorlight mb-2">{interview.role}</p>
          <div className="badge bg-white text-dark shadow-sm mb-2">{interview.type}</div>
          <p className="small text-muted">{interview.salary}</p>
          {interview.content && (
            <p className="small text-muted mt-2">{interview.content.substring(0, 50)}...</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => window.open(interview.link, '_blank')}
          className="btn bg-meroon w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 mt-2"
        >
          Apply <ArrowRight size={16} />
        </button>

      </div>
    </div>
  );
};

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('https://hicap-backend-4rat.onrender.com/api/interviews');
        if (!response.ok) {
          throw new Error('Failed to fetch interviews');
        }
        const data = await response.json();
        if (data.success) {
          setInterviews(data.data);
        } else {
          throw new Error('Failed to load interview data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 my-5 bg-light text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading interviews...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container py-5 my-5 bg-light text-center">
          <div className="alert alert-danger">{error}</div>
          <p>Failed to load interview data. Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5 my-5 bg-light">
        <div className="mb-4">
          <h1 className="display-6 fw-bold textcolor">Interviews</h1>
          {/* <div className="bg-meroon" style={{ width: '200px', height: '3px', borderRadius: '20px' }}></div> */}
        </div>
        {interviews.length === 0 ? (
          <div className="text-center py-5">
            <h4>No interviews available at the moment</h4>
            <p>Please check back later for new opportunities</p>
          </div>
        ) : (
          <div className="row">
            {interviews.map((item) => (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <InterviewCard interview={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Interviews;