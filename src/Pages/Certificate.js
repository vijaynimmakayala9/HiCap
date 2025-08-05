import React, { useState, useEffect } from 'react';
import { Download, Book, Clock, Users, Award, CheckCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Certificate = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [certificateData, setCertificateData] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch enrollment data
        const enrollmentResponse = await fetch(`https://hicap-backend-4rat.onrender.com/api/enrollments/${userId}`);
        const enrollmentResult = await enrollmentResponse.json();
        
        if (enrollmentResult.success) {
          setEnrollmentData(enrollmentResult.data);
        }

        // Fetch certificate data
        const certificateResponse = await fetch(`https://hicap-backend-4rat.onrender.com/api/certificate/${userId}`);
        const certificateResult = await certificateResponse.json();
        
        if (certificateResult.success) {
          setCertificateData(certificateResult.data);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Get selected course data
  const selectedCourse = enrollmentData[selectedCourseIndex];
  
  // Find corresponding certificate for selected course
  const selectedCertificate = certificateData?.certificates?.find(cert => {
    return cert.enrollment || cert.user;
  });

  const generatePDF = async () => {
  if (!selectedCertificate?.status?.image) return;

  try {
    const response = await fetch(selectedCertificate.status.image, {
      mode: 'cors',
    });

    if (!response.ok) throw new Error('Failed to fetch image');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCourse?.course?.name || 'Certificate'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // cleanup
  } catch (err) {
    console.error('Error downloading certificate:', err);
    alert('Unable to download certificate. Please try again later.');
  }
};


  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { 
        class: 'bg-success bg-opacity-10 text-success', 
        icon: CheckCircle, 
        text: 'Completed' 
      },
      enrolled: { 
        class: 'bg-primary bg-opacity-10 text-primary', 
        icon: Book, 
        text: 'In Progress' 
      },
      default: { 
        class: 'bg-secondary bg-opacity-10 text-secondary', 
        icon: Clock, 
        text: 'Unknown' 
      }
    };
    
    const config = statusConfig[status] || statusConfig.default;
    const IconComponent = config.icon;
    
    return (
      <span className={`badge rounded-pill d-inline-flex align-items-center ${config.class}`}>
        <IconComponent className="me-1" size={16} />
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-danger mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading certificate data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center text-danger">
          <p className="fs-5 fw-semibold">Error loading certificate data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!enrollmentData || enrollmentData.length === 0) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Award size={64} className="text-muted mb-4" />
          <p className="fs-5 fw-semibold text-muted">No enrolled courses found</p>
          <button className="btn btn-danger mt-4 px-4 py-2">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-vh-100 bg-light pt-5 mt-5">
        <div className="">
          <div className="container py-4">
            <div className="d-flex align-items-center">
              <Award size={32} className="text-danger me-3" />
              <div>
                <h1 className="h2 fw-bold text-dark">Certificate Dashboard</h1>
                <div className="bg-danger" style={{ width: '128px', height: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {/* Course Selection */}
          {enrollmentData.length > 1 && (
            <div className="mb-5">
              <label className="form-label fw-medium mb-2">
                Select Course:
              </label>
              <select
                className="form-select w-100 max-w-md"
                value={selectedCourseIndex}
                onChange={(e) => setSelectedCourseIndex(Number(e.target.value))}
              >
                {enrollmentData.map((enrollment, index) => (
                  <option key={enrollment.course._id} value={index}>
                    {enrollment.course.name} 
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedCourse && (
            <>
              {/* Course Overview Card */}
              <div className="card mb-5 border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="p-4 bg-light bg-gradient">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={selectedCourse.course.image}
                          alt={selectedCourse.course.name}
                          className="rounded shadow-sm"
                          style={{ width: '96px', height: '96px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <h2 className="h3 fw-bold text-dark mb-0">
                            {selectedCourse.course.name}
                          </h2>
                          {getStatusBadge(selectedCourse.status)}
                        </div>
                        <p className="text-muted mb-3">
                          {selectedCourse.course.description}
                        </p>
                        <div className="d-flex flex-wrap gap-4">
                          <div className="d-flex align-items-center text-muted">
                            <Book size={20} className="text-danger me-2" />
                            <span className="fw-medium">{selectedCourse.course.noOfLessons} Lessons</span>
                          </div>
                          <div className="d-flex align-items-center text-muted">
                            <Clock size={20} className="text-danger me-2" />
                            <span className="fw-medium">{selectedCourse.course.duration} Months</span>
                          </div>
                          <div className="d-flex align-items-center text-muted">
                            <Users size={20} className="text-danger me-2" />
                            <span className="fw-medium">{selectedCourse.course.noOfStudents}+ Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                {/* Certificate */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h3 className="h4 fw-bold text-dark mb-4">Certificate</h3>
                      
                      {selectedCourse.status === 'completed' && selectedCertificate ? (
                        <div className="text-center">
                          <div className="mb-4">
                            <img
                              src={selectedCertificate.status.image}
                              alt="Certificate"
                              className="img-fluid rounded shadow-sm border"
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          </div>
                          <div className="mb-3">
                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success">
                              <CheckCircle size={16} className="me-1" />
                              {selectedCertificate.status.type}
                            </span>
                          </div>
                          <button
                            onClick={generatePDF}
                            className="btn btn-danger d-inline-flex align-items-center px-4 py-2"
                          >
                            <Download size={20} className="me-2" />
                            Download Certificate
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Award size={64} className="text-muted mb-3" />
                          <h4 className="h5 fw-medium text-muted mb-2">
                            Certificate Not Available
                          </h4>
                          <p className="text-muted small">
                            {selectedCourse.status === 'enrolled' 
                              ? 'Complete the course to receive your certificate'
                              : 'Certificate will be available upon course completion'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      
                      <div className="d-flex flex-column gap-4">
                        

                        <div className="border-top pt-3">
                          <h4 className="h5 fw-semibold text-dark mb-3">Course Details</h4>
                          <ul className="list-unstyled d-flex flex-column gap-2">
                            <li className="d-flex align-items-center">
                              <CheckCircle size={20} className="text-danger me-2" />
                              <span className="text-muted">Enrolled on: {new Date(selectedCourse.enrollmentDate).toLocaleDateString()}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="border-top pt-3">
                          <button className="btn btn-outline-danger w-100" onClick={()=>navigate('/coursemodule')}>
                            View Course Materials
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Certificate;