import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegClock, FaUserGraduate, FaBook } from 'react-icons/fa';
import { MoveRight } from 'lucide-react';

const CompletedClasses = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/course/ai-ml');
  };

  return (
    <section className="w-full px-6 md:px-[60px] py-20 pt-0">
      {/* Heading */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">Completed Classes</h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Course Card */}
      <div
        style={{
          width: '387px',
          height: '450px',
          border: '1px solid #0000004D',
          boxShadow: '0px 4px 10px 0px #00000040',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <img
          src="/ai.png"
          alt="AI & ML"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />

        <div style={{ padding: '16px 20px' }}>
          <h2 className="font-roboto font-semibold text-[20px] text-black mb-4">
            AI & Machine Learning
          </h2>

          <div className="flex justify-between mb-6 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <FaRegClock />
              <span>6 Months</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBook />
              <span>12 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUserGraduate />
              <span>300+ Students</span>
            </div>
          </div>

          <div
            onClick={handleStartLearning}
            style={{
              width: '185px',
              height: '50px',
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#007860',
              color: 'white',
              fontWeight: '600',
              fontFamily: 'Roboto, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <span>Start Learning</span>
            <MoveRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedClasses;
