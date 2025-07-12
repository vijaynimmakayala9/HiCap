import React from 'react';
import Header from './Header';   // Adjust path if needed
import Footer from './Footer';   // Adjust path if needed
import AboutUs from './AboutUs'; // Adjust path if needed

const AboutSection = () => {
  return (
    <>
      <Header />

      <div style={{ maxWidth: '1440px', margin: '40px auto', padding: '0 24px' }}>
        {/* Render AboutUs component */}
        <AboutUs />

        {/* Content below AboutUs */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Text */}
          <div style={{ flex: 1, fontFamily: 'Roboto', fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
          </div>

          {/* Right Image */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/img2.png"
              alt="About Us"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutSection;
