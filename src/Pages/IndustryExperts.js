import React from 'react';

const IndustryExperts = () => {
  const logos = [
    '/logos/aws.png',
    '/logos/google.png',
    '/logos/microsoft.png',
    '/logos/meta.png',
    '/logos/ibm.png',
    '/logos/tcs.png',
    '/logos/infosys.png',
    '/logos/oracle.png',
  ];

  return (
    <section className="w-full mb-4 px-6 md:px-[60px] py-10">
      {/* Heading */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl mb-2 text-black">
          Our Esteemed Clients
        </h1>
        <p>Some of the Companies we've helped recurit excellent applicants over the years</p>
      </div>

      {/* Center image */}
      {/* <div className="mx-auto max-w-[700px] mb-10">
        <img
          src="/grp.png"
          alt="Industry Expert Group"
          className="w-full h-[250px] object-contain"
        />
      </div> */}

      {/* Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center align-items-center">
        {logos.map((logo, index) => (
          <div key={index} className="w-[100px] h-[60px] flex justify-center items-center">
            <img src={logo} alt={`Logo ${index + 1}`} className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndustryExperts;
