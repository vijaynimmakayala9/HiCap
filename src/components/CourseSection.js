import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseEnquiryModal from "./EnrollModal";

const CourseAndFeatures = () => {
  const [courses, setCourses] = useState([]); // API data
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://hicap-backend-4rat.onrender.com/api/hero-banners"
        );
        const data = await res.json();
        if (data.success) {
          // Add "Enroll Now" button text so UI remains consistent
          const formatted = data.data.map((item) => ({
            ...item,
            description: item.content,
            buttonText: "Enroll Now",
          }));
          setCourses(formatted);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Auto-scroll functionality
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isPaused && courses.length > 0) {
        const nextIndex = (activeIndex + 1) % courses.length;
        goToSlide(nextIndex);
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      const carousel = new window.bootstrap.Carousel(carouselRef.current);
      carousel.to(index);
    }
  };

  useEffect(() => {
    if (courses.length > 0) {
      startAutoScroll();

      if (carouselRef.current) {
        new window.bootstrap.Carousel(carouselRef.current, {
          interval: false,
          wrap: true,
        });
      }
    }

    return () => {
      stopAutoScroll();
    };
  }, [courses]);

  useEffect(() => {
    stopAutoScroll();
    if (!isPaused && courses.length > 0) {
      startAutoScroll();
    }
  }, [activeIndex, isPaused, courses]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleEnroll = () => setShowEnquiryModal(true);

  return (
    <>
      <section className="py-5 mt-5">
        <div className="container">
          <div
            id="courseCarousel"
            className="carousel slide"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="carousel-inner">
              {courses.map((course, index) => (
                <div
                  key={course._id}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="img-fluid rounded-3 shadow-lg"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          border: "0.5px solid #a51d34",
                          borderRadius: "20px",
                          boxShadow: "0 20px 40px rgba(173, 33, 50, 0.25)",
                        }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="ps-lg-4">
                        <h4
                          className="fw-bold mb-3"
                          style={{ fontSize: "1.8rem", lineHeight: "1.3" }}
                        >
                          “
                          {course.title.split(" ").map((word, i) => (
                            <span
                              key={i}
                              style={{
                                color: i % 2 === 0 ? "#a51d34" : "#000",
                              }}
                            >
                              {word}{" "}
                            </span>
                          ))}
                          ”
                        </h4>

                        <p className="mb-4">{course.description}</p>

                        <div className="d-flex justify-content-lg-end justify-content-start">
                          <button
                            className="gradient-button btn-md px-4 py-3 rounded-pill fw-bold"
                            onClick={handleEnroll}
                            style={{ width: "200px" }}
                          >
                            Enroll Now
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

        {/* Custom CSS */}
        <style jsx>{`
          .carousel-item {
            transition: transform 0.6s ease-in-out;
          }
        `}</style>
      </section>

      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
    </>
  );
};

export default CourseAndFeatures;
