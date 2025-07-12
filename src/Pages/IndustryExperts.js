import React from 'react';

const IndustryExperts = () => {
  return (
    <section className="w-full px-6 md:px-[60px] py-10">
      {/* Heading with green line, left aligned and smaller */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">
          Learn From The Industry Experts
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

      {/* Centered image with reduced width and height */}
      <div className="mx-auto max-w-[700px]">
        <img
          src="/grp.png"
          alt="Industry Expert Group"
          className="w-full h-[250px] object-contain"
        />
      </div>
    </section>
  );
};

export default IndustryExperts;
