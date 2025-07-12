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
  { icon: <FaNetworkWired />, title: 'Practical Training' },
  { icon: <FaEllipsisH />, title: 'And More...' },
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
      <div className="container bg-white rounded-4 shadow p-4">
        <div className="row align-items-center">
          {/* Left Column - Features */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4 text-center text-lg-start">
              How we <span className="text-success">differ</span> from others?
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 g-3">
              {features.map((feature, idx) => (
                <div key={idx} className="col d-flex align-items-center p-2">
                  <div className="text-success fs-4 me-3">{feature.icon}</div>
                  <div className="fw-medium">{feature.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="col-12 col-lg-6 text-center">
            <img
              src="https://thumbs.dreamstime.com/b/different-person-crowd-others-colored-amongst-52811655.jpg"
              alt="Ideas"
              className="img-fluid rounded"
              style={{ maxHeight: '350px', width: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferSection;
