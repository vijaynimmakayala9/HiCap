import React from 'react';
import Header from '../Header/Header';   // Adjust path if needed
import Footer from './Footer';   // Adjust path if needed
import AboutUs from './AboutUs'; // Adjust path if needed

const AboutSection = () => {
  return (
    <>
      <Header />

      <div style={{ maxWidth: '1440px', margin: '10px auto', padding: '0 24px' }}>
        {/* Render AboutUs component */}
        <AboutUs />
      </div>
      <Footer />
    </>
  );
};

export default AboutSection;
