import React, { useState } from 'react';
import { FiBook, FiChevronDown, FiChevronRight, FiMenu, FiX, FiCode, FiLayers, FiDatabase, FiPlay, FiClock, FiCalendar } from 'react-icons/fi';

const CourseModuleInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [expandedModules, setExpandedModules] = useState({
    'module-1': true,
    'module-2': false,
    'module-3': false
  });

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const modules = [
    {
      id: 'module-1',
      name: 'Introduction to Programming',
      icon: <FiCode className="text-blue-500" />,
      lessons: [
        {
          id: 'lesson-1-1',
          name: 'Programming Fundamentals',
          classes: [
            { 
              id: 'class-1-1-1', 
              name: 'Day 1: Variables & Data Types', 
              date: '2023-09-10',
              duration: '45 min',
              videoId: 'W6NZfCO5SIk' // JavaScript basics
            },
            { 
              id: 'class-1-1-2', 
              name: 'Day 2: Control Structures', 
              date: '2023-09-12',
              duration: '52 min',
              videoId: 'SydnKbGc7W8' // JavaScript control flow
            },
            { 
              id: 'class-1-1-3', 
              name: 'Day 3: Functions', 
              date: '2023-09-14',
              duration: '38 min',
              videoId: 'N8ap4k_1QEQ' // JavaScript functions
            }
          ]
        },
        {
          id: 'lesson-1-2',
          name: 'Object-Oriented Programming',
          classes: [
            { 
              id: 'class-1-2-1', 
              name: 'Day 1: Classes & Objects', 
              date: '2023-09-17',
              duration: '50 min',
              videoId: 'PFmuCDHHpwk' // OOP in JavaScript
            },
            { 
              id: 'class-1-2-2', 
              name: 'Day 2: Inheritance', 
              date: '2023-09-19',
              duration: '42 min',
              videoId: 'MfhBMcl2gco' // JavaScript prototypes
            }
          ]
        }
      ]
    },
    {
      id: 'module-2',
      name: 'Web Development',
      icon: <FiLayers className="text-green-500" />,
      lessons: [
        {
          id: 'lesson-2-1',
          name: 'HTML & CSS Basics',
          classes: [
            { 
              id: 'class-2-1-1', 
              name: 'Day 1: HTML Structure', 
              date: '2023-09-22',
              duration: '40 min',
              videoId: 'PlxWf493en4' // HTML tutorial
            },
            { 
              id: 'class-2-1-2', 
              name: 'Day 2: CSS Styling', 
              date: '2023-09-24',
              duration: '55 min',
              videoId: '1PnVor36_40' // CSS tutorial
            }
          ]
        },
        {
          id: 'lesson-2-2',
          name: 'JavaScript for Web',
          classes: [
            { 
              id: 'class-2-2-1', 
              name: 'Day 1: DOM Manipulation', 
              date: '2023-09-26',
              duration: '48 min',
              videoId: '0ik6X4DJKCc' // DOM manipulation
            }
          ]
        }
      ]
    },
    {
      id: 'module-3',
      name: 'Database Fundamentals',
      icon: <FiDatabase className="text-purple-500" />,
      lessons: [
        {
          id: 'lesson-3-1',
          name: 'SQL Basics',
          classes: [
            { 
              id: 'class-3-1-1', 
              name: 'Day 1: Database Design', 
              date: '2023-09-29',
              duration: '53 min',
              videoId: 'ztHopE5Wnpc' // SQL tutorial
            },
            { 
              id: 'class-3-1-2', 
              name: 'Day 2: Querying Data', 
              date: '2023-10-01',
              duration: '45 min',
              videoId: 'HXV3zeQKqGY' // SQL queries
            }
          ]
        }
      ]
    }
  ];

  const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Learning Platform</h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`
          lg:w-80 lg:flex-shrink-0 
          ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80' : 'hidden'}
          lg:relative lg:block bg-white border-r border-gray-200
        `}>
          <div className="h-full overflow-y-auto">
            {/* Sidebar Header */}
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-indigo-800">Course Modules</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded-md text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-4 space-y-3">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-3 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {module.icon}
                      <span className="font-medium text-gray-800">
                        {module.name}
                      </span>
                    </div>
                    {expandedModules[module.id] ?
                      <FiChevronDown className="h-4 w-4 text-gray-500" /> :
                      <FiChevronRight className="h-4 w-4 text-gray-500" />}
                  </button>

                  {expandedModules[module.id] && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center p-3 bg-indigo-50">
                            <span className="text-sm font-medium text-indigo-700">
                              {lesson.name}
                            </span>
                          </div>
                          <div>
                            {lesson.classes.map((classItem) => (
                              <button
                                key={classItem.id}
                                onClick={() => handleClassSelect(classItem)}
                                className={`w-full flex items-center p-3 text-left hover:bg-indigo-50 transition-colors ${selectedClass?.id === classItem.id ? 'bg-indigo-100' : ''}`}
                              >
                                <div className="ml-4 flex-1">
                                  <div className="flex items-center">
                                    <FiPlay className="h-3 w-3 text-indigo-600 mr-2" />
                                    <span className="text-sm text-gray-700">
                                      {classItem.name}
                                    </span>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {selectedClass ? (
              <div className="flex flex-col lg:flex-row h-full">
                {/* Video Player */}
                <div className="lg:w-2/3">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">{selectedClass.name}</h2>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <FiCalendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{selectedClass.date}</span>
                      <FiClock className="h-4 w-4 mr-1" />
                      <span>{selectedClass.duration}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedClass.videoId}`}
                        title={selectedClass.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 lg:h-96"
                      ></iframe>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">About this class</h3>
                      <p className="text-gray-600">
                        This class covers important concepts and techniques related to the topic. 
                        You'll learn practical skills that you can apply in real-world scenarios.
                        Make sure to take notes and try out the examples yourself.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Class List */}
                <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Class Contents</h3>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-96 lg:max-h-full">
                    {modules.flatMap(module => 
                      module.lessons.flatMap(lesson => 
                        lesson.classes.map(classItem => (
                          <button
                            key={classItem.id}
                            onClick={() => handleClassSelect(classItem)}
                            className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${selectedClass.id === classItem.id ? 'bg-indigo-100 border border-indigo-200' : 'hover:bg-gray-100'}`}
                          >
                            <div className="flex items-center">
                              <FiPlay className="h-3 w-3 text-indigo-600 mr-2" />
                              <span className="text-sm font-medium text-gray-700">{classItem.name}</span>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <span className="mr-3">{classItem.date}</span>
                              <span>{classItem.duration}</span>
                            </div>
                          </button>
                        ))
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <FiBook className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Learning Platform</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Select a class from the sidebar to start learning. Each module contains lessons with daily classes.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
                  {modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-center space-x-3 mb-3">
                        {module.icon}
                        <h3 className="font-semibold text-gray-800">{module.name}</h3>
                      </div>
                      <div className="text-left">
                        {module.lessons.slice(0, 2).map((lesson) => (
                          <div key={lesson.id} className="mb-3">
                            <h4 className="text-sm font-medium text-indigo-700 mb-1">{lesson.name}</h4>
                            <ul className="space-y-1">
                              {lesson.classes.slice(0, 2).map((classItem) => (
                                <li key={classItem.id} className="text-xs text-gray-600 flex items-center">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                  {classItem.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModuleInterface;