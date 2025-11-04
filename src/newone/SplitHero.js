import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseEnquiryModal from "../components/EnrollModal";
import DemoRequestModal from "../models/DemoRequestModal";

const FullScreenHero1 = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("https://api.techsterker.com/api/hero-banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBanners(
            data.data.map((item) => ({
              ...item,
              description: item.content,
            }))
          );
        }
      })
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isPaused && banners.length > 0) {
        const nextIndex = (activeIndex + 1) % banners.length;
        goToSlide(nextIndex);
      }
    }, 7000); // ✅ 7 seconds
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
    if (!isPaused && banners.length > 0) startAutoScroll();
  }, [activeIndex, isPaused, banners]);

  return (
    <section
      className="position-relative mt-5"
      style={{ height: "80vh", overflow: "hidden" }}
    >
      <div
        id="heroCarousel"
        className="carousel slide h-100"
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-inner h-100">
          {banners.map((banner, i) => (
            <div
              key={i}
              className={`carousel-item h-100 ${i === activeIndex ? "active" : ""}`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover", filter: "brightness(60%)" }}
              />

              <div className="position-absolute top-50 start-50 translate-middle text-white w-100">
                <div className="container">
                  <div className="col-lg-6 col-md-8 p-4 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <h1 className="fw-bold mb-3 text-light" style={{ fontSize: "2.2rem" }}>
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

                    <p className="text-light opacity-75 mb-4" style={{ fontSize: "1.0rem" }}>
                      {banner.description}
                    </p>

                    <div className="d-flex gap-3 flex-wrap">
                      <button
                        className="btn btn-danger btn-sm rounded-pill px-4 fw-bold"
                        onClick={() => setShowEnquiryModal(true)}
                      >
                        Enquiry Now
                      </button>

                      <button
                        className="btn btn-outline-light btn-sm rounded-pill px-4 fw-bold"
                        onClick={() => setShowDemoModal(true)}
                      >
                        <i className="bi bi-play-circle-fill me-2"></i>
                        Book a Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Left / Right Arrows */}
        <button
          className="carousel-control-prev"
          style={{ width: "60px" }}
          onClick={() => goToSlide((activeIndex - 1 + banners.length) % banners.length)}
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          style={{ width: "60px" }}
          onClick={() => goToSlide((activeIndex + 1) % banners.length)}
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Modals */}
      <CourseEnquiryModal show={showEnquiryModal} handleClose={() => setShowEnquiryModal(false)} />
      <DemoRequestModal show={showDemoModal} handleClose={() => setShowDemoModal(false)} />

      <style jsx>{`
        .carousel-item {
          transition: opacity 1s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default FullScreenHero1;
