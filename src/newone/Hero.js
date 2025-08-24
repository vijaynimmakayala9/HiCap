import React, { useState, useEffect } from "react";
import { FaUser, FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const [activeWord, setActiveWord] = useState(null);

  useEffect(() => {
    const runSequence = () => {
      setTimeout(() => setActiveWord("Upgrade"), 0);
      setTimeout(() => setActiveWord(null), 2000);

      setTimeout(() => setActiveWord("Your"), 2000);
      setTimeout(() => setActiveWord(null), 4000);

      setTimeout(() => setActiveWord("Future"), 4000);
      setTimeout(() => setActiveWord(null), 6000);
    };

    runSequence();
    const interval = setInterval(runSequence, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-white via-gray-50 to-red-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-gray-600 mb-4 md:mb-6 animate-fade-in">
          India's #1 Premium Training Institute
        </h3>

        <h1 className="font-bold leading-tight mb-6 md:mb-8 hero-heading flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
          {["Upgrade", "Your", "Future"].map((word, idx) => (
            <React.Fragment key={word}>
              <span
                className={`inline-block transition-all duration-500 ease-in-out transform ${
                  activeWord === word
                    ? "gradient-text scale-110 animate-pulse"
                    : "text-gray-800 hover:scale-105"
                }`}
              >
                {word}
              </span>
              {idx < 2 && (
                <span className="hidden md:inline-block w-px h-10 bg-gray-400 mx-2"></span>
              )}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-gray-600 mt-4 mb-8 md:mb-10 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-center">
          <span className="font-semibold text-red-600">100,000+</span> students uplifted through our Online training,
          <br className="hidden sm:block" />
          enriched by <span className="font-semibold text-red-600">real-time projects</span> and{" "}
          <span className="font-semibold text-red-600">guaranteed job support</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 items-center w-full sm:w-auto">
          <button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg w-full sm:w-auto min-w-[140px] sm:min-w-[220px]">
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2 sm:gap-3">
              <FaPlay className="text-base sm:text-lg group-hover:animate-bounce" />
              <span>Join Free Demo</span>
            </div>
          </button>

          <button className="group bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 hover:border-red-700 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md w-full sm:w-auto min-w-[140px] sm:min-w-[220px]">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <FaUser className="text-base sm:text-lg group-hover:animate-pulse" />
              <span>Contact Course Advisor</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto w-full">
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              100K+
            </div>
            <div className="text-gray-600 font-medium">Students Trained</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              95%
            </div>
            <div className="text-gray-600 font-medium">Placement Rate</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-gray-600 font-medium">Partner Companies</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-heading {
          font-size: 3rem; /* Mobile */
          line-height: 1.2;
        }
        @media (min-width: 640px) { .hero-heading { font-size: 4rem; } }
        @media (min-width: 768px) { .hero-heading { font-size: 4.5rem; } }
        @media (min-width: 1024px) { .hero-heading { font-size: 5.5rem; } }
        @media (min-width: 1280px) { .hero-heading { font-size: 6rem; } }
        @media (min-width: 1536px) { .hero-heading { font-size: 6.5rem; } }

        .gradient-text {
          background: linear-gradient(135deg, #dc2626, #b91c1c, #991b1b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(220, 38, 38, 0.2));
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .hero-heading span { cursor: default; }
      `}</style>
    </div>
  );
};

export default HeroSection;
