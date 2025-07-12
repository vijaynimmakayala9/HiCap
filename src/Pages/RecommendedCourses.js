import React from 'react';
import { FaRegClock, FaTasks, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const courses = [
  {
    title: 'Multi-Cloud DevOps',
    duration: '3 Months',
    projects: '6 Live Projects',
    rating: '4.7/5',
    description:
      'AI Data Analyst Masters Training offers a comprehensive way to develop advanced data analysis and interpretation skills, equipping professionals to make informed, data-driven decisions and drive business growth with precision.',
  },
  {
    title: 'Cybersecurity Essentials',
    duration: '4 Months',
    projects: '5 Live Projects',
    rating: '4.8/5',
    description:
      'This course builds strong foundational cybersecurity skills, preparing learners to protect networks, systems, and data from cyber threats.',
  },
  {
    title: 'Full-Stack Web Development',
    duration: '6 Months',
    projects: '8 Live Projects',
    rating: '4.9/5',
    description:
      'Learn front-end and back-end development to build scalable, responsive web applications using modern frameworks.',
  },
  {
    title: 'Cloud Architecture',
    duration: '5 Months',
    projects: '7 Live Projects',
    rating: '4.7/5',
    description:
      'Master cloud infrastructure design and deployment to create reliable, scalable cloud solutions tailored for business needs.',
  },
];

const RecommendedCourses = () => {
    const navigate = useNavigate(); // Initialize the navigate function

     // Handle button click to navigate to '/courses'
  const handleViewAllClick = () => {
    navigate('/courses');
  };

  return (
    <section className="w-full px-6 md:px-[60px] py-20 pt-0">
      {/* Heading with green line */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">
          Recommended Courses
        </h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
        {courses.map(({ title, duration, projects, rating, description }, idx) => (
          <div
            key={idx}
            style={{
              width: '500px',
              height: '280px',
              borderRadius: '20px',
              border: '1px solid #00000033',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 1px 16px -4px #00000040',
              padding: '20px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2 className="font-roboto font-bold text-xl mb-2">{title}</h2>

              {/* Subtitle with icons */}
              <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4 font-roboto">
                <div className="flex items-center space-x-1">
                  <FaRegClock />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaTasks />
                  <span>{projects}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400" />
                  <span>{rating}</span>
                </div>
              </div>

              <p className="font-roboto text-base text-gray-700">{description}</p>
            </div>

            <button
              style={{
                width: '100px',
                height: '35px',
                borderRadius: '5px',
                backgroundColor: '#007860',
                color: 'white',
                fontWeight: '600',
                fontFamily: 'Roboto, sans-serif',
                cursor: 'pointer',
                border: 'none',
                alignSelf: 'flex-start',
              }}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* View All text below grid */}
        {/* View All Button */}
        <div className="max-w-[1100px] mx-auto mt-8 flex justify-center">
          <button
            onClick={handleViewAllClick} // Add the click handler here
            style={{
              padding: '10px 30px',
              borderRadius: '5px',
              border: '2px solid #007860',
              backgroundColor: 'transparent',
              color: '#007860',
              fontWeight: '600',
              fontFamily: 'Roboto, sans-serif',
              cursor: 'pointer',
            }}
          >
            View All
          </button>
        </div>
    </section>
  );
};

export default RecommendedCourses;
