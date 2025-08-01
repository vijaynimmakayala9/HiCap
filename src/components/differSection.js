import React from 'react';
import {
  FaChalkboardTeacher,
  FaChartLine,
  FaUserCheck,
  FaLaptopCode,
  FaUserTie,
  FaNetworkWired,
  FaMobileAlt,
  FaUsers,
  FaCheckDouble,
  FaEllipsisH,
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
        <div className="bg-white rounded-4  p-4 p-lg-5">
          <div className="row align-items-center">
            {/* Left Column - Features */}
            <div className="col-12 col-lg-6 pe-lg-5 mb-4 mb-lg-0">

              <div className="d-inline-block position-relative mb-3">
                <h2 className="fw-bold  text-center text-lg-start">
                  How we <span style={{ color: "#ad2132" }}>differ</span> from others?
                </h2>
                <div
                  style={{
                    width: "140px",
                    height: "4px",
                    backgroundColor: "#ad2132",
                    borderRadius: "999px",
                    position: "absolute",
                    left: "0",
                    bottom: "-4px",  // Adjusted for display-6 font size
                  }}
                ></div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 g-3 g-lg-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="col d-flex align-items-center p-3"
                    style={{
                      
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="fs-4 me-3" style={{ color: "#ad2132" }}>{feature.icon}</div>
                    <div className="fw-medium">{feature.title}</div>
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
                  className="img-fluid rounded-3 shadow-sm"
                  style={{
                    maxHeight: '350px',
                    width: '100%',
                    objectFit: 'cover',
                    border: '5px solid white'
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