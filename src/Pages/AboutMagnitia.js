import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutMagnitia = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("https://hicap-backend-4rat.onrender.com/api/about");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setAboutData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch About data:", error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="container py-4 py-md-5 mt-5" style={{backgroundColor: "#fffef2"}}>
      {aboutData ? (
        <div className="row align-items-center mb-4 mb-md-5 g-4">
          {/* Text Section */}
          <div className="col-md-6 order-md-1 order-2">
            <div className="position-relative mb-4">
              <h2 className="fw-bold mb-3">
                About <span style={{ color: "#ad2132" }}>TECHSTERKER</span> Institute
              </h2>
              <div
                style={{
                  width: "150px",
                  height: "4px",
                  backgroundColor: "#ad2132",
                  borderRadius: "999px",
                  position: "absolute",
                  left: "0",
                  bottom: "-8px",
                }}
              ></div>
            </div>
            <p className="text-muted mb-4">{aboutData.content1}</p>
            
          </div>

          {/* Image Section */}
          <div className="col-md-6 order-md-2 order-1">
            <div className="position-relative">
              <img
                src={aboutData.image1}
                alt="About TECHSTERKER"
                className="img-fluid rounded-4 shadow-sm w-100"
                style={{ height: "auto", maxHeight: "400px", objectFit: "cover" }}
              />
              
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border textcolor" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutMagnitia;