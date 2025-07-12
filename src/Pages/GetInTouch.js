import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const GetInTouch = () => {
  return (
    <section className="w-full px-6 md:px-[60px] py-10 flex flex-col md:flex-row justify-between items-start">
      
      {/* Left Section */}
      <div className="max-w-[500px] mb-10 md:mb-0">
        <h1 className="font-roboto font-bold text-4xl text-black mb-6">
          Get in Touch with us!
        </h1>

        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#007860',
              }}
              className="flex items-center justify-center text-white"
            >
              <FaPhoneAlt />
            </div>
            <span className="text-black font-roboto font-medium text-lg">+91 98765 43210</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#007860',
              }}
              className="flex items-center justify-center text-white"
            >
              <FaEnvelope />
            </div>
            <span className="text-black font-roboto font-medium text-lg">contact@example.com</span>
          </div>
        </div>
      </div>

      {/* Right Form Section - smaller height */}
      <div
        style={{
          width: '380px',
          borderRadius: '10px',
          backgroundColor: '#007860',
          padding: '20px',
        }}
        className="text-white"
      >
        <h2 className="font-roboto font-bold text-[24px] leading-[32px] capitalize mb-3 bg-white text-[#007860] px-4 py-2 rounded-md w-fit">
          Sign Up for Free Resources
        </h2>

        {/* Form */}
        <form className="space-y-3 mt-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded-md text-black text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded-md text-black text-sm"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-2 rounded-md text-black text-sm"
          />
          <textarea
            placeholder="Description"
            rows={2}
            className="w-full p-2 rounded-md text-black resize-none text-sm"
          ></textarea>
          <button
            type="submit"
            className="bg-white text-[#007860] font-semibold py-2 px-5 rounded-md hover:opacity-90 text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
