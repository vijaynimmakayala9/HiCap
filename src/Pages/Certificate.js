import React from 'react';
import { Download, Book, Clock, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { jsPDF } from 'jspdf';

const Certificate = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Define certificate content for PDF
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(20);

    // Add Title to the PDF
    doc.text('Certificate of Completion', 20, 20);

    // Add the course title, description, and other content
    doc.setFontSize(16);
    doc.text('Course: AI & Machine Learning', 20, 40);
    doc.text('Instructor: Margarita', 20, 60);
    doc.text('Course Completed: 50%', 20, 80);
    doc.text('Duration: 40 hours', 20, 100);
    doc.text('Lessons Completed: 12', 20, 120);
    doc.text('Total Students: 1500+', 20, 140);

    // Add some space and then the certificate image (you can also add custom logo here)
    doc.addImage('/certificate.png', 'PNG', 20, 160, 170, 50); // Replace with your image path

    // Add a footer for the certificate
    doc.setFontSize(12);
    doc.text('Issued by: Your Company Name', 20, 220);

    // Save the PDF with the name "certificate.pdf"
    doc.save('certificate.pdf');
  };

  return (
    <>
      <Header />

      <div className="font-roboto px-6 md:px-[120px] min-h-screen mt-10">
        {/* Heading */}
        <div className="max-w-[600px] mb-4" style={{ marginRight: 'auto', marginTop: '70px' }}>
          <h1 className="font-roboto font-bold text-3xl mb-2 text-black">Certificate</h1>
          <div
            style={{
              width: '216px',
              height: '8px',
              borderRadius: '20px',
              backgroundColor: '#007860',
              marginBottom: '12px',
            }}
          />
        </div>

        {/* New text below certificate */}
        <div className="max-w-[600px] mb-12" style={{ marginRight: 'auto' }}>
          <p
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: 20,
              color: '#333',
            }}
          >
            My course
          </p>
        </div>

        {/* Main Top Rectangle */}
        <div
          style={{
            width: 1200,
            height: 250,
            borderRadius: 20,
            border: '1px solid #00000033',
            background: '#FFFFFF',
            position: 'relative',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 120,
            gap: 40,
          }}
        >
          {/* Left image */}
          <img
            src="/ai.png"
            alt="AI"
            style={{ width: 120, height: 120, objectFit: 'contain' }}
          />

          {/* Text block */}
          <div style={{ maxWidth: 550 }}>
            <h2
              style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 24,
                lineHeight: '150%',
                color: 'black',
                marginBottom: 12,
                width: 243,
                height: 36,
              }}
            >
              AI & Machine Learning
            </h2>

            <p
              style={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: 18,
                lineHeight: '26px',
                width: 550,
                height: 104,
                color: 'black',
              }}
            >
              AI Data Analyst Masters Training offers a comprehensive way to develop advanced data
              analysis and interpretation skills, equipping professionals to make informed, data-driven
              decisions and drive business growth with precision.
            </p>

            {/* Lesson no, Duration, Students with icons */}
            <div className="flex gap-8 mt-6" style={{ color: '#000' }}>
              <div className="flex items-center gap-2">
                <Book size={20} />
                <span>Lesson No: 12</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>Duration: 40 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Students: 1500+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Flex */}
        <div className="flex gap-12 mb-12"> {/* added margin bottom */}

          {/* Left Rectangle */}
          <div
            style={{
              width: 320,  // smaller width (60% of 526)
              height: 335,  // smaller height (60% of 553)
              borderRadius: 20,
              border: '1px solid #00000033',
              background: '#FFFFFF',
              padding: 20,  // smaller padding
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* Certificate Dashboard Text */}
            <h2
              style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 22,  // smaller font size
                lineHeight: '150%',
                color: 'black',
                width: 220,
                height: 36,
                marginBottom: 12,
              }}
            >
              Certificate Dashboard
            </h2>

            {/* Horizontal line */}
            <hr
              style={{
                width: '100%',
                borderColor: '#00000033',
                borderWidth: 1,
                marginBottom: 16,
              }}
            />

            {/* Course Name label */}
            <h3
              style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 18,
                lineHeight: '150%',
                color: 'black',
                marginBottom: 6,
              }}
            >
              Course Name:
            </h3>

            {/* Course Name */}
            <p
              style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 22,
                lineHeight: '150%',
                color: 'black',
                marginBottom: 18,
              }}
            >
              AI & Machine Learning
            </p>

            {/* Another horizontal line */}
            <hr
              style={{
                width: '100%',
                borderColor: '#00000033',
                borderWidth: 1,
                marginBottom: 18,
              }}
            />

            {/* Course Completed label */}
            <h3
              style={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 18,
                lineHeight: '150%',
                color: 'black',
                marginBottom: 18,
              }}
            >
              Course Completed:
            </h3>

            {/* Half Circle Progress */}
            <div
              style={{
                position: 'relative',
                width: 100,
                height: 50,
                margin: '0 auto',
              }}
            >
              {/* Half circle background (gray) */}
              <div
                style={{
                  width: '100px',
                  height: '50px',
                  backgroundColor: '#ccc',
                  borderTopLeftRadius: '100px',
                  borderTopRightRadius: '100px',
                }}
              />
              {/* Half circle foreground (green progress) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50px', // half width for 50%
                  height: '50px',
                  backgroundColor: '#007860',
                  borderTopLeftRadius: '100px',
                }}
              />
              {/* Text in center */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'black',
                }}
              >
                50%
              </div>
            </div>
          </div>

          {/* Right Rectangle */}
          <div
            style={{
              width: 320,  // smaller width
              height: 335,  // smaller height
              borderRadius: 20,
              border: '1px solid #00000033',
              background: '#FFFFFF',
              padding: 20,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src="/certificate.png"
              alt="Certificate"
              style={{ maxWidth: '100%', maxHeight: '70%', objectFit: 'contain' }}
            />

            {/* Download Button */}
            <button
              onClick={generatePDF}
              style={{
                width: 140,
                height: 44,
                borderRadius: 5,
                backgroundColor: '#007860',
                color: 'white',
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
                border: 'none',
                marginTop: 24,
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              <span>Download</span>
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Certificate;
