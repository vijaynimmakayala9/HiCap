import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseEnquiryModal from "../components/EnrollModal";
import DemoRequestModal from "../models/DemoRequestModal";

const FullScreenHero = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("https://api.techsterker.com/api/hero-banners");
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
    }, 6000);
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

  const handleEnrollClick = () => setShowEnquiryModal(true);
  const handleDemoClick = () => setShowDemoModal(true);

  return (
    <section
      className="position-relative w-100"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
        id="fullscreenCarousel"
        className="carousel slide h-100"
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel-inner h-100">
          {banners.map((banner, index) => (
            <div
              key={banner._id || index}
              className={`carousel-item h-100 position-relative ${
                index === activeIndex ? "active" : ""
              }`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="d-block w-100 h-100"
                style={{
                  objectFit: "cover",
                  filter: "brightness(65%)",
                }}
              />

              {/* Glassmorphic Overlay Card */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 80%)",
                }}
              >
                <div className="container">
                  <div className="col-lg-6 col-md-8">
                    <div
                      className="p-4 p-md-5 rounded-4 shadow-lg text-white"
                      style={{
                        background:
                          "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow:
                          "0 4px 30px rgba(0, 0, 0, 0.4), inset 0 0 40px rgba(255,255,255,0.05)",
                      }}
                    >
                      <h1
                        className="fw-bold mb-3"
                        style={{
                          fontSize: "2.5rem",
                          lineHeight: "1.2",
                          textShadow: "2px 2px 5px rgba(0,0,0,0.4)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.5rem",
                            position: "relative",
                            top: "-0.4em",
                            lineHeight: "1",
                          }}
                        >
                          ❝
                        </span>{" "}
                        {banner.title.split(" ").map((word, i) => (
                          <span
                            key={i}
                            style={{
                              color: i % 2 === 0 ? "#FF3B5C" : "#fff",
                            }}
                          >
                            {word}{" "}
                          </span>
                        ))}{" "}
                        <span
                          style={{
                            fontSize: "1.5rem",
                            position: "relative",
                            top: "-0.4em",
                            lineHeight: "1",
                          }}
                        >
                          ❞
                        </span>
                      </h1>

                      <p
                        className="mb-4"
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: "1.6",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        {banner.description}
                      </p>

                      <div className="d-flex flex-wrap gap-3">
                        <button
                          className="btn btn-danger btn-lg rounded-pill fw-bold px-4 py-2"
                          onClick={handleEnrollClick}
                        >
                          Enquiry Now
                        </button>
                        <button
                          className="btn btn-outline-light btn-lg rounded-pill fw-bold px-4 py-2 d-flex align-items-center"
                          onClick={handleDemoClick}
                        >
                          <i className="bi bi-play-circle-fill me-2"></i> Book a Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        {banners.length > 1 && (
          <div className="carousel-indicators position-absolute bottom-0 start-50 translate-middle-x mb-4">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={index === activeIndex ? "active" : ""}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  margin: "0 5px",
                  background: index === activeIndex ? "#FF3B5C" : "rgba(255,255,255,0.5)",
                }}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
      <DemoRequestModal
        show={showDemoModal}
        handleClose={() => setShowDemoModal(false)}
      />

      <style jsx>{`
        .carousel-item {
          transition: opacity 1s ease-in-out;
        }
        .carousel-item:not(.active) {
          opacity: 0;
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FullScreenHero;
