import React, { useState, useEffect } from 'react';
import { Download, Book, Clock, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const Certificate = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch certificate data
        const certResponse = await axios.get(`https://hicap-backend-4rat.onrender.com/api/Certificate/${userId}`);
        setApiData(certResponse.data.data);
        
        // Fetch enrollment data
        const enrollResponse = await axios.get(`https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`);
        setEnrollmentData(enrollResponse.data.data[0]); // Take first course for now
        
        // Set the selected course to the enrolled course
        if (enrollResponse.data.data.length > 0) {
          setSelectedCourse({
            name: enrollResponse.data.data[0].name,
            instructor: 'Instructor Name', // You might want to get this from API
            lessons: enrollResponse.data.data[0].noOfLessons,
            duration: `${enrollResponse.data.data[0].duration} Months`,
            students: `${enrollResponse.data.data[0].noOfStudents}+`,
            completion: apiData?.enrollment?.performance 
              ? Math.round((apiData.enrollment.performance.theoreticalPercentage + apiData.enrollment.performance.practicalPercentage) / 2)
              : 0,
            description: enrollResponse.data.data[0].description,
            image: enrollResponse.data.data[0].image
          });
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   const generatePDF = () => {
    if (!apiData?.status?.image) return;
    
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
    
    // Get the certificate image URL from API
    const certImage = apiData.status.image;
    
    // Create a new image to get dimensions
    const img = new Image();
    img.src = certImage;
    
    img.onload = function() {
      // Calculate dimensions to fit the PDF (A4 size: 297x210mm)
      const ratio = Math.min(297 / img.width, 210 / img.height) * 0.9;
      const width = img.width * ratio;
      const height = img.height * ratio;
      
      // Center the image on the page
      const x = (297 - width) / 2;
      const y = (210 - height) / 2;
      
      // Add the image to PDF
      doc.addImage(certImage, 'PNG', x, y, width, height);
      doc.save('certificate.pdf');
    };
    
    img.onerror = function() {
      // Fallback to default image if API image fails to load
      doc.addImage('/certificate.png', 'PNG', 10, 10, 277, 190);
      doc.save('certificate.pdf');
    };
  };

  if (loading) {
    return <div className="text-center py-5">Loading certificate data...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error loading certificate: {error}</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-5">No enrolled courses found</div>;
  }

  return (
    <>
      <Header />

      <div className="container-fluid px-3 px-md-5 py-4 py-md-5 my-5">
        <div className="mb-4 mt-5 mt-md-0">
          <h1 className="fw-bold mb-2 textcolor">Certificate</h1>
          <div className="bg-meroon" style={{ width: '216px', height: '3px', borderRadius: '20px' }} />
        </div>

        <div className="card border-light shadow-sm mb-4 mb-md-5">
          <div className="card-body p-4 p-md-5" style={{backgroundColor: "#f8d7da"}}>
            <div className="row align-items-center">
              <div className="col-12 col-md-2 text-center mb-4 mb-md-0">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.name}
                  className="img-fluid"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div className="col-12 col-md-10">
                <h2 className="h3 fw-bold mb-3 textcolor">{selectedCourse.name}</h2>
                <p className="lead mb-4">{selectedCourse.description}</p>
                <div className="d-flex flex-wrap gap-3 gap-md-5">
                  <div className="d-flex align-items-center">
                    <Book size={20} className="me-2 textcolor" />
                    <span>Lesson No: {selectedCourse.lessons}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock size={20} className="me-2 textcolor" />
                    <span>Duration: {selectedCourse.duration}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Users size={20} className="me-2 textcolor" />
                    <span>Students: {selectedCourse.students}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <div className="card border-light shadow-sm h-100">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-3">Certificate Dashboard</h2>
                <hr className="my-3" />
                <h3 className="h5 fw-bold mb-2">Course Name:</h3>
                <p className="h4 fw-bold mb-4 textcolor">{selectedCourse.name}</p>
                <hr className="my-3" />
                {apiData?.enrollment?.performance && (
                  <>
                    <hr className="my-3" />
                    <h3 className="h5 fw-bold mb-3">Performance Details:</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <p>Theoretical: {apiData.enrollment.performance.theoreticalPercentage}%</p>
                        <p>Practical: {apiData.enrollment.performance.practicalPercentage}%</p>
                      </div>
                      <div className="col-md-6">
                        <p>Grade: {apiData.enrollment.performance.grade}</p>
                        <p>Feedback: {apiData.enrollment.performance.feedback}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-light shadow-sm h-100">
              <div className="card-body p-4 d-flex flex-column align-items-center justify-content-between">
                <img
                  src={apiData?.status?.image || '/certificate.png'}
                  alt="Certificate"
                  className="img-fluid mb-4"
                  style={{ maxHeight: '200px' }}
                />
                <button
                  onClick={generatePDF}
                  className="btn gradient-button btn-lg d-flex align-items-center gap-2"
                >
                  <span>Download</span>
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .progress-circle {
          position: relative;
          overflow: hidden;
        }
        .progress-circle-background {
          width: 100px;
          height: 50px;
          background-color: #e9ecef;
          border-top-left-radius: 100px;
          border-top-right-radius: 100px;
        }
        .progress-circle-foreground {
          position: absolute;
          top: 0;
          left: 0;
          height: 50px;
          background-color: #007860;
          border-top-left-radius: 100px;
        }
        .progress-circle-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 600;
          font-size: 1.25rem;
        }
      `}</style>

      <Footer />
    </>
  );
};

export default Certificate;