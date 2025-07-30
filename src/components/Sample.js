import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseAndFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      title: "Cutting-Edge Curriculum",
      highlight: "Curriculum",
      text: "Our programs are designed with industry experts to ensure you learn the most relevant skills. Stay ahead with our constantly updated course content.",
      buttonText: "View Programs",
      bgImage: "/1.png"
    },
    {
      title: "Expert Faculty",
      highlight: "Faculty",
      text: "Learn from industry professionals with years of real-world experience. Our instructors are passionate about mentoring the next generation of professionals.",
      buttonText: "Meet Our Team",
      bgImage: "/2.png"
    },
    
    {
      title: "Career Support",
      highlight: "Support",
      text: "We don't just educate - we help launch careers. Benefit from our placement assistance, resume workshops, and interview preparation sessions.",
      buttonText: "Career Services",
      bgImage: "/3.png"
    }
  ];

  useEffect(() => {
  const carousel = document.getElementById('featureCarousel');

  if (carousel) {
    // ✅ Define the event listener
    const handleSlide = (event) => {
      setActiveIndex(event.to);
    };

    carousel.addEventListener('slid.bs.carousel', handleSlide);

    const carouselInstance = new window.bootstrap.Carousel(carousel, {
      interval: 2000,
      ride: 'carousel',
    });

    // ✅ Cleanup: Remove event listener properly
    return () => {
      carousel.removeEventListener('slid.bs.carousel', handleSlide);
      carouselInstance.dispose();
    };
  }
}, []);

  return (
    <section 
      className="py-5 position-relative vh-100 d-flex align-items-center mt-5"
      style={{
        backgroundImage: `url(${slides[activeIndex].bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out"
      }}
    >
      {/* Overlay with glass morphic effect */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        
      ></div>

      <div className="container position-relative">
        <div 
          id="featureCarousel" 
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                data-bs-interval="2000"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div 
                      className="p-4 p-md-5 rounded-4 shadow-lg mx-auto"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        maxWidth: "800px"
                      }}
                    >
                      <h2 className="fw-bold text-white text-uppercase mb-4 display-5">
                        {slide.title.split(' ')[0]} <span className="text-primary">{slide.highlight}</span>
                      </h2>
                      <p className="text-white fs-5 mb-4">
                        {slide.text}
                      </p>
                      <div className="d-flex flex-wrap gap-3">
                        <button 
                          className="btn btn-primary px-4 py-3 rounded-pill fw-bold"
                          style={{
                            background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
                            border: "none",
                            boxShadow: "0 4px 15px rgba(58, 123, 213, 0.4)"
                          }}
                        >
                          {slide.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target="#featureCarousel" 
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target="#featureCarousel" 
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Carousel Indicators */}
          <div className="carousel-indicators position-relative mt-4">
            {slides.map((_, index) => (
              <button 
                key={index}
                type="button" 
                data-bs-target="#featureCarousel" 
                data-bs-slide-to={index}
                className={index === activeIndex ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  border: "none",
                  margin: "0 5px"
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .carousel {
          min-height: 300px;
        }
        .carousel-item {
          transition: transform 0.6s ease-in-out;
        }
        .carousel-control-prev,
        .carousel-control-next {
          width: 5%;
        }
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-size: 1.5rem;
        }
        .carousel-indicators button.active {
          background-color: #fff !important;
          transform: scale(1.2);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(58, 123, 213, 0.6) !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default CourseAndFeatures;