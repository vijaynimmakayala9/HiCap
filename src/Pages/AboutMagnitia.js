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
    <section className="container py-4 py-md-5">
      {aboutData ? (
        <div className="row align-items-center mb-4 mb-md-5 g-4">
          {/* Text Section */}
          <div className="col-md-6 order-md-1 order-2">
            <h2 className="fw-bold text-uppercase mb-3 mb-md-4">
              {/* {aboutData.title1 && (
                <>
                  {aboutData.title1.split("Magnitia").length > 1 ? (
                    <>
                      {aboutData.title1.split("Magnitia")[0]}
                      <span className="text-success">Magnitia</span>
                      {aboutData.title1.split("Magnitia")[1]}
                    </>
                  ) : (
                    aboutData.title1
                  )}
                </>
              )} */}About Our <span className="text-success">Instuite</span>
            </h2>
            <p className="text-muted">{aboutData.content1}</p>
          </div>

          {/* Image Section */}
          <div className="col-md-6 order-md-2 order-1 text-center">
            <img
              src={aboutData.image1}
              alt="Welcome"
              className="img-fluid rounded shadow-sm"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </section>
  );
};

export default AboutMagnitia;
