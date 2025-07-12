import React, { useEffect, useRef, useState } from 'react';
import { FaChalkboard, FaUsers, FaBuilding, FaAward, FaClock } from 'react-icons/fa';
import CountUp from 'react-countup';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  const stats = [
    { icon: <FaChalkboard />, number: '2500', label: 'Total Teachers' },
    { icon: <FaUsers />, number: '5000', label: 'Total Students' },
    { icon: <FaBuilding />, number: '350', label: 'Total Classrooms' },
    { icon: <FaAward />, number: '1200', label: 'Best Awards Won' },
  ];

  const statsRef = useRef(null); // Ref to detect scroll position

  useEffect(() => {
    const handleScroll = () => {
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setIsVisible(true); // Set to true when the stats section is visible
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();  // Check visibility on initial load as well

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full px-6 md:px-[60px] py-20">
      {/* About Us heading */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-5xl mb-2 text-black">About Us</h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-between relative mb-20">
        {/* Left side */}
        <div className="max-w-[600px] mb-8 md:mb-0">
          <h2 className="font-roboto font-bold text-3xl md:text-4xl mb-2 text-black">
            Delivering Top-Quality Online Tuition
          </h2>
          <h3 className="font-roboto font-bold text-3xl md:text-4xl mb-6 text-black">From India’s Best Educators</h3>
          <p className="font-roboto text-base text-gray-700 mb-8 max-w-[550px]">
            We assess each student’s strengths, challenges, and goals to build a roadmap that suits them.
          </p>
          <div className="flex flex-wrap space-x-10 text-gray-800 font-roboto font-medium text-lg">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FaChalkboard className="text-[#007860]" />
              <span className="text-[#007860]">Expert Trainers</span>
            </div>
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FaClock className="text-[#007860]" />
              <span className="text-[#007860]">Flexible Timings</span>
            </div>
          </div>
        </div>

        {/* Right image + overlay */}
        <div className="relative w-[350px] md:w-[400px] h-[350px] md:h-[400px] flex-shrink-0">
          <img
            src="/image.png"
            alt="About Us Illustration"
            className="w-full h-full object-cover rounded-md"
          />
          {/* Badge */}
          <div
            className="absolute top-2/3 left-[-35px] transform -translate-y-1/2 bg-white rounded-lg shadow-md w-[133px] h-[62px] flex items-center justify-center"
          >
            <span className="font-roboto font-semibold text-sm text-[#007860]">
              20k+ Learners
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className={`flex flex-wrap justify-center items-center gap-16 ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}
      >
        {stats.map((stat, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center mb-10">
              {/* Stat circle */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#007860' }}>
                <span className="text-white text-lg">{stat.icon}</span>
              </div>
              <span className="font-roboto font-bold text-base text-black">
                {isVisible && <CountUp start={0} end={parseInt(stat.number)} duration={3} separator="," />}
              </span>
              <span className="font-roboto text-sm text-gray-600 text-center">{stat.label}</span>
            </div>

            {/* Vertical gray line (between circles only) */}
            {idx !== stats.length - 1 && (
              <div className="w-[2px] h-[120px] bg-gray-300 mt-4"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
