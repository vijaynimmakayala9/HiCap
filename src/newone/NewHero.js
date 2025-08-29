import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            title: "Develop your skills in a new and unique way",
            description:
                "We are dedicated to shaping future-ready IT professionals. With industry-expert trainers, practical learning methods, and globally recognized certifications,",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            title: "Master cutting-edge technologies with expert guidance",
            description:
                "Transform your career with comprehensive training programs designed by industry leaders. Get hands-on experience with real-world projects and certification support,",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            title: "Build tomorrow's solutions today",
            description:
                "Join thousands of successful graduates who've advanced their careers through our innovative learning platform. Expert mentorship and practical skills await,",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        },
    ];

    // Auto-rotate carousel with infinite loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    // Pre-calculate slide positions for smooth transitions
    const getSlidePosition = (index) => {
        if (index === currentSlide) {
            return "active";
        } else if (index === (currentSlide - 1 + banners.length) % banners.length) {
            return "left";
        } else if (index === (currentSlide + 1) % banners.length) {
            return "right";
        } else {
            return index < currentSlide ? "far-left" : "far-right";
        }
    };

    return (
        <div className="position-relative w-100 vh-100 bg-light overflow-hidden">
            <div className="position-relative h-100">
                {banners.map((banner, index) => {
                    const position = getSlidePosition(index);

                    return (
                        <div
                            key={index}
                            className={`position-absolute top-0 w-100 h-100 transition-all ${position === "active"
                                    ? "opacity-100 z-2"
                                    : position === "left" || position === "right"
                                        ? "opacity-0 z-1"
                                        : "opacity-0 z-0"
                                }`}
                            style={{
                                transform:
                                    position === "active" ? "translateX(0)" :
                                        position === "left" ? "translateX(-100%)" :
                                            position === "right" ? "translateX(100%)" :
                                                position === "far-left" ? "translateX(-100%)" : "translateX(100%)",
                                transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
                                left: 0,
                                right: 0
                            }}
                        >
                            <div className="container h-100 d-flex flex-column flex-lg-row align-items-center justify-content-between text-center text-lg-start py-5">
                                {/* Left Content */}
                                <div className="flex-grow-1" style={{ maxWidth: "650px" }}>
                                    <h1 className="display-4 fw-bold text-dark mb-4 lh-tight">
                                        {banner.title}
                                    </h1>
                                    <p className="lead text-muted mb-4">{banner.description}</p>
                                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                        <button className="btn btn-danger btn-lg px-4">Login</button>
                                        <button className="btn btn-outline-danger btn-lg px-4 d-flex align-items-center gap-2">
                                            <i className="bi bi-play-circle-fill"></i> {/* Video icon */}
                                            Book a Demo
                                        </button>

                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="mt-5 mt-lg-0 ms-lg-4 d-flex justify-content-center align-items-center">
                                    <div
                                        className="position-relative"
                                        style={{ width: "100%", maxWidth: "500px" }}
                                    >
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="img-fluid rounded-4 shadow-lg"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                                transform: "perspective(1000px) rotateY(-10deg)",
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                                border: "5px solid white"
                                            }}
                                        />
                                        {/* Decorative elements */}
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(220,53,69,0.1) 0%, transparent 50%)",
                                                zIndex: 1
                                            }}
                                        ></div>
                                        <div
                                            className="position-absolute"
                                            style={{
                                                width: "120%",
                                                height: "120%",
                                                top: "-10%",
                                                right: "-10%",
                                                background: "radial-gradient(circle, rgba(220,53,69,0.15) 0%, transparent 70%)",
                                                zIndex: 0
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation indicators */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-3">
                <div className="d-flex">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`btn p-1 mx-1 ${index === currentSlide ? "text-danger" : "text-muted"}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className="fs-4">•</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewHero;