import React from 'react';
import {
  FaChalkboardTeacher,
  FaChartLine,
  FaLaptopCode,
  FaUserTie,
  FaNetworkWired,
  FaMobileAlt,
  FaUsers,
  FaCheckDouble,
} from 'react-icons/fa';

const features = [
  { icon: <FaChalkboardTeacher />, title: 'Interactive Live Classes' },
  { icon: <FaChartLine />, title: 'Best Simulations' },
  { icon: <FaLaptopCode />, title: 'Personalized Learning Plan' },
  { icon: <FaMobileAlt />, title: 'Online' },
  { icon: <FaUsers />, title: 'Group Labs and Hackathons' },
  { icon: <FaUserTie />, title: 'One-to-One Mentor Support' },
  { icon: <FaCheckDouble />, title: '100% Placements' },
  { icon: <FaNetworkWired />, title: 'Practical Training' }
];

const DifferSection = () => {
  return (
    <section
      className="py-5"
      style={{
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/11/29/02/02/bulb-1867395_960_720.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container">
        <div className="bg-white rounded-4 p-4 p-lg-5">
          <div className="row align-items-center">
            <div className="d-inline-block position-relative mb-4">
              <h2 className="fw-bold text-center text-lg-start">
                How we <span style={{ color: "#ad2132" }}>differ</span> from others?
              </h2>
            </div>
            {/* Left Column - Features */}
            <div className="col-12 col-lg-6 pe-lg-5 mb-4 mb-lg-0">
              <div className="row row-cols-1 row-cols-sm-2 g-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="col">
                    <div
                      className="d-flex align-items-center h-100"
                      style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: '#000000',
                        fontWeight: '400',
                        padding: '1rem 1rem',
                        backgroundColor: '#f8d7da', // light maroon background
                        borderRadius: '8px',
                        borderLeft: '4px solid #ad2132', // maroon accent line
                        boxShadow: '0 2px 8px rgba(173, 33, 50, 0.15)', // soft maroon shadow
                        textAlign: 'left',
                        margin: '0.5rem 0', // vertical spacing between cards
                        gap: '10px', // spacing between icon and text
                      }}
                    >
                      <div className="fs-4" style={{ color: "#ad2132" }}>
                        {feature.icon}
                      </div>
                      <div className="fw-medium">{feature.title}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column - Image */}
            <div className="col-12 col-lg-6 ps-lg-5">
              <div
                className="h-100 d-flex align-items-center justify-content-center"
                style={{
                  paddingLeft: '2rem'
                }}
              >
                <img
                  src="/logo/differ.jpeg"
                  alt="Standing out from the crowd"
                  className="img-fluid rounded-3"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "0.5px solid maroon",
                    boxShadow: "0 10px 20px rgba(128, 0, 0, 0.3)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferSection;
