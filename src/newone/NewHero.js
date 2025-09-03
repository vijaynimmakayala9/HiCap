import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseEnquiryModal from "../components/EnrollModal";

const NewHero = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("https://backend-hicap.onrender.com/api/hero-banners");
        const data = await res.json();
        if (data.success) {
          const formatted = data.data.map((item) => ({
            ...item,
            description: item.content,
          }));
          setBanners(formatted);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  // Auto-scroll functionality
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isPaused && banners.length > 0) {
        const nextIndex = (activeIndex + 1) % banners.length;
        goToSlide(nextIndex);
      }
    }, 4000);
  };

  const stopAutoScroll = () => clearInterval(intervalRef.current);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      const carousel = new window.bootstrap.Carousel(carouselRef.current);
      carousel.to(index);
    }
  };

  useEffect(() => {
    if (banners.length > 0) {
      startAutoScroll();
      if (carouselRef.current) {
        new window.bootstrap.Carousel(carouselRef.current, {
          interval: false,
          wrap: true,
        });
      }
    }
    return () => stopAutoScroll();
  }, [banners]);

  useEffect(() => {
    stopAutoScroll();
    if (!isPaused && banners.length > 0) {
      startAutoScroll();
    }
  }, [activeIndex, isPaused, banners]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleEnrollClick = () => {
    setShowEnquiryModal(true);
  };

  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div
          id="heroCarousel"
          className="carousel slide"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div
                key={banner._id || index}
                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              >
                <div className="row g-4 align-items-center">
                  {/* Left Image */}
                  <div className="col-lg-6 text-center">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="img-fluid rounded-3 shadow-lg"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        border: "0.5px solid #a51d34",
                        borderRadius: "20px",
                        boxShadow: "0 20px 40px rgba(173,33,50,0.25)",
                      }}
                    />
                  </div>

                  {/* Right Text */}
                  <div className="col-lg-6">
                    <div className="ps-lg-4 text-center text-lg-start">
                      <h1
                        className="fw-bold mb-3"
                        style={{ fontSize: "2rem", lineHeight: "1.2" }}
                      >
                        {banner.title.split(" ").map((word, i) => (
                          <span
                            key={i}
                            style={{ color: i % 2 === 0 ? "#a51d34" : "#000" }}
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </h1>
                      <p className="mb-4">{banner.description}</p>
                      <div className="d-flex justify-content-center justify-content-lg-start">
                        <button
                          className="btn btn-danger btn-sm py-3 rounded-pill fw-bold"
                          style={{ minWidth: "140px" }}
                          onClick={handleEnrollClick}
                        >
                          Enquiry Now
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm py-3 rounded-pill fw-bold ms-2 d-flex align-items-center justify-content-center"
                          style={{ minWidth: "160px" }}
                        >
                          <i className="bi bi-play-circle-fill me-2"></i> Book a Demo
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>

      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />

      {/* Custom CSS */}
      <style jsx>{`
        .carousel-item {
          transition: transform 0.6s ease-in-out;
        }
      `}</style>
    </section>

  );
};

export default NewHero;
