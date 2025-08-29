import React, { useState, useEffect } from 'react';
import {
  FiBook, FiChevronDown, FiChevronRight, FiMenu, FiX,
  FiCode, FiLayers, FiDatabase, FiPlay, FiClock,
  FiCalendar, FiSearch, FiUser, FiDownload, FiFileText,
  FiVideo, FiImage, FiMusic, FiBox, FiLoader
} from 'react-icons/fi';

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

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userId = user.id;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://hicap-backend-4rat.onrender.com/api/course-modules/user/${userId}`);
        const data = await response.json();

        if (data.success) {
          // Transform API data to match our component structure
          const transformedCourses = data.data.map(course => ({
            id: course._id,
            name: course.courseId.name,
            instructor: course.mentorName,
            progress: 0, // You might want to calculate this based on user progress
            modules: course.modules.map(module => ({
              id: module._id,
              name: module.moduleName,
              icon: <FiCode className="text-blue-500" />, // Default icon
              lessons: module.topics.flatMap(topic =>
                topic.lessons.map(lesson => ({
                  id: lesson._id,
                  name: lesson.name,
                  date: new Date(lesson.date).toISOString().split('T')[0],
                  duration: '40 min', // Default duration
                  videoId: lesson.videoId,
                  completed: false, // You might want to track this from user data
                  resources: lesson.resources ? lesson.resources.map(resource => ({
                    id: resource._id,
                    name: resource.name,
                    type: resource.file.split('.').pop(),
                    url: resource.file,
                    icon: <FiFileText className="text-red-500" />
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

    fetchData();
  }, []);

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

  const filteredModules = modules.map(module => {
    if (!searchTerm) return module;
    const filteredLessons = module.lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredLessons.length ? { ...module, lessons: filteredLessons } : null;
  }).filter(Boolean);

  const markAsCompleted = (classId) => {
    console.log(`Marked class ${classId} as completed`);
    // In a real app, this would update the backend
  };

  const saveNotes = () => {
    console.log('Notes saved:', notes);
    // In a real app, this would save to a backend
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      // Show loading state
      console.log(`Downloading ${fileName}...`);

      // For Cloudinary files, we need to handle the download properly
      // Cloudinary URLs can be modified to force download
      const downloadUrl = fileUrl.includes('cloudinary.com')
        ? fileUrl.replace('/upload/', '/upload/fl_attachment/')
        : fileUrl;

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName || 'resource');
      link.setAttribute('target', '_blank');

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Download started for ${fileName}`);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab if download fails
      window.open(fileUrl, '_blank');
    }
  };

  if (loading) {
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
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <FiUser className="h-5 w-5 text-gray-600" />
          </button>
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
                                <FiPlay className="h-3 w-3 text-indigo-600 mr-2" />
                                <span className="text-sm text-gray-700">{classItem.name}</span>
                                {classItem.completed && (
                                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Completed</span>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <FiCalendar className="h-3 w-3 mr-1" />
                                <span className="mr-3">{classItem.date}</span>
                                <FiClock className="h-3 w-3 mr-1" />
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
                          <FiCalendar className="h-4 w-4 mr-1" />
                          <span>{selectedClass.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="h-4 w-4 mr-1" />
                          <span>{selectedClass.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => markAsCompleted(selectedClass.id)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedClass.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 transition-colors whitespace-nowrap`}
                    >
                      {selectedClass.completed ? 'Completed' : 'Mark as Complete'}
                    </button>
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
                          src={`https://www.youtube.com/embed/${selectedClass.videoId}`}
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
                                  {/* <span className="text-xs text-gray-500 uppercase">{resource.type}</span> */}
                                </div>
                              </div>
                              <button
                                onClick={() => handleDownload(resource.url, resource.name)}
                                className="text-indigo-600 hover:text-indigo-800 p-2"
                                title="Download resource"
                              >
                                <FiDownload className="h-4 w-4" />
                              </button>
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