import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlay, FiLock } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../Pages/Footer';
import Header from '../Pages/Header';

const CourseModule = () => {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const courseId = 'YOUR_COURSE_ID'; // Replace with actual course ID or get from URL params

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`https://hicap-backend-4rat.onrender.com/api/course1/${courseId}`);
        setCourse(courseResponse.data);

        // Fetch modules for the course
        const modulesResponse = await axios.get(`https://hicap-backend-4rat.onrender.com/api/modules?courseId=${courseId}`);
        setModules(modulesResponse.data);

        // Fetch user's completed videos (replace with actual endpoint)
        const completedResponse = await axios.get(`https://hicap-backend-4rat.onrender.com/api/user-progress`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCompletedVideos(completedResponse.data.completedVideos || []);

        // Set first video as selected by default
        if (modulesResponse.data.length > 0 && modulesResponse.data[0].videos.length > 0) {
          setSelectedVideo(modulesResponse.data[0].videos[0]);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const markAsCompleted = async (videoId) => {
    try {
      await axios.post(`https://hicap-backend-4rat.onrender.com/api/mark-completed`, {
        videoId,
        courseId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCompletedVideos([...completedVideos, videoId]);
    } catch (error) {
      console.error('Error marking video as completed:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className='mt-5'>
    <div className="container-fluid py-5 my-5">
      <div className="row">
        {/* Left sidebar - Modules list */}
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{course?.name || 'Course Modules'}</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {modules.map((module, index) => (
                  <div key={module._id} className="module-section">
                    <div className="list-group-item bg-light fw-bold">
                      Module {index + 1}: {module.name}
                    </div>
                    {module.videos.map((video) => (
                      <button
                        key={video._id}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedVideo?._id === video._id ? 'active' : ''}`}
                        onClick={() => handleVideoSelect(video)}
                      >
                        <div className="d-flex align-items-center">
                          <FiPlay className="me-2" />
                          <span>{video.title}</span>
                        </div>
                        {completedVideos.includes(video._id) ? (
                          <BsCheckCircleFill className="text-success" />
                        ) : (
                          <span className="badge bg-secondary">New</span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Video player and details */}
        <div className="col-lg-9 col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-0">
              {/* YouTube-style video player */}
              <div className="ratio ratio-16x9">
                {selectedVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="d-flex justify-content-center align-items-center bg-dark text-white h-100">
                    <div className="text-center">
                      <FiPlay size={48} />
                      <p className="mt-2">Select a video to play</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video details and actions */}
          {selectedVideo && (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h4>{selectedVideo.title}</h4>
                  {!completedVideos.includes(selectedVideo._id) && (
                    <button
                      className="btn btn-primary"
                      onClick={() => markAsCompleted(selectedVideo._id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-info me-2">
                    {selectedVideo.duration} min
                  </span>
                  {completedVideos.includes(selectedVideo._id) && (
                    <span className="badge bg-success">
                      <BsCheckCircleFill className="me-1" />
                      Completed
                    </span>
                  )}
                </div>
                <p>{selectedVideo.description}</p>

                {/* Resources section */}
                <div className="mt-4">
                  <h5>Resources</h5>
                  <ul className="list-group">
                    {selectedVideo.resources?.map((resource, index) => (
                      <li key={index} className="list-group-item">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation between videos */}
      {selectedVideo && (
        <div className="row mt-4">
          <div className="col-6">
            <button className="btn btn-outline-primary w-100">
              Previous Video
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary w-100">
              Next Video
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default CourseModule;