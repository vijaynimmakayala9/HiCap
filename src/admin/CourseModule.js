import React, { useEffect, useState } from 'react';
import { FiPlay, FiChevronDown, FiChevronRight, FiClock, FiCalendar, FiMenu, FiX, FiMonitor } from 'react-icons/fi';

const CourseModule = () => {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Simulating API call with sample data
        const sampleData = {
          data: [
            {
              course: { name: "Web Development Fundamentals" },
              modules: [
                {
                  "HTML Basics": [
                    { topic: "Introduction to HTML", link: "dQw4w9WgXcQ", duration: "15:30", date: "2024-01-15", description: "Learn the basics of HTML structure and elements." },
                    { topic: "HTML Forms", link: "dQw4w9WgXcQ", duration: "20:45", date: "2024-01-16", description: "Master HTML form creation and validation." }
                  ],
                  "CSS Styling": [
                    { topic: "CSS Fundamentals", link: "dQw4w9WgXcQ", duration: "25:15", date: "2024-01-17", description: "Understanding CSS selectors and properties." },
                    { topic: "Responsive Design", link: "dQw4w9WgXcQ", duration: "30:20", date: "2024-01-18", description: "Creating responsive layouts with CSS." }
                  ]
                }
              ]
            },
            {
              course: { name: "JavaScript Programming" },
              modules: [
                {
                  "JavaScript Basics": [
                    { topic: "Variables and Functions", link: "dQw4w9WgXcQ", duration: "18:40", date: "2024-01-20", description: "Learn JavaScript variables and function declarations." },
                    { topic: "DOM Manipulation", link: "dQw4w9WgXcQ", duration: "22:15", date: "2024-01-21", description: "Master DOM selection and manipulation techniques." }
                  ]
                }
              ]
            }
          ]
        };
        
        setCourses(sampleData.data);

        // Initialize expanded state for all modules
        const initialExpanded = {};
        sampleData.data.forEach((course, courseIndex) => {
          initialExpanded[`course-${courseIndex}`] = courseIndex === 0; // Expand first course by default
          course.modules.forEach((module, moduleIndex) => {
            if (typeof module === 'object' && !Array.isArray(module)) {
              Object.keys(module).forEach(key => {
                if (key !== '_id') {
                  initialExpanded[`${courseIndex}-${moduleIndex}-${key}`] = courseIndex === 0 && moduleIndex === 0 && key === Object.keys(module)[0];
                }
              });
            }
          });
        });
        setExpandedModules(initialExpanded);

        // Automatically select the first available topic
        for (const course of sampleData.data) {
          for (const module of course.modules) {
            const moduleKeys = Object.keys(module);
            for (const key of moduleKeys) {
              if (Array.isArray(module[key]) && module[key].length > 0) {
                setSelected({ ...module[key][0], name: module[key][0].topic });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Modern Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FiMonitor className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Learning Hub</h1>
                <p className="text-sm text-gray-500">Master new skills</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
            >
              {sidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Mobile Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          )}
          
          {/* Sidebar */}
          <div className={`
            lg:w-80 lg:flex-shrink-0 
            ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80' : 'hidden'}
            lg:relative lg:block
          `}>
            <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Course Modules</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1 rounded-md text-white hover:bg-white hover:bg-opacity-20 transition-colors"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="h-full overflow-y-auto pb-20 lg:pb-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-sm text-gray-500">Loading modules...</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <button
                          onClick={() => toggleModule(`course-${courseIndex}`)}
                          className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                          <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {course?.course?.name || `Course ${courseIndex + 1}`}
                          </h3>
                          {expandedModules[`course-${courseIndex}`] ? 
                            <FiChevronDown className="h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors" /> : 
                            <FiChevronRight className="h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors" />}
                        </button>

                        {expandedModules[`course-${courseIndex}`] && (
                          <div className="mt-3 ml-4 space-y-3">
                            {course.modules.map((module, moduleIndex) => (
                              <div key={moduleIndex}>
                                {typeof module === 'object' && !Array.isArray(module) && Object.keys(module).map((key, kIndex) => {
                                  if (key === '_id') return null;

                                  const value = module[key];
                                  if (!Array.isArray(value)) return null;

                                  const moduleKey = `${courseIndex}-${moduleIndex}-${key}`;
                                  return (
                                    <div key={kIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                                      <button
                                        onClick={() => toggleModule(moduleKey)}
                                        className="w-full flex items-center justify-between p-3 text-left bg-white hover:bg-indigo-50 transition-colors group"
                                      >
                                        <span className="font-medium text-sm text-indigo-700 uppercase tracking-wide group-hover:text-indigo-800">
                                          {key}
                                        </span>
                                        {expandedModules[moduleKey] ? 
                                          <FiChevronDown className="h-3 w-3 text-indigo-600" /> : 
                                          <FiChevronRight className="h-3 w-3 text-indigo-600" />}
                                      </button>
                                      
                                      {expandedModules[moduleKey] && (
                                        <div className="border-t border-gray-100">
                                          {value.map((item, iIndex) => (
                                            <button
                                              key={iIndex}
                                              onClick={() => {
                                                setSelected({ ...item, name: item.topic });
                                                setSidebarOpen(false);
                                              }}
                                              className={`w-full flex items-center justify-between p-3 text-left hover:bg-indigo-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                                                selected?.link === item.link ? 'bg-indigo-100 border-indigo-200' : ''
                                              }`}
                                            >
                                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                <FiPlay className={`h-3 w-3 flex-shrink-0 ${
                                                  selected?.link === item.link ? 'text-indigo-600' : 'text-gray-400'
                                                }`} />
                                                <span className={`text-sm truncate ${
                                                  selected?.link === item.link ? 'text-indigo-800 font-medium' : 'text-gray-700'
                                                }`}>
                                                  {item.topic}
                                                </span>
                                              </div>
                                              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full flex-shrink-0">
                                                {item.duration}
                                              </span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {selected ? (
                <>
                  {/* Video Container */}
                  <div className="relative">
                    <div className="aspect-video bg-black rounded-t-xl overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${selected.link || ''}?autoplay=0&mute=0`}
                        title={selected.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 break-words">
                          {selected.name}
                        </h1>
                        
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                            <FiClock className="h-4 w-4" />
                            <span>{selected.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                            <FiCalendar className="h-4 w-4" />
                            <span>{new Date(selected.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selected.description && (
                      <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{selected.description}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 lg:p-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Course Content</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Please wait while we prepare your learning materials...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;