import React, { useEffect, useState } from 'react';
import AboutTechsterker from './AboutTerchsterker';

const AboutUS = () => {
  const [leadershipTeam, setLeadershipTeam] = useState([]);
  const [technicalTeam, setTechnicalTeam] = useState(null);
  const [classroomData, setClassroomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leadership data
        const leadershipResponse = await fetch('http://31.97.206.144:5001/api/leadership');
        const leadershipData = await leadershipResponse.json();
        if (leadershipData.length > 0 && leadershipData[0].leadership) {
          setLeadershipTeam(leadershipData[0].leadership);
        }
       
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

  const SectionHeading = ({ children }) => (
    <div className="d-inline-block position-relative mb-4">
      <h2 className="fw-bold text-uppercase mb-3">{children}</h2>
      {/* <div
        style={{
          width: "100px",
          height: "4px",
          backgroundColor: "#a51d34",
          borderRadius: "999px",
          position: "absolute",
          left: "0",
          bottom: "-6px",
        }}
      ></div> */}
    </div>
  );

  return (
    <section className="container py-4 py-md-5">
      <AboutTechsterker />

      {/* Why TECHSTERKER */}
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Image */}
          <div className="col-lg-6">
            <div className="h-100">
              <img
                src="/service/whyus - Copy.jpg"
                alt="Why Choose TECHSTERKER"
                className="img-fluid rounded w-100 p-lg-5 p-md-0 p-xl-5"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease" // Hover effect
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <SectionHeading>WHY <span style={{ color: "#a51d34" }}>TECHSTERKER</span></SectionHeading>

              <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Team TECHSTERKER carries decades of experience complemented with proven success track record encompassing various facets of Skilling industry, including:
              </p>

              <div className="row gy-4">
                {[
                  "Formulating training curriculum that is constantly refined / revised to maintain sync with industry expectations",
                  "Innovative training methodologies to ensure max skill transfer",
                  "Skill centric coaching to achieve production-ready capability",
                  "Connecting with industry through robust placement activities"
                ].map((point, index) => (
                  <div key={index} className="col-12">
                    <div className="d-flex align-items-center">
                      <h3
                        className="me-3 flex-shrink-0 mb-0"
                        style={{
                          lineHeight: '1',
                          fontSize: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%'
                        }}
                      >
                        <span className="fw-bold">0</span>
                        <span className="fw-bold" style={{ color: "#a51d34" }}>
                          {index + 1 < 10 ? `${index + 1}` : index + 1}
                        </span>
                      </h3>
                      <p
                        className="mb-0 flex-grow-1"
                        style={{
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          color: '#000000', // black text
                          fontWeight: '400',
                          padding: '1rem 1.25rem',
                          backgroundColor: '#f8d7da', // light maroon (Bootstrap danger-light)
                          borderRadius: '8px',
                          borderLeft: '4px solid #a51d34', // original maroon
                          boxShadow: '0 2px 8px rgba(173, 33, 50, 0.15)', // maroon shadow
                          textAlign: 'left',
                          whiteSpace: 'pre-line',
                          margin: '0.5rem 0'
                        }}
                      >
                        {point}
                      </p>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="row align-items-center mb-4 mb-md-5 g-4">
        <div className="col-md-6 order-md-1 order-2">
          <SectionHeading ><span style={{ color: "#a51d34" }}>VISION & MISSION</span></SectionHeading>
          <div className="mb-3">
            <h5 className="fw-bold" style={{ color: "#a51d34" }}>Vision:</h5>
            <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              To create a premier IT training center that equips people with skills for the future and turns them into self-assured professionals who make significant contributions to the digital world.
            </p>
          </div>
          <div>
            <h5 className="fw-bold" style={{ color: "#a51d34" }}>Mission:</h5>
            <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              At TECHSTERKER, we're committed to giving our students career-growth resources, informed coaching, and continuous guidance. In order to help each student reach their career objectives, we aim to establish a vibrant learning atmosphere that fosters personal development, creativity, and critical thinking.
            </p>
          </div>
        </div>
        <div className="col-md-6 order-md-2 order-1 d-flex align-items-center justify-content-center">
          <img
            src="/service/vision.png"
            alt="Vision Mission"
            className="img-fluid rounded"
            style={{
              maxWidth: "100%",
              height: "auto",
              transition: "transform 0.3s ease, box-shadow 0.3s ease" // Hover effect
            }}
          />
        </div>

      </div>

      {/* Leadership Team */}
      {/* {leadershipTeam.length > 0 && (
        <div className="mb-5">
          <div className="text-center mb-5">
            <SectionHeading><span style={{ color: "#a51d34" }}>LEADERSHIP</span> TEAM</SectionHeading>
          </div>
          <div className="container px-0">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className={`row align-items-center mb-5 g-4 ${idx % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
                <div className="col-md-4 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="img-fluid rounded-circle"
                    style={{ width: '220px', height: '220px', objectFit: 'cover', border: '4px solid #c34153' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="p-3 p-md-4 rounded">
                    <h4 className="fw-bold mb-2" ><span style={{ color: "#a51d34" }}>{member.name}</span></h4>
                    <h6 className="mb-3" style={{ color: "#c34153" }}>- {member.role} -</h6>
                    <p className="text-dark mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{member.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}


    </section>
  );
};

export default AboutUS;