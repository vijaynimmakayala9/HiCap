import React, { useState, useEffect } from "react";

const NewHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "Professional Skill Development Through Innovative Methods",
      description:
        "We provide industry-focused IT training designed to enhance both technical and professional skills. Through innovative teaching methods, hands-on projects, and expert mentorship, we ensure learners gain practical knowledge and confidence.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Innovative Approaches to Professional Development",
      description:
        "We offer innovative and practical training solutions designed to help learners build essential technical and professional skills. Our programs focus on real-world applications, hands-on projects, and expert mentorship to ensure career readiness.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Building Competence Through Strategic Skill Enhancement",
      description:
        "Through organized and well-thought-out training programs, we concentrate on giving students the fundamental technical and professional skills they need. Our approach combines expert guidance, practical learning, and real-time projects.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
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
    if (index === (currentSlide - 1 + banners.length) % banners.length)
      return "left";
    if (index === (currentSlide + 1) % banners.length) return "right";
    return index < currentSlide ? "far-left" : "far-right";
  };

  return (
    <div className="relative w-full bg-gray-50 overflow-hidden h-screen min-h-[600px] max-h-[1200px] ">
      <div className="relative h-full">
        {banners.map((banner, index) => {
          const position = getSlidePosition(index);

          return (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${position === "active" ? "opacity-100 z-20" : "opacity-0 z-0"
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
              }}
            >
              <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between text-center lg:text-left py-6">
                {/* Left Content */}
                <div className="flex-1 flex justify-center lg:ml-6 relative">
                  <div className="relative">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] rounded-xl object-cover shadow-lg border-2 border-white transform perspective-[1000px] -rotate-y-6"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600/10 to-transparent z-10"></div>
                    {/* Radial gradient */}
                    <div className="absolute -top-10 -right-10 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(220,53,69,0.15)_0%,transparent_70%)]"></div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 max-w-full lg:max-w-[45%] mb-6 lg:mb-0 lg:mr-6">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg lg:text-xl max-h-40 overflow-y-auto mb-6">
                    {banner.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg shadow">
                      Login
                    </button>
                    <button className="border border-red-600 text-red-600 hover:bg-red-50 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center justify-center gap-2">
                      <i className="bi bi-play-circle-fill"></i> Book a Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`text-2xl ${
              index === currentSlide ? "text-red-600" : "text-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            •
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default NewHero;
