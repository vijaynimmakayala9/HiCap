import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "Professional Skill Development Through Innovative Methods",
      description:
        "We provide industry-focused IT training designed to enhance both technical and professional skills. Through innovative teaching methods, hands-on projects, and expert mentorship, we ensure learners gain practical knowledge and confidence.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Innovative Approaches to Professional Development",
      description:
        "We offer innovative and practical training solutions designed to help learners build essential technical and professional skills. Our programs focus on real-world applications, hands-on projects, and expert mentorship to ensure career readiness.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Building Competence Through Strategic Skill Enhancement",
      description:
        "Through organized and well-thought-out training programs, we concentrate on giving students the fundamental technical and professional skills they need. Our approach combines expert guidance, practical learning, and real-time projects.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    },
  ];

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const getSlidePosition = (index) => {
    if (index === currentSlide) return "active";
    if (index === (currentSlide - 1 + banners.length) % banners.length) return "left";
    if (index === (currentSlide + 1) % banners.length) return "right";
    return index < currentSlide ? "far-left" : "far-right";
  };

  return (
    <div className="position-relative w-100 hero-container bg-light overflow-hidden">
      <div className="position-relative h-100">
        {banners.map((banner, index) => {
          const position = getSlidePosition(index);

          return (
            <div
              key={index}
              className={`position-absolute top-0 w-100 h-100 transition-all d-flex align-items-center justify-content-center ${
                position === "active" ? "opacity-100 z-2" : "opacity-0 z-0"
              }`}
              style={{
                transform:
                  position === "active"
                    ? "translateX(0)"
                    : position === "left"
                    ? "translateX(-100%)"
                    : position === "right"
                    ? "translateX(100%)"
                    : position === "far-left"
                    ? "translateX(-100%)"
                    : "translateX(100%)",
                transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
              }}
            >
              <div className="container h-100 d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between text-center text-lg-start py-3 py-sm-4 py-md-5">
                {/* Left Content */}
                <div className="hero-content mb-4 mb-lg-0 me-lg-4">
                  <h1 className="hero-title fw-bold text-dark mb-2 mb-md-3">
                    {banner.title}
                  </h1>
                  <p className="hero-description text-muted mb-3 mb-md-4">
                    {banner.description}
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-center justify-content-lg-start">
                    <button className="btn btn-danger btn-lg hero-btn">Login</button>
                    <button className="btn btn-outline-danger btn-lg hero-btn d-flex align-items-center justify-content-center gap-2">
                      <i className="bi bi-play-circle-fill"></i> Book a Demo
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="hero-image-container mt-3 mt-lg-0 ms-lg-4 d-flex justify-content-center align-items-center">
                  <div className="position-relative">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="img-fluid rounded-4 hero-image"
                    />
                    {/* Decorative elements */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 rounded-4 hero-overlay"
                    ></div>
                    <div
                      className="position-absolute hero-radial-gradient"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      {/* <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 mb-sm-3 z-3">
        <div className="d-flex">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`btn p-0 mx-1 ${index === currentSlide ? "text-danger" : "text-muted"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="fs-4 indicator-dot">•</span>
            </button>
          ))}
        </div>
      </div> */}

      <style jsx>{`
        /* Base styles for all devices */
        .hero-container {
          height: 100vh;
          min-height: 600px;
          max-height: 1200px;
        }
        
        .hero-content {
          max-width: 100%;
          flex: 1;
        }
        
        .hero-title {
          font-size: 1.75rem;
          line-height: 1.3;
        }
        
        .hero-description {
          font-size: 1rem;
          max-height: 120px;
          overflow-y: auto;
        }
        
        .hero-btn {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        .hero-image-container {
          flex: 1;
          max-width: 100%;
        }
        
        .hero-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: cover;
          transform: perspective(1000px) rotateY(-5deg);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 2px solid white;
        }
        
        .hero-overlay {
          background: linear-gradient(135deg, rgba(220,53,69,0.1) 0%, transparent 50%);
          z-index: 1;
        }
        
        .hero-radial-gradient {
          width: 120%;
          height: 120%;
          top: -10%;
          right: -10%;
          background: radial-gradient(circle, rgba(220,53,69,0.15) 0%, transparent 70%);
          z-index: 0;
        }
        
        .indicator-dot {
          font-size: 1.5rem;
        }
        
        /* Small devices (landscape phones, 576px and up) */
        @media (min-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-btn {
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
          }
        }
        
        /* Medium devices (tablets, 768px and up) */
        @media (min-width: 768px) {
          .hero-container {
            min-height: 700px;
          }
          
          .hero-title {
            font-size: 2.25rem;
          }
          
          .hero-description {
            font-size: 1.15rem;
            max-height: 140px;
          }
          
          .hero-image {
            max-width: 450px;
          }
        }
        
        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .hero-container {
            min-height: 800px;
          }
          
          .hero-content {
            max-width: 45%;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.2rem;
            max-height: 160px;
          }
          
          .hero-image-container {
            max-width: 50%;
          }
          
          .hero-image {
            max-width: 500px;
          }
        }
        
        /* Extra large devices (large desktops, 1200px and up) */
        @media (min-width: 1200px) {
          .hero-title {
            font-size: 2.75rem;
          }
          
          .hero-description {
            font-size: 1.25rem;
          }
          
          .hero-image {
            max-width: 550px;
          }
        }
        
        /* Very small devices (phones, less than 576px) */
        @media (max-width: 575.98px) {
          .hero-container {
            min-height: 700px;
            height: auto;
          }
          
          .hero-title {
            font-size: 1.5rem;
          }
          
          .hero-description {
            font-size: 0.9rem;
            max-height: 100px;
          }
          
          .hero-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }
          
          .hero-image {
            max-width: 300px;
            transform: perspective(800px) rotateY(-5deg);
          }
        }
        
        /* Height adjustments for very short screens */
        @media (max-height: 700px) and (min-width: 992px) {
          .hero-container {
            min-height: 650px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-description {
            font-size: 1rem;
            max-height: 120px;
          }
        }
        
        /* Height adjustments for very tall screens */
        @media (min-height: 1000px) {
          .hero-container {
            max-height: 900px;
          }
        }
      `}</style>
    </div>
  );
};

export default NewHero;