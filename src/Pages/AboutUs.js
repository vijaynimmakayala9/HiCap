import React, { useEffect, useState } from 'react';
import AboutMagnitia from './AboutMagnitia';

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
        const leadershipResponse = await fetch('https://hicap-backend-4rat.onrender.com/api/leadership');
        const leadershipData = await leadershipResponse.json();
        if (leadershipData.length > 0 && leadershipData[0].leadership) {
          setLeadershipTeam(leadershipData[0].leadership);
        }

        // Fetch technical team data
        const techTeamResponse = await fetch('https://hicap-backend-4rat.onrender.com/api/technical-team');
        const techTeamData = await techTeamResponse.json();
        if (techTeamData.data && techTeamData.data.length > 0) {
          setTechnicalTeam(techTeamData.data[0]);
        }

        // Fetch classroom data
        const classroomResponse = await fetch('https://hicap-backend-4rat.onrender.com/api/classroom');
        const classroomJson = await classroomResponse.json();
        if (classroomJson.data) {
          setClassroomData(classroomJson.data);
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
      <div
        style={{
          width: "100px",
          height: "4px",
          backgroundColor: "#ad2132",
          borderRadius: "999px",
          position: "absolute",
          left: "0",
          bottom: "-6px",
        }}
      ></div>
    </div>
  );

  return (
    <section className="container py-4 py-md-5">
      <AboutMagnitia />

      {/* Why TECHSTERKER */}
      <div className="container py-4 py-md-5">
        <div className="row align-items-center g-4">
          {/* Image */}
          <div className="col-lg-6">
            <div className="h-100">
              <img
                src="https://www.magnitia.com/images/abt-bghh.jpg"
                alt="Why Choose TECHSTERKER"
                className="img-fluid rounded-4 w-100"
                style={{
                  height: '100%',
                  minHeight: '400px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <SectionHeading>WHY <span style={{ color: "#ad2132" }}>TECHSTERKER</span></SectionHeading>

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
                        <span className="fw-bold" style={{ color: "#ad2132" }}>
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
                          borderLeft: '4px solid #ad2132', // original maroon
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
          <SectionHeading ><span style={{ color: "#ad2132" }}>VISION & MISSION</span></SectionHeading>
          <div className="mb-3">
            <h5 className="fw-bold" style={{ color: "#ad2132" }}>Vision:</h5>
            <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              To create a premier IT training center that equips people with skills for the future and turns them into self-assured professionals who make significant contributions to the digital world.
            </p>
          </div>
          <div>
            <h5 className="fw-bold" style={{ color: "#ad2132" }}>Mission:</h5>
            <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              At TECHSTERKER, we're committed to giving our students career-growth resources, informed coaching, and continuous guidance. In order to help each student reach their career objectives, we aim to establish a vibrant learning atmosphere that fosters personal development, creativity, and critical thinking.
            </p>
          </div>
        </div>
        <div className="col-md-6 order-md-2 order-1 d-flex align-items-center justify-content-center">
          <img
            src="https://www.Magnitia.com/images/mision1.png"
            alt="Vision Mission"
            className="img-fluid rounded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Leadership Team */}
      {leadershipTeam.length > 0 && (
        <div className="mb-5">
          <div className="text-center mb-5">
            <SectionHeading><span style={{ color: "#ad2132" }}>LEADERSHIP</span> TEAM</SectionHeading>
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
                    <h4 className="fw-bold mb-2" ><span style={{ color: "#ad2132" }}>{member.name}</span></h4>
                    <h6 className="mb-3" style={{ color: "#c34153" }}>- {member.role} -</h6>
                    <p className="text-dark mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{member.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Team */}
      <div className="mb-5">
        <SectionHeading><span style={{ color: "#ad2132" }}>TECHNICAL</span> TEAM</SectionHeading>
        <div className="row align-items-center g-4">
          <div className="col-md-8">

            {technicalTeam && (
              <>
                <h5 style={{ color: "#000", fontWeight: "500", marginBottom: "1rem" }}>
                  The Force Driving Innovation and Impact:
                </h5>
                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{technicalTeam.description2}</p>
              </>
            )}
          </div>
          <div className="col-md-4 text-center">
            <img
              src={technicalTeam?.image2 || "https://www.Magnitia.com/images/gallery/institute9.jpg"}
              alt="Technical Team"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Global Classrooms */}
      <div className="mb-5">
        <SectionHeading>GLOBAL <span style={{ color: "#ad2132" }}>CLASSROOMS</span></SectionHeading>
        {classroomData.map((item, index) => (
          <div className="mb-4" key={index}>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{item.description3}</p>
            <div className="row g-3">
              {item.image3.map((imgUrl, i) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                  <img
                    src={imgUrl}
                    alt={`Global Classroom ${i + 1}`}
                    className="img-fluid rounded shadow-sm w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUS;