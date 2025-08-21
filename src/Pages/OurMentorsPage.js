import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const OurMentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    axios
      .get('https://hicap-backend-4rat.onrender.com/api/our-mentor/Mentor')
      .then(res => setMentors(res.data.data || []))
      .catch(err => console.error('Mentor API error:', err));

    axios
      .get('https://hicap-backend-4rat.onrender.com/api/our-mentor/experience')
      .then(res => setBenefits(res.data.data || []))
      .catch(err => console.error('Benefits API error:', err));
  }, []);

  return (
    <>
      <Header />

      <div className="container py-5 mt-5">
        {/* Mentors Section Header with Custom Underline */}
        <div className="text-center mb-5">
          <div className="d-inline-block position-relative mb-3">
            <h2 className="fw-bold text-dark mb-1">
              Our <span style={{ color: "#ad2132" }}>Mentors</span>
            </h2>
            {/* <div
              style={{
                width: "100px",
                height: "5px",
                backgroundColor: "#ad2132",
                borderRadius: "999px",
                position: "absolute",
                left: "0",  // Changed from 50% to 0
                bottom: "-6px",
              }}
            ></div> */}
          </div>
          <p className="lead text-secondary">
            Learn from industry experts with real-world experience
          </p>
        </div>

        {/* Mentors Cards */}
        <div className="mb-5">
          {mentors.map((mentor, idx) => (
            <div
              key={mentor._id}
              className={`row align-items-center g-4 mb-5 ${idx % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}
            >
              <div className="col-md-4 text-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="img-fluid rounded-circle "
                  style={{
                    width: '220px',
                    height: '220px',
                    objectFit: 'cover',
                    border: '4px solid np',
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="rounded p-4">
                  <h4 className="fw-bold mb-2" style={{ color: '#ad2132' }}>{mentor.name}</h4>
                  <h6 className="mb-3" style={{ color: '#c34153' }}>- {mentor.role} -</h6>
                  <p className="text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{mentor.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship Benefits Section */}
        <div className="bg-light rounded p-4 p-md-5 mb-5">
          <div className="text-center mb-4">
            <div className="d-inline-block position-relative mb-3">
              <h2 className="fw-bold text-dark mb-1">
                Why Choose Our <span style={{ color: "#ad2132" }}>Mentors?</span>
              </h2>
              {/* <div
                style={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "#ad2132",
                  borderRadius: "999px",
                  position: "absolute",
                  left: "0",  // Changed from 50% to 0
                  bottom: "-6px",
                }}
              ></div> */}
            </div>
          </div>

          <div className="row">
            {benefits.map((item) => (
              <div key={item._id} className="col-md-4 mb-4 text-center">
                <div className="mx-auto mb-3 rounded-circle overflow-hidden border border-primary" style={{ width: '64px', height: '64px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h5 className="fw-semibold mb-2 textcolor">{item.name}</h5>
                <p className="text-muted">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurMentorsPage;