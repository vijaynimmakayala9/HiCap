import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseEnquiryModal from "./EnrollModal";

const CourseAndFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const courses = [
    {
      title: "“IT TRAINING AND SKILL DEVELOPMENT",
      description: "This IT Fundamentals Training Course provides a comprehensive introduction to the core concepts of Information Technology. Designed for beginners and professionals seeking foundational knowledge, the course covers computer hardware, software, networking, databases, cybersecurity, and cloud computing.Through a mix of theoretical instruction and hands- on practice, participants will learn how IT systems work together to support business operations.",
      image: "/1.png",
      buttonText: "Enroll Now",
      // features: [
      //   "12-week intensive program",
      //   "Hands-on projects",
      //   "Career support"
      // ]
    },
    {
      title: "IT TRAINING AND SKILL DEVELOPMENT",
      description: "This IT Fundamentals Training Course provides a comprehensive introduction to the core concepts of Information Technology. Designed for beginners and professionals seeking foundational knowledge, the course covers computer hardware, software, networking, databases, cybersecurity, and cloud computing.Through a mix of theoretical instruction and hands- on practice, participants will learn how IT systems work together to support business operations.",
      image: "/2.png",
      buttonText: "Enroll Now",
      // features: [
      //   "8-week course",
      //   "Real-world datasets",
      //   "Python focused"
      // ]
    },
    {
      title: "IT TRAINING AND SKILL DEVELOPMENT",
      description: "This IT Fundamentals Training Course provides a comprehensive introduction to the core concepts of Information Technology. Designed for beginners and professionals seeking foundational knowledge, the course covers computer hardware, software, networking, databases, cybersecurity, and cloud computing.Through a mix of theoretical instruction and hands- on practice, participants will learn how IT systems work together to support business operations.",
      image: "/3.png",
      buttonText: "Enroll Now",
      // features: [
      //   "Project-based learning",
      //   "Industry tools",
      //   "Portfolio building"
      // ]
    }
  ];

  // Auto-scroll functionality
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        const nextIndex = (activeIndex + 1) % courses.length;
        goToSlide(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds
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
    // Initialize auto-scroll
    startAutoScroll();

    // Initialize Bootstrap carousel
    if (carouselRef.current) {
      new window.bootstrap.Carousel(carouselRef.current, {
        interval: false, // We handle the interval ourselves
        wrap: true
      });
    }

    return () => {
      stopAutoScroll();
    };
  }, []);

  // Reset timer when activeIndex changes
  useEffect(() => {
    stopAutoScroll();
    if (!isPaused) {
      startAutoScroll();
    }
  }, [activeIndex, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleEnroll = () => {
    setShowEnquiryModal(true);
  }


  return (
    <>
      <section className="py-5 mt-5" >
        <div className="container">
          {/* <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Our Featured Courses</h2>
          <p className="text-muted lead">Learn from industry experts with real-world experience</p>
        </div> */}

          <div
            id="courseCarousel"
            className="carousel slide"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="carousel-inner">
              {courses.map((course, index) => (
                <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="img-fluid rounded-3 shadow-lg"
                        style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="ps-lg-4">
                        <h3 className="fw-bold mb-3 display-6" >IT <span style={{ color: "#ad2132" }} >TRAINING</span> AND <span style={{ color: "#ad2132" }} >SKILL</span> DEVELOPMENT”</h3>
                        <p className=" mb-4 ">{course.description}</p>

                        {/* <ul className="mb-4">
                        {course.features.map((feature, i) => (
                          <li key={i} className="mb-2">
                            <i className="bi bi-check-circle-fill textcolor me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul> */}

                        <div className="d-flex justify-content-lg-end justify-content-start">
                          <button className=" gradient-button btn-md px-4 py-3 rounded-pill fw-bold" onClick={handleEnroll} style={{ width: "200px" }}>
                            {course.buttonText}
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="d-flex justify-content-center mt-4">
            {courses.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`mx-1 p-0 border-0 bg-transparent ${index === activeIndex ? 'active' : ''}`}
                aria-label={`Slide ${index + 1}`}
              >
                <div 
                  style={{
                    width: index === activeIndex ? '24px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: index === activeIndex ? '#0d6efd' : '#adb5bd',
                    transition: 'all 0.3s ease'
                  }}
                ></div>
              </button>
            ))}
          </div> */}

            {/* Controls */}
            {/* <button 
            className="carousel-control-prev" 
            type="button" 
            onClick={() => goToSlide((activeIndex - 1 + courses.length) % courses.length)}
          >
            <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            onClick={() => goToSlide((activeIndex + 1) % courses.length)}
          >
            <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button> */}
          </div>
        </div>



        {/* Custom CSS */}
        <style jsx>{`
        .carousel-control-prev,
        .carousel-control-next {
          width: auto;
          opacity: 1;
        }
        .carousel-control-prev {
          left: -50px;
        }
        .carousel-control-next {
          right: -50px;
        }
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-size: 1.2rem;
        }
        .btn-primary {
          background: linear-gradient(45deg, #0d6efd, #0b5ed7);
          border: none;
          box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
          transition: all 0.3s ease;
        }
        li {
          font-size: 1.1rem;
        }
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