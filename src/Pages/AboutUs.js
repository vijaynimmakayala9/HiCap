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

  return (
    <section className="container py-4 py-md-5">
      <AboutMagnitia />

      {/* Why Magnitia */}
      <div className="row align-items-center bg-light p-3 p-md-4 rounded shadow-sm mb-4 mb-md-5 g-4">
        <div className="col-md-6 text-center">
          <img
            src="https://www.Magnitia.com/images/abt-bghh.jpg"
            alt="Why Magnitia"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3 mb-md-4">Why Magnitia</h3>
          <div className="row gy-3">
            {[
              'Formulating training curriculum refined to match industry expectations',
              'Innovative methodologies to ensure maximum skill transfer',
              'Skill-centric coaching for production-readiness',
              'Strong placement connections to industry'
            ].map((point, i) => (
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
              To cater to the learning pursuit of aspirants in India and abroad through our physical centers located in key IT cities as well as Australia, Abu Dhabi, Canada & USA.
            </p>
          </div>
          <div>
            <h5 className="text-success fw-bold">Mission:</h5>
            <p className="mb-0">
              To skill & mentor enthusiastic aspirants on advanced software technologies thereby empowering them with a qualitative career.
            </p>
          </div>
        </div>
        <div className="col-md-6 order-md-2 order-1 text-center">
          <img
            src="https://www.Magnitia.com/images/mision1.png"
            alt="Vision Mission"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Leadership Team */}
      {leadershipTeam.length > 0 && (
        <div className="mb-5">
          <h3 className="fw-bold mb-5 text-center display-5">Leadership Team</h3>
          <div className="container px-0">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className={`row align-items-center mb-5 g-4 ${idx % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
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
                    <p className="text-dark mb-0">{member.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Team */}
      <div className="mb-5">
        <h3 className="fw-bold text-uppercase mb-3">Technical Team</h3>
        <div className="row align-items-center g-4">
          <div className="col-md-8">
            {technicalTeam && (
              <>
                <p>{technicalTeam.description2}</p>
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

      {/* Global Classrooms - Dynamic from API */}
      <div className="mb-5">
        <h3 className="fw-bold text-uppercase mb-3">Global Classrooms</h3>
        {classroomData.map((item, index) => (
          <div className="mb-4" key={index}>
            <p>{item.description3}</p>
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
