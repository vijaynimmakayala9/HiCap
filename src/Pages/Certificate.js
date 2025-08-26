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

        // Simulated fetch with static data for demo
        const staticEnrollmentData = [
          {
            course: {
              _id: '1',
              name: 'Full Stack Python',
              image: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
              description: 'Learn Python, Django, React and more.',
              noOfLessons: 20,
              duration: 3,
              noOfStudents: 1200,
            },
            status: 'completed',
            enrollmentDate: '2025-01-15',
          },
          {
            course: {
              _id: '2',
              name: 'React for Beginners',
              image: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
              description: 'Learn React JS from scratch.',
              noOfLessons: 15,
              duration: 2,
              noOfStudents: 800,
            },
            status: 'enrolled',
            enrollmentDate: '2025-06-01',
          },
        ];

        const staticCertificateData = {
          certificates: [
            {
              enrollment: '1',
              status: {
                type: 'Completed',
                image: 'https://graphicsfamily.com/wp-content/uploads/edd/2022/01/Award-Certificate-Template-1536x1117.jpg',
              },
            },
            {
              enrollment: '2',
              status: {
                type: 'In Progress',
                image: 'https://graphicsfamily.com/wp-content/uploads/edd/2022/01/Award-Certificate-Template-1536x1117.jpg',
              },
            },
          ],
        };

        setEnrollmentData(staticEnrollmentData);
        setCertificateData(staticCertificateData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const selectedCourse = enrollmentData[selectedCourseIndex];
  const selectedCertificate = certificateData?.certificates?.find(
    (cert) => cert.enrollment === selectedCourse?.course._id
  );

  const generatePDF = async () => {
    if (!selectedCertificate?.status?.image) return;

    try {
      const response = await fetch(selectedCertificate.status.image, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedCourse?.course?.name || 'Certificate'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      alert('Unable to download certificate. Please try again later.');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { class: 'bg-success bg-opacity-10 text-success', icon: CheckCircle, text: 'Completed' },
      enrolled: { class: 'bg-primary bg-opacity-10 text-primary', icon: Book, text: 'In Progress' },
      default: { class: 'bg-secondary bg-opacity-10 text-secondary', icon: Clock, text: 'Unknown' },
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

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5 text-danger">{error}</p>;

  // Stats
  const totalCourses = enrollmentData.length;
  const completedCourses = enrollmentData.filter((e) => e.status === 'completed').length;
  const inProgressCourses = enrollmentData.filter((e) => e.status === 'enrolled').length;

  return (
    <>
      

      <div className="container py-5">
        <h1 className="h2 fw-bold text-dark mb-4">Certificate Dashboard</h1>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center rounded-4 border-0">
              <Award size={40} className="text-danger mb-2" />
              <h3 className="fw-bold">{totalCourses}</h3>
              <p className="text-muted">Total Courses</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center rounded-4 border-0">
              <CheckCircle size={40} className="text-success mb-2" />
              <h3 className="fw-bold">{completedCourses}</h3>
              <p className="text-muted">Completed Courses</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center rounded-4 border-0">
              <Book size={40} className="text-primary mb-2" />
              <h3 className="fw-bold">{inProgressCourses}</h3>
              <p className="text-muted">In Progress</p>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        {enrollmentData.length > 1 && (
          <div className="mb-5">
            <label className="form-label fw-medium mb-2">Select Course:</label>
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

        {/* Selected Course Details */}
        {selectedCourse && (
          <div className="row g-4">
            {/* Course Card */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 d-flex flex-column align-items-center">
                  <img
                    src={selectedCourse.course.image}
                    alt={selectedCourse.course.name}
                    className="rounded shadow-sm mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                  <h3 className="fw-bold mb-2">{selectedCourse.course.name}</h3>
                  {getStatusBadge(selectedCourse.status)}
                  <p className="text-muted mt-2 text-center">{selectedCourse.course.description}</p>
                  <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
                    <span className="d-flex align-items-center text-muted">
                      <Book size={18} className="me-1" /> {selectedCourse.course.noOfLessons} Lessons
                    </span>
                    <span className="d-flex align-items-center text-muted">
                      <Clock size={18} className="me-1" /> {selectedCourse.course.duration} Months
                    </span>
                    <span className="d-flex align-items-center text-muted">
                      <Users size={18} className="me-1" /> {selectedCourse.course.noOfStudents}+ Students
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  {selectedCourse.status === 'completed' && selectedCertificate ? (
                    <>
                      <img
                        src={selectedCertificate.status.image}
                        alt="Certificate"
                        className="img-fluid rounded mb-3 border"
                      />
                      <button className="btn btn-danger d-flex align-items-center mx-auto" onClick={generatePDF}>
                        <Download size={20} className="me-2" /> Download Certificate
                      </button>
                    </>
                  ) : (
                    <>
                      <Award size={64} className="text-muted mb-3" />
                      <h5 className="fw-medium text-muted">Certificate Not Available</h5>
                      <p className="small text-muted">
                        {selectedCourse.status === 'enrolled'
                          ? 'Complete the course to receive your certificate'
                          : 'Certificate will be available upon course completion'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Certificates */}
        <div className="mt-5">
          <h3 className="fw-bold mb-4">Completed Certificates</h3>
          <div className="row g-4">
            {enrollmentData
              .filter((c) => c.status === 'completed')
              .map((course) => {
                const cert = certificateData?.certificates.find((c) => c.enrollment === course.course._id);
                return (
                  <div className="col-md-4" key={course.course._id}>
                    <div className="card shadow-sm border-0 h-100 text-center p-3">
                      <img
                        src={cert?.status.image}
                        alt={course.course.name}
                        className="img-fluid rounded mb-3 border"
                      />
                      <h5 className="fw-bold">{course.course.name}</h5>
                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => alert('Download logic here')}
                      >
                        <Download size={16} className="me-1" /> Download
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

    </>
  );
};

export default Certificate;
