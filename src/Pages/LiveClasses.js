import React from 'react';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';

const LiveClasses = () => {
  return (
    <section className="w-full px-6 md:px-[60px] pt-12 pb-12 flex flex-col gap-10 font-roboto mb-12">
      {/* Heading */}
      <div className="max-w-[600px] mb-4">
        <h1 className="font-bold text-2xl md:text-3xl text-black mb-2">Live Classes</h1>
        <div className="w-[180px] h-2 rounded-full bg-[#007860]" />
      </div>

      {/* Live Session Content */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left Side Image */}
        <div
          className="w-[520px] h-[300px] rounded-[10px] overflow-hidden"
          style={{
            backgroundColor: '#00000099',
            boxShadow: '0px 0px 14px 0px #00000040',
          }}
        >
          <img
            src="/ai.png"
            alt="Live Class"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col gap-4 text-black">
          {/* Live Session Text */}
          <div className="w-full max-w-[500px] bg-white px-4 py-4 text-[28px] leading-tight rounded">
            Live session is ongoing. Enter for your daily class
          </div>

          {/* Info Boxes */}
          <div className="flex gap-4">
            {/* Timer Box */}
            <div className="w-[140px] h-[110px] bg-white border border-[#00000033] rounded-[16px] flex flex-col items-center justify-center">
              <MdOutlineTimer size={30} color="#007860" className="mb-2" />
              <div className="text-[16px] font-medium">1 Hour daily</div>
            </div>

            {/* Ongoing Class Box */}
            <div className="w-[140px] h-[110px] bg-white border border-[#00000033] rounded-[16px] flex flex-col items-center justify-center">
              <SiGoogleclassroom size={30} color="#007860" className="mb-2" />
              <div className="text-[16px] font-medium">Ongoing Classes</div>
            </div>
          </div>

          {/* Join Now Button */}
          <button
            className="mt-2 w-[180px] h-[48px] bg-[#007860] rounded-full px-6 flex items-center justify-center gap-2 text-white font-semibold hover:bg-[#00604d] transition"
          >
            <span>Join Now</span>
            <MoveRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveClasses;
