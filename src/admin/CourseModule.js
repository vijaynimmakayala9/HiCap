import React, { useState, useEffect } from 'react';
import {
  FiBook, FiChevronDown, FiChevronRight, FiMenu, FiX,
  FiCode, FiLayers, FiDatabase, FiPlay, FiClock,
  FiCalendar, FiSearch, FiUser, FiDownload, FiFileText,
  FiVideo, FiImage, FiMusic, FiBox
} from 'react-icons/fi';

// Mock data for multiple courses with resources
const COURSES_DATA = [
  {
    id: 'course-1',
    name: 'Full Stack JavaScript',
    instructor: 'Sarah Johnson',
    progress: 65,
    modules: [
      {
        id: 'module-1',
        name: 'Introduction to JS',
        icon: <FiCode className="text-blue-500" />,
        lessons: [
          { 
            id: 'class-1', 
            name: 'Variables & Data Types', 
            date: '2023-09-01', 
            duration: '40 min', 
            videoId: 'W6NZfCO5SIk', 
            completed: true,
            resources: [
              { id: 'res-1', name: 'JavaScript Basics Slides', type: 'pdf', url: '#', icon: <FiFileText className="text-red-500" /> },
              { id: 'res-2', name: 'Code Examples', type: 'zip', url: '#', icon: <FiBox className="text-purple-500" /> },
              { id: 'res-3', name: 'Reference Guide', type: 'doc', url: '#', icon: <FiFileText className="text-blue-500" /> }
            ]
          },
          { 
            id: 'class-2', 
            name: 'Functions & Scope', 
            date: '2023-09-02', 
            duration: '50 min', 
            videoId: 'N8ap4k_1QEQ', 
            completed: false,
            resources: [
              { id: 'res-4', name: 'Functions Cheat Sheet', type: 'pdf', url: '#', icon: <FiFileText className="text-red-500" /> }
            ]
          }
        ]
      },
      {
        id: 'module-2',
        name: 'React Basics',
        icon: <FiLayers className="text-green-500" />,
        lessons: [
          { 
            id: 'class-3', 
            name: 'Components & JSX', 
            date: '2023-09-05', 
            duration: '45 min', 
            videoId: '0ik6X4DJKCc', 
            completed: false,
            resources: [
              { id: 'res-5', name: 'React Setup Guide', type: 'pdf', url: '#', icon: <FiFileText className="text-red-500" /> },
              { id: 'res-6', name: 'Starter Project', type: 'zip', url: '#', icon: <FiBox className="text-purple-500" /> }
            ]
          },
          { 
            id: 'class-4', 
            name: 'State & Props', 
            date: '2023-09-06', 
            duration: '55 min', 
            videoId: '1PnVor36_40', 
            completed: false,
            resources: [
              { id: 'res-7', name: 'State Management Examples', type: 'zip', url: '#', icon: <FiBox className="text-purple-500" /> }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    name: 'React & Node JS',
    instructor: 'Michael Chen',
    progress: 30,
    modules: [
      {
        id: 'module-3',
        name: 'Node Basics',
        icon: <FiDatabase className="text-purple-500" />,
        lessons: [
          { 
            id: 'class-5', 
            name: 'Express Setup', 
            date: '2023-09-10', 
            duration: '40 min', 
            videoId: 'ztHopE5Wnpc', 
            completed: true,
            resources: [
              { id: 'res-8', name: 'Express Documentation', type: 'pdf', url: '#', icon: <FiFileText className="text-red-500" /> },
              { id: 'res-9', name: 'API Examples', type: 'zip', url: '#', icon: <FiBox className="text-purple-500" /> }
            ]
          },
          { 
            id: 'class-6', 
            name: 'Routing & Middleware', 
            date: '2023-09-11', 
            duration: '50 min', 
            videoId: 'HXV3zeQKqGY', 
            completed: false,
            resources: [
              { id: 'res-10', name: 'Middleware Guide', type: 'doc', url: '#', icon: <FiFileText className="text-blue-500" /> }
            ]
          }
        ]
      }
    ]
  }
];

const CourseModuleInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0].id);
  const [notes, setNotes] = useState('');

  const selectedCourseData = COURSES_DATA.find(c => c.id === selectedCourse);
  const modules = selectedCourseData?.modules || [];

  // Initialize expanded state for modules
  useEffect(() => {
    const initialExpandedState = {};
    modules.forEach(module => {
      initialExpandedState[module.id] = false;
    });
    setExpandedModules(initialExpandedState);
  }, [selectedCourse]);

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
  };

  const saveNotes = () => {
    console.log('Notes saved:', notes);
    // In a real app, this would save to a backend
  };

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
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {COURSES_DATA.map(course => (
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
                    {['content', 'resources', 'notes'].map(tab => (
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
                                  <span className="text-xs text-gray-500 uppercase">{resource.type}</span>
                                </div>
                              </div>
                              <a 
                                href={resource.url} 
                                className="text-indigo-600 hover:text-indigo-800 p-2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FiDownload className="h-4 w-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 py-4 text-center">No resources available for this class.</p>
                      )}
                    </div>
                  )}

                  {/* {activeTab === 'notes' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Notes</h3>
                      <textarea 
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="Add your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                      <div className="mt-3 flex justify-end">
                        <button 
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          onClick={saveNotes}
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  )} */}
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