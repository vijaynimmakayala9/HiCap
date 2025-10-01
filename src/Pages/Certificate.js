import React, { useState, useEffect } from 'react';
import { Download, Award, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from './Footer';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

  // Fetch certificates
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.techsterker.com/api/certificate/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch certificates');
        const data = await response.json();
        if (data.success) {
          setCertificates(data.data);

          // Fetch course details for each certificate
          const courseIds = data.data.map(c => c.enrolledId.courseId._id);
          const coursePromises = courseIds.map(id =>
            axios.get(`https://api.techsterker.com/api/coursecontroller/${id}`)
          );
          const courseResponses = await Promise.all(coursePromises);
          const courseData = {};
          courseResponses.forEach(res => {
            if (res.data.success) {
              courseData[res.data.data._id] = res.data.data;
            }
          });
          setCourses(courseData);
        } else {
          throw new Error('Unable to load certificate data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [userId]);

  // Download certificate file
  const downloadCertificate = async (url, name) => {
    if (!url) return;
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch certificate');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name || 'Certificate.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Unable to download certificate. Please try again later.');
      console.error(err);
    }
  };

  // Status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { class: 'bg-warning bg-opacity-10 text-warning', icon: Clock, text: 'Pending' },
      Completed: { class: 'bg-success bg-opacity-10 text-success', icon: CheckCircle, text: 'Completed' },
      default: { class: 'bg-secondary bg-opacity-10 text-secondary', icon: Award, text: 'Unknown' },
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

  if (loading) return <p className="text-center py-5">Loading certificates...</p>;
  if (error) return <p className="text-center py-5 text-danger">{error}</p>;

  return (
    <>
      <div className="container py-5">
        <h1 className="h2 fw-bold text-dark mb-4">Certificate Dashboard</h1>

        {certificates.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-white rounded-4 p-5 shadow-sm border">
              <h4 className="text-muted">No certificates available</h4>
              <p className="small text-muted">Complete your courses to receive certificates</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {certificates.map((cert) => {
              const course = courses[cert.enrolledId.courseId._id];
              const courseName = course ? course.name : cert.enrolledId.batchName;

              return (
                <div key={cert._id} className="col-lg-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-center">
                      <h5 className="fw-medium mb-2">{courseName}</h5>
                      <h6 className="fw-medium mb-3 text-muted">{course.category}</h6>

                      {cert.status === 'Completed' && cert.certificateFile ? (
                        <>
                          <div className="d-flex justify-content-center mb-3">
                            <img
                              src={cert.certificateFile}
                              alt="Certificate"
                              className="img-fluid rounded border"
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-danger d-flex align-items-center"
                              onClick={() =>
                                downloadCertificate(cert.certificateFile, `${courseName}-Certificate.png`)
                              }
                            >
                              <Download size={20} className="me-2" /> Download Certificate
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex justify-content-center mb-3">
                            <Award size={64} className="text-muted" />
                          </div>
                          <h6 className="fw-medium text-muted text-center">Certificate Not Available</h6>
                          <p className="small text-muted text-center">
                            {cert.status === 'Pending'
                              ? 'Certificate is being processed'
                              : 'Certificate will be available upon course completion'}
                          </p>
                        </>
                      )}


                      <div className="mt-2">{getStatusBadge(cert.status)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Certificate;
