import React, { useState, useEffect } from 'react';
import {
  FiBook, FiChevronDown, FiChevronRight, FiMenu, FiX,
  FiCode, FiLayers, FiDatabase, FiPlay, FiClock,
  FiCalendar, FiSearch, FiUser, FiDownload, FiFileText,
  FiVideo, FiImage, FiMusic, FiBox, FiLoader, FiEye
} from 'react-icons/fi';
import axios from "axios";
import Swal from "sweetalert2";

const CourseModuleInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notes, setNotes] = useState('');
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userId = user.id;
  console.log(userId)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://31.97.206.144:5001/api/course-modules/user/${userId}`);
        const data = await response.json();

        if (data.success) {
          // Transform API data to match our component structure
          const transformedCourses = data.data.map(course => ({
            id: course._id,
            name: course.enrolledId.batchName,
            instructor: course.mentorName,
            progress: 0,
            modules: course.modules.map(module => ({
              id: module._id,
              name: module.subjectName,
              icon: <FiCode className="textcolor" />,
              lessons: module.topics.flatMap(topic =>
                topic.lessons.map(lesson => ({
                  id: lesson._id,
                  name: lesson.name,
                  date: new Date(lesson.date).toISOString().split('T')[0],
                  duration: lesson.duration || '40 min',
                  videoId: lesson.videoId,
                  completed: false,
                  resources: lesson.resources ? lesson.resources.map(resource => ({
                    id: resource._id,
                    name: resource.name,
                    type: resource.file.split('.').pop(),
                    url: resource.file,
                    icon: <FiFileText className="textcolor" />,
                    isPdf: resource.file.includes('.pdf') || resource.name.toLowerCase().includes('pdf')
                  })) : []
                }))
              )
            }))
          }));

          setCoursesData(transformedCourses);
          if (transformedCourses.length > 0) {
            setSelectedCourse(transformedCourses[0].id);
          }
        } else {
          setError('Failed to fetch course data');
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError('User not found. Please log in again.');
      setLoading(false);
    }
  }, [userId]);

  const selectedCourseData = coursesData.find(c => c.id === selectedCourse);
  const modules = selectedCourseData?.modules || [];

  // Initialize expanded state for modules
  useEffect(() => {
    const initialExpandedState = {};
    modules.forEach(module => {
      initialExpandedState[module.id] = false;
    });
    setExpandedModules(initialExpandedState);
  }, [selectedCourse, coursesData]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };


  const handleDownload = async (url, filename = "document.pdf") => {
    try {
      const response = await axios.get(url, { responseType: "blob" });

      // Extract content type (fallback to PDF)
      const contentType = response.headers["content-type"] || "application/pdf";

      // Extract filename from headers if not given
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition && contentDisposition.includes("filename=")) {
        filename = contentDisposition.split("filename=")[1].replace(/['"]/g, "");
      }

      const blob = new Blob([response.data], { type: contentType });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire("Error", "Failed to download the file. Try again.", "error");
    }
  };



  const viewPdf = async (pdfUrl, pdfName) => {
    try {
      setLoading(true);

      // Directly use the URL for the iframe
      setCurrentPdf({ url: pdfUrl, name: pdfName });
      setPdfViewerOpen(true);
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Failed to load PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredModules = modules.map(module => {
    if (!searchTerm) return module;
    const filteredLessons = module.lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredLessons.length ? { ...module, lessons: filteredLessons } : null;
  }).filter(Boolean);

  const markAsCompleted = (classId) => {
    console.log(`Marked class ${classId} as completed`);
  };

  const saveNotes = () => {
    console.log('Notes saved:', notes);
  };

  if (loading && !pdfViewerOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FiX className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (coursesData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiBook className="h-8 w-8 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Courses Available</h2>
          <p className="text-gray-600">You are not enrolled in any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* PDF Viewer Modal */}
      {pdfViewerOpen && currentPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-6xl max-h-screen flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{currentPdf.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(currentPdf.url, currentPdf.name)}
                  className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"
                  disabled={downloading}
                >
                  {downloading ? (
                    <FiLoader className="h-5 w-5 animate-spin" />
                  ) : (
                    <FiDownload className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => setPdfViewerOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src={currentPdf.url}
                className="w-full h-full"
                title={currentPdf.name}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors mr-3"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Learning Platform</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search classes..."
              className="bg-transparent outline-none text-sm w-40 lg:w-56"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`lg:w-80 lg:flex-shrink-0 ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80' : 'hidden'} lg:relative lg:block bg-white border-r border-gray-200`}>
          <div className="h-full flex flex-col">
            <div className="bg-white px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Courses Dropdown */}
              <div className="mt-3">
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedCourse || ''}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {coursesData.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Search */}
              <div className="mt-3 lg:hidden flex items-center bg-white rounded-lg px-3 py-2 border">
                <FiSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredModules.length > 0 ? (
                filteredModules.map(module => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-3 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {module.icon}
                        <span className="font-medium text-gray-800">{module.name}</span>
                      </div>
                      {expandedModules[module.id] ? <FiChevronDown className="h-4 w-4 text-gray-500" /> : <FiChevronRight className="h-4 w-4 text-gray-500" />}
                    </button>

                    {expandedModules[module.id] && (
                      <div className="border-t border-gray-100 bg-gray-50 divide-y divide-gray-200">
                        {module.lessons.map((classItem, index) => (
                          <button
                            key={classItem.id}
                            onClick={() => handleClassSelect(classItem)}
                            className={`w-full flex items-center p-3 text-left hover:bg-indigo-50 transition-colors ${selectedClass?.id === classItem.id ? 'bg-indigo-100' : ''}`}
                          >
                            <div className="ml-4 flex-1">
                              <div className="flex items-center">
                                <FiPlay className="h-3 w-3 textcolor mr-2" />
                                <span className="text-sm text-black-700">{classItem.name}</span>
                                {classItem.completed && (
                                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Completed</span>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <FiCalendar className="h-3 w-3 mr-1 textcolor" />
                                <span className="mr-3">{classItem.date}</span>
                                <FiClock className="h-3 w-3 mr-1 textcolor" />
                                <span>{classItem.duration}</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No classes found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {selectedClass ? (
              <div className="flex flex-col h-full">
                {/* Video & Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">{selectedClass.name}</h2>
                      <div className="flex items-center mt-2 text-sm text-gray-600 flex-wrap gap-2">
                        <div className="flex items-center">
                          <FiCalendar className="h-4 w-4 mr-1 textcolor" />
                          <span>{selectedClass.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="h-4 w-4 mr-1 textcolor" />
                          <span>{selectedClass.duration}</span>
                        </div>
                      </div>
                    </div>
                    {/* <button
                      onClick={() => markAsCompleted(selectedClass.id)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedClass.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 transition-colors whitespace-nowrap`}
                    >
                      {selectedClass.completed ? 'Completed' : 'Mark as Complete'}
                    </button> */}
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 overflow-x-auto">
                  <div className="flex min-w-max">
                    {['content', 'resources'].map(tab => (
                      <button
                        key={tab}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'content' && (
                    <div>
                      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden mb-6">
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedClass.videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1`}
                          title={selectedClass.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96"
                        ></iframe>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">About this class</h3>
                        <p className="text-gray-600">Learn and practice concepts with real-world examples. Take notes and explore additional resources provided.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'resources' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Class Resources</h3>
                      {selectedClass.resources && selectedClass.resources.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedClass.resources.map(resource => (
                            <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center">
                                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                  {resource.icon}
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700 block">{resource.name}</span>
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                {resource.isPdf && (
                                  <button
                                    onClick={() => viewPdf(resource.url, resource.name)}
                                    className="text-blue-600 hover:text-blue-800 p-2"
                                    title="View PDF"
                                  >
                                    <FiEye className="h-4 w-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDownload(resource.url, resource.name)}
                                  className="text-indigo-600 hover:text-indigo-800 p-2"
                                  title="Download resource"
                                  disabled={downloading}
                                >
                                  {downloading ? (
                                    <FiLoader className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <FiDownload className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 py-4 text-center">No resources available for this class.</p>
                      )}
                    </div>
                  )}


                </div>
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <FiBook className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Learning Platform</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-6">Select a class from the sidebar to start learning.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModuleInterface;