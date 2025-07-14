import React from 'react';
import AboutMagnitia from './AboutMagnitia';

const leadershipTeam = [
  {
    name: 'Mr Ram Isanaka',
    role: 'Board Member',
    image: 'https://www.magnitia.com/images/ram-isanaka.jpg',
    bio: `Mr. Ram Isanaka was the previous director of Shakti BioTech, a fertilizer company in India supplying to Wonder Hy, which he promoted. Prior to that, he was Director of Panfill India – an active pharmaceutical ingredient company in Hyderabad. He currently runs the Texas-based IT firm Vinsys Inc. He also invests in multiple U.S. healthcare startups and is a sponsor & Elite Board member.`,
  },
  {
    name: 'Mr Madhu Reddy',
    role: 'Board Member',
    image: 'https://www.magnitia.com/images/madhu-reddy.jpg',
    bio: `Mr. Madhu Reddy is the Founder & President of Sri Electronics Inc. and has 25+ years of global experience in the Semiconductor & Consulting Services industries. He holds an M.S. in Electrical Engineering from Texas A&M University and a B.Tech in EEE from JNTU. He has worked at Wipro, Motorola, and Cirrus Logic.`,
  },
  {
    name: 'Mr Gopal Reddy',
    role: 'Co-Founder & Managing Partner',
    image: 'https://www.magnitia.com/images/gopal-reddy.jpg',
    bio: `Mr. Gopal Reddy has 15+ years of experience and has worked in various facets of IT Skill Development Sector & Ed-Tech. He co-founded Magnitia IT and is passionate about skill training in India. He's certified in PMP, Agile Scrum, & CSM.`,
  },
  {
    name: 'Mr Nageswara Rao Pusuluri',
    role: 'Head of Training Division, Mentor & Technical Advisor',
    image: 'https://www.magnitia.com/images/nageswara-rao.jpg',
    bio: `Mr. Nageswara Rao has 15+ years in Software Testing & Automation. He mentors many in Test Automation and has authored a popular testing book. He is active in the open-source community and speaks at QA conferences.`,
  },
  {
    name: 'Mr Ananth Reddy',
    role: 'Head of Business Development & Placement Activities',
    image: 'https://www.magnitia.com/images/ananth-reddy.jpg',
    bio: `Mr. Ananth Reddy is passionate about corporate collaboration and student success. He actively drives placement efforts, builds relationships with industry leaders, and ensures job-readiness of trainees.`,
  },
];

const AboutUS = () => {
  return (
    <section className="container py-4 py-md-5">
      
      <AboutMagnitia/>

      {/* Why Magnitia */}
      <div className="row align-items-center bg-light p-3 p-md-4 rounded shadow-sm mb-4 mb-md-5 g-4">
        <div className="col-md-6 text-center">
          <img
            src="https://www.magnitia.com/images/abt-bghh.jpg"
            alt="Why Magnitia"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3 mb-md-4">Why Magnitia</h3>
          <div className="row gy-3">
            {['Formulating training curriculum refined to match industry expectations','Innovative methodologies to ensure maximum skill transfer','Skill-centric coaching for production-readiness','Strong placement connections to industry'].map((point, i) => (
              <div key={i} className="col-12 d-flex align-items-start">
                <span className="badge bg-warning text-dark fs-5 me-3 flex-shrink-0">{`0${i + 1}`}</span>
                <p className="mb-0">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="row align-items-center mb-4 mb-md-5 g-4">
        <div className="col-md-6 order-md-1 order-2">
          <h3 className="fw-bold mb-3">Vision & Mission</h3>
          <div className="mb-3">
            <h5 className="text-success fw-bold">Vision:</h5>
            <p className="mb-0">
              To cater to the learning pursuit of aspirants in India and abroad through our
              physical centers located in key IT cities as well as Australia, Abu Dhabi, Canada & USA.
            </p>
          </div>
          <div>
            <h5 className="text-success fw-bold">Mission:</h5>
            <p className="mb-0">
              To skill & mentor enthusiastic aspirants on advanced software technologies thereby
              empowering them with a qualitative career.
            </p>
          </div>
        </div>
        <div className="col-md-6 order-md-2 order-1 text-center">
          <img
            src="https://www.magnitia.com/images/mision1.png"
            alt="Vision Mission"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Leadership Team */}
      <div className="mb-5">
        <h3 className="fw-bold mb-5 text-center display-5">Leadership Team</h3>
        <div className="container px-0">
          {leadershipTeam.map((member, idx) => (
            <div
              key={idx}
              className={`row align-items-center mb-5 g-4 ${idx % 2 === 0 ? '' : 'flex-md-row-reverse'}`}
            >
              <div className="col-md-4 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="img-fluid rounded-circle shadow-lg"
                  style={{ width: '220px', height: '220px', objectFit: 'cover', border: '4px solid #4caf50' }}
                />
              </div>
              <div className="col-md-8">
                <div className="p-3 p-md-4 rounded shadow-sm">
                  <h4 className="fw-bold text-success mb-2">{member.name}</h4>
                  <h6 className="text-warning mb-3">- {member.role} -</h6>
                  <p className="text-dark mb-0">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Team */}
      <div className="mb-5">
        <h3 className="fw-bold text-uppercase mb-3">Technical Team</h3>
        <div className="row align-items-center g-4">
          <div className="col-md-8">
            <p>
              The team behind Magnitia IT comprising of Skill entrepreneurs, renowned high impact
              trainers, accomplished tech experts & efficient managers, are credited with a long list of
              remarkable personal achievements and are respected highly among their professional
              peers. Collectively, Team Magnitia is a formidable force that is set to create a lasting impact
              in the tech skilling arena.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://www.magnitia.com/images/gallery/institute9.jpg"
              alt="Technical Team"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Global Classrooms */}
      <div className="mb-5">
        <h3 className="fw-bold text-uppercase mb-3">Global Classrooms</h3>
        <p>
          As we keep expanding our learning horizons, our classrooms are digitally connected with each other
          through Full HD Video Conferencing facility. Enthusiastic learners can benefit from the extended
          learning paradigm through senior trainers who conduct online interactive sessions connecting all the
          locations.
        </p>
        <p>
          Skilling is a universal need, we are strategically growing by expanding our reach globally, our new centers
          are coming up in Sydney, Australia & Abu Dhabi.
        </p>
        <p>
          Also, in the near future, we are coming up with centers at Memphis, United States & Toronto, Canada.
        </p>
        <div className="row g-3">
          {[...Array(12)].map((_, i) => (
            <div className="col-6 col-sm-4 col-md-3" key={i}>
              <img
                src={`https://www.magnitia.com/images/gallery/institute${i + 1}.jpg`}
                alt={`Global Classroom ${i + 1}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUS;
