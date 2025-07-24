import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const OurMentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    // Fetch mentors
    axios.get('https://hicap-backend-4rat.onrender.com/api/our-mentor')
      .then(res => setMentors(res.data.data || []))
      .catch(err => console.error('Mentor API error:', err));

    // Fetch mentorship benefits
    axios.get('https://hicap-backend-4rat.onrender.com/api/our-mentor/experience')
      .then(res => setBenefits(res.data.data || []))
      .catch(err => console.error('Benefits API error:', err));
  }, []);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 font-roboto">
        {/* Mentors Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Mentors</h1>
          <div className="w-48 h-2 rounded-full bg-[#007860] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Learn from industry experts with real-world experience</p>
        </div>

        {/* Mentors Cards in Alternating Layout */}
        <div className="mb-16">
          <div className="container px-0">
            {mentors.map((mentor, idx) => (
              <div
                key={mentor._id}
                className={`row align-items-center mb-12 g-4 ${idx % 2 === 0 ? '' : 'flex-md-row-reverse'}`}
              >
                <div className="col-md-4 text-center">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="img-fluid rounded-circle shadow-lg"
                    style={{
                      width: '220px',
                      height: '220px',
                      objectFit: 'cover',
                      border: '4px solid #007860'
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="p-4 p-md-5 rounded shadow-sm bg-white">
                    <h4 className="fw-bold text-[#007860] mb-2">{mentor.name}</h4>
                    <h6 className="text-[#4CAF50] mb-3">- {mentor.role} -</h6>
                    <p className="text-gray-700 mb-0">{mentor.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Benefits Section */}
        <div className="bg-[#f8f9fa] rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Mentors?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item) => (
              <div key={item._id} className="text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#007860]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600">{item.content}</p>
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
