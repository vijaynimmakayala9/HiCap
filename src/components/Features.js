import React, { useState, useEffect } from 'react';
import axios from 'axios';

const iconList = [
  'bi-laptop', 'bi-code-slash', 'bi-globe', 'bi-lightbulb',
  'bi-bar-chart', 'bi-people', 'bi-cpu', 'bi-book'
];

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get('http://31.97.206.144:5001/api/home-features');
        if (res.data.data && res.data.data.length > 0) {
          setFeatures(res.data.data[0].features);
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };
    fetchFeatures();
  }, []);

  return (
    <div className="container-fluid py-5 mt-4 bg-gradient-to-br from-white via-gray-50 to-red-50">
      <div className="row justify-content-center text-center mb-4">
        <div className="col-lg-8">
          <div className="d-inline-block position-relative ">
            <h2 className="fw-bold text-dark mb-1">
              Key Takeaways of <span style={{ color: "#a51d34" }}>TECHSTERKER</span>
            </h2>
            {/* <div
              style={{
                width: "100px",
                height: "5px",
                backgroundColor: "#a51d34",
                borderRadius: "999px",
                position: "absolute",
                left: "0",
                bottom: "-6px",
              }}
            ></div> */}
          </div>
          <p className="text-muted mb-0">
            Advanced training programs on leading IT Technologies offered in Online that offer flexibility in learning
            <br className="d-none d-md-block" />
            {/* <strong>(Classroom / Live online / Recorded - Weekdays / Weekends)</strong> */}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row g-4 my-4 p-4 bg-gradient-to-br from-white via-gray-50 to-red-50 rounded">
          {features.map((feature, index) => (
            <div key={feature._id} className="col-12 col-sm-6 col-lg-3">
              <div
                className={`h-100 border-0 p-4 shadow-sm rounded-4 text-center bg-white position-relative overflow-hidden ${hoveredCard === index ? 'shadow-lg' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === index ? 'translateY(-6px)' : 'none',
                }}
              >
                {/* Border top effect on hover */}
                <div
                  className={`position-absolute top-0 left-0 right-0 ${hoveredCard === index ? 'bg-meroon' : ''}`}
                  style={{
                    height: '4px',
                    transition: 'all 0.3s ease',
                    opacity: hoveredCard === index ? 1 : 0,
                  }}
                ></div>

                <div
                  className={`d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle ${hoveredCard === index
                    ? 'bg-meroon text-white'
                    : 'bg-opacity-10 textcolor'
                    }`}
                  style={{
                    width: '70px',
                    height: '70px',
                    fontSize: '28px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className={`bi ${iconList[index % iconList.length]} fs-1`}></i>
                </div>
                <h5 className="fw-bold mb-3 ">{feature.title}</h5>
                <p className="text-muted small">{feature.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;