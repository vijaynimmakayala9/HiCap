import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlay, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Footer from '../Pages/Footer';
import Header from '../Pages/Header';

const CourseModule = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/courseModule');
        setCourses(res.data.data);

        // Initialize expanded state for all modules
        const initialExpanded = {};
        res.data.data.forEach((course, courseIndex) => {
          course.modules.forEach((module, moduleIndex) => {
            if (typeof module === 'object' && !Array.isArray(module)) {
              Object.keys(module).forEach(key => {
                if (key !== '_id') {
                  initialExpanded[`${courseIndex}-${moduleIndex}-${key}`] = false;
                }
              });
            }
          });
        });
        setExpandedModules(initialExpanded);

        // Automatically select the first available topic
        for (const course of res.data.data) {
          for (const module of course.modules) {
            const moduleKeys = Object.keys(module);
            for (const key of moduleKeys) {
              if (Array.isArray(module[key]) && module[key].length > 0) {
                setSelected({ ...module[key][0], name: module[key][0].topic });
                // Expand the first module by default
                setExpandedModules(prev => ({
                  ...prev,
                  [`0-0-${key}`]: true
                }));
                return;
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching course modules:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const toggleModule = (moduleKey) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  return (
    <>
      <Header />
      <div className="container-fluid my-md-5 my-3 pt-md-5 pt-3">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-bold mb-3" style={{ color: '#800000' }}>
              Course Section
            </h2>
            {/* <div
              className="rounded-pill mb-4"
              style={{ width: '200px', height: '3px', backgroundColor: '#800000' }}
            ></div> */}
            
            {/* Mobile Sidebar Toggle */}
            <button 
              className="btn btn-dark d-md-none mb-3"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? 'Hide Modules' : 'Show Modules'}
            </button>
          </div>

          {/* Sidebar - Hidden on mobile when not open */}
          <div className={`col-md-3 ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}>
            <div className="card mb-4 mb-md-0">
              <div className="card-header bg-dark text-white">Course Modules</div>
              <div className="card-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="mb-3">
                      <h5 className="d-flex align-items-center">
                        <button 
                          className="btn btn-sm btn-link p-0 me-2"
                          onClick={() => toggleModule(`course-${courseIndex}`)}
                        >
                          {expandedModules[`course-${courseIndex}`] ? 
                            <FiChevronDown /> : <FiChevronRight />}
                        </button>
                        {course?.course?.name || `Course ${courseIndex + 1}`}
                      </h5>

                      {expandedModules[`course-${courseIndex}`] && course.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="mb-2 ps-3">
                          {/* Handle object-style module (e.g., { module1: [...] }) */}
                          {typeof module === 'object' && !Array.isArray(module) && Object.keys(module).map((key, kIndex) => {
                            if (key === '_id') return null;

                            const value = module[key];
                            if (!Array.isArray(value)) return null;

                            const moduleKey = `${courseIndex}-${moduleIndex}-${key}`;
                            return (
                              <div key={kIndex} className="mb-2">
                                <div 
                                  className="d-flex align-items-center text-primary text-uppercase fw-bold"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => toggleModule(moduleKey)}
                                >
                                  {expandedModules[moduleKey] ? 
                                    <FiChevronDown className="me-1" /> : 
                                    <FiChevronRight className="me-1" />}
                                  {key}
                                </div>
                                {expandedModules[moduleKey] && (
                                  <ul className="list-group mt-2">
                                    {value.map((item, iIndex) => (
                                      <li
                                        key={iIndex}
                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selected?.link === item.link ? 'active' : ''}`}
                                        onClick={() => {
                                          setSelected({ ...item, name: item.topic });
                                          setSidebarOpen(false); // Close sidebar on mobile after selection
                                        }}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="d-flex align-items-center">
                                          <FiPlay className="me-2" />
                                          <span className="text-truncate">{item.topic}</span>
                                        </div>
                                        <span className="badge bg-info">{item.duration}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}

                          {/* Handle flat module object (e.g., { topic: "...", link: "..." }) */}
                          {Array.isArray(course.modules) && module?.topic && (
                            <ul className="list-group mt-2">
                              <li
                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selected?.link === module.link ? 'active' : ''}`}
                                onClick={() => {
                                  setSelected({ ...module, name: module.topic });
                                  setSidebarOpen(false); // Close sidebar on mobile after selection
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="d-flex align-items-center">
                                  <FiPlay className="me-2" />
                                  <span className="text-truncate">{module.topic}</span>
                                </div>
                                <span className="badge bg-info">{module.duration}</span>
                              </li>
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                {selected ? (
                  <>
                    <div className="ratio ratio-16x9 mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${selected.link || ''}?autoplay=1&mute=1`}
                        title={selected.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      ></iframe>
                    </div>
                    <h4 className="mb-3">{selected.name}</h4>
                    <div className="d-flex flex-wrap gap-3 mb-3">
                      <span className="badge bg-secondary">
                        <i className="bi bi-clock me-1"></i> {selected.duration}
                      </span>
                      <span className="badge bg-secondary">
                        <i className="bi bi-calendar me-1"></i> {new Date(selected.date).toLocaleDateString()}
                      </span>
                    </div>
                    {selected.description && (
                      <div className="mt-3">
                        <h5>Description</h5>
                        <p>{selected.description}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading course content...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseModule;