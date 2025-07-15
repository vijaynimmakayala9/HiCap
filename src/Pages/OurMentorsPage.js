import React from 'react';
import Header from './Header';
import Footer from './Footer';

const mentorData = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'AI & Machine Learning Specialist',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: 'PhD in Computer Science with 10+ years of experience in AI research and development. Former lead researcher at Google AI. Specializes in deep learning and neural networks.'
  },
  {
    name: 'Michael Chen',
    role: 'Full Stack Development Expert',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: '15 years of experience building scalable web applications. Certified AWS Solutions Architect. Passionate about teaching modern JavaScript frameworks and cloud technologies.'
  },
  {
    name: 'Priya Patel',
    role: 'Data Science Mentor',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: 'Data scientist with 8 years of industry experience. Expert in Python, R, and big data technologies. Focuses on practical applications of machine learning in business.'
  },
  {
    name: 'David Kim',
    role: 'Cybersecurity Professional',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: 'Certified Ethical Hacker with 12 years of experience in network security. Conducts regular security workshops and penetration testing training sessions.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX/UI Design Coach',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: 'Senior product designer with expertise in user-centered design. Previously worked at Apple and Adobe. Focuses on design thinking and prototyping methodologies.'
  },
  {
    name: 'James Wilson',
    role: 'DevOps Engineer',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
    bio: 'DevOps specialist with extensive experience in CI/CD pipelines and cloud infrastructure. Certified Kubernetes Administrator and Terraform expert.'
  }
];

const OurMentorsPage = () => {
  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 font-roboto">
        {/* Mentors Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Mentors
          </h1>
          <div className="w-48 h-2 rounded-full bg-[#007860] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">
            Learn from industry experts with real-world experience
          </p>
        </div>

        {/* Mentors Cards in Alternating Layout */}
        <div className="mb-16">
          <div className="container px-0">
            {mentorData.map((mentor, idx) => (
              <div
                key={idx}
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
                    <p className="text-gray-700 mb-0">{mentor.bio}</p>
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
            <div className="text-center">
              <div className="bg-[#007860] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Industry Experience</h3>
              <p className="text-gray-600">Our mentors average 10+ years of professional experience in their fields.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#007860] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Practical Knowledge</h3>
              <p className="text-gray-600">Focus on real-world applications, not just theoretical concepts.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#007860] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Career Guidance</h3>
              <p className="text-gray-600">Get advice on career paths, interviews, and professional growth.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurMentorsPage;