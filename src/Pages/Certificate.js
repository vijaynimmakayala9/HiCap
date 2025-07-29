import React, { useState } from 'react';
import { Download, Book, Clock, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { jsPDF } from 'jspdf';

const courseData = {
  'AI & Machine Learning': {
    instructor: 'Margarita',
    lessons: 12,
    duration: '40 Hours',
    students: '1500+',
    completion: 50,
    description:
      'AI Data Analyst Masters Training offers a comprehensive way to develop advanced data analysis and interpretation skills.',
    image: 'https://img.freepik.com/free-vector/artificial-intelligence-technology-background_23-2148327745.jpg',
  },
  'Web Development': {
    instructor: 'James Smith',
    lessons: 18,
    duration: '60 Hours',
    students: '2500+',
    completion: 75,
    description:
      'Full Stack Web Development course covers frontend, backend, and deployment using latest technologies.',
    image: 'https://img.freepik.com/free-vector/gradient-software-development-concept_23-2148824393.jpg',
  },
  'Data Science': {
    instructor: 'Sophia Lee',
    lessons: 15,
    duration: '50 Hours',
    students: '1800+',
    completion: 90,
    description:
      'Comprehensive Data Science training with Python, statistics, machine learning, and data visualization.',
    image: 'https://img.freepik.com/free-vector/data-science-concept-illustration_114360-8541.jpg',
  },
};


const Certificate = () => {
  const [selectedCourse, setSelectedCourse] = useState('AI & Machine Learning');
  const course = courseData[selectedCourse];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(20);
    doc.text('Certificate of Completion', 20, 20);
    doc.setFontSize(16);
    doc.text(`Course: ${selectedCourse}`, 20, 40);
    doc.text(`Instructor: ${course.instructor}`, 20, 60);
    doc.text(`Course Completed: ${course.completion}%`, 20, 80);
    doc.text(`Duration: ${course.duration}`, 20, 100);
    doc.text(`Lessons Completed: ${course.lessons}`, 20, 120);
    doc.text(`Total Students: ${course.students}`, 20, 140);
    doc.addImage('/certificate.png', 'PNG', 20, 160, 170, 50);
    doc.setFontSize(12);
    doc.text('Issued by: Your Company Name', 20, 220);
    doc.save('certificate.pdf');
  };

  return (
    <>
      <Header />

      <div className="container-fluid px-3 px-md-5 py-4 py-md-5 my-5">
        <div className="mb-4 mt-5 mt-md-0">
          <h1 className="fw-bold mb-2">Certificate</h1>
          <div className="bg-success" style={{ width: '216px', height: '3px', borderRadius: '20px' }} />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Select Course</label>
          <select
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {Object.keys(courseData).map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="card border-light shadow-sm mb-4 mb-md-5">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center">
              <div className="col-12 col-md-2 text-center mb-4 mb-md-0">
                <img
                  src={course.image}
                  alt={selectedCourse}
                  className="img-fluid"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div className="col-12 col-md-10">
                <h2 className="h3 fw-bold mb-3">{selectedCourse}</h2>
                <p className="lead mb-4">{course.description}</p>
                <div className="d-flex flex-wrap gap-3 gap-md-5">
                  <div className="d-flex align-items-center">
                    <Book size={20} className="me-2" />
                    <span>Lesson No: {course.lessons}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock size={20} className="me-2" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Users size={20} className="me-2" />
                    <span>Students: {course.students}</span>
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
                <p className="h4 fw-bold mb-4">{selectedCourse}</p>
                <hr className="my-3" />
                <h3 className="h5 fw-bold mb-3 text-center">Course Completed:</h3>
                <div className="text-center my-4">
                  <div className="position-relative d-inline-block">
                    <div className="progress-circle" style={{ width: '100px', height: '50px' }}>
                      <div className="progress-circle-background"></div>
                      <div
                        className="progress-circle-foreground"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                      <div className="progress-circle-text">{course.completion}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-light shadow-sm h-100">
              <div className="card-body p-4 d-flex flex-column align-items-center justify-content-between">
                <img
                  src="/certificate.png"
                  alt="Certificate"
                  className="img-fluid mb-4"
                  style={{ maxHeight: '200px' }}
                />
                <button
                  onClick={generatePDF}
                  className="btn btn-primary btn-lg d-flex align-items-center gap-2"
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