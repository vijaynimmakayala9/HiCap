import React from 'react';
import Header from './Header';
import Footer from './Footer';

const mentorData = new Array(9).fill({
  name: 'Margarita',
  title: 'AI Machine Learning Lead',
  image: '/mentor1.png', // Adjust path if needed
});

const OurMentorsPage = () => {
  return (
    <>
      <Header />

      <div style={{ 
        maxWidth: '1280px', 
        margin: '60px auto', 
        padding: '0 24px', 
        fontFamily: 'Roboto',
        marginTop: '100px',  // Added margin-top for spacing from top
      }}>
        {/* Heading + Green Line + Subtitle */}
        <div className="max-w-[600px] mb-12" style={{ marginRight: 'auto' }}>
          <h1 className="font-roboto font-bold text-3xl mb-2 text-black mt-10">
            Our Mentors
          </h1>
          <div
            style={{
              width: '216px',
              height: '8px',
              borderRadius: '20px',
              backgroundColor: '#007860',
              marginBottom: '12px',
            }}
          />
          <p style={{ fontSize: '16px', color: '#555', maxWidth: '400px' }}>
            Grow your startup faster with mentorship
          </p>
        </div>

        {/* Mentor Cards */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'space-between'
        }}>
          {mentorData.map((mentor, index) => (
            <div
              key={index}
              style={{
                width: '275px',
                height: '343px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0px 4px 4px 0px #00000040',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 12px',
              }}
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              />
              <h2 style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '160%',
                color: '#000000',
                marginBottom: '8px',
              }}>
                {mentor.name}
              </h2>
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '160%',
                color: '#555',
                textAlign: 'center',
              }}>
                {mentor.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurMentorsPage;
