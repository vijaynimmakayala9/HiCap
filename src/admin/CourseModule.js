import React, { useState } from 'react';
import { FiBook, FiChevronDown, FiChevronRight, FiMenu, FiX, FiCode, FiLayers, FiDatabase } from 'react-icons/fi';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

const CourseModuleInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({
    'module-v': true,
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
      id: 'module-v',
      name: 'MODULE V',
      icon: <FiCode className="text-blue-500" />,
      topics: [
        { id: 'v-1', name: 'Introduction to Programming' },
        { id: 'v-2', name: 'Variables and Data Types' },
        { id: 'v-3', name: 'Control Structures' },
        { id: 'v-4', name: 'Functions and Modules' }
      ]
    },
    {
      id: 'module-2',
      name: 'MODULE 2 X',
      icon: <FiLayers className="text-green-500" />,
      topics: [
        { id: '2-1', name: 'Advanced Concepts' },
        { id: '2-2', name: 'Data Structures' },
        { id: '2-3', name: 'Algorithms' }
      ]
    },
    {
      id: 'module-3',
      name: 'MODULE 3 X',
      icon: <FiDatabase className="text-purple-500" />,
      topics: [
        { id: '3-1', name: 'Database Fundamentals' },
        { id: '3-2', name: 'SQL Queries' },
        { id: '3-3', name: 'Database Design' }
      ]
    }
  ];

  return (
    <>
    <Header/>
      <div className="main-content bg-gray-50 flex flex-col">


        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Sidebar - Mobile Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div className={`
          lg:w-64 lg:flex-shrink-0 
          ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden'}
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
              <div className="p-4 space-y-2">
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
                        {module.topics.map((topic) => (
                          <button
                            key={topic.id}
                            className="w-full flex items-center p-3 text-left hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-sm text-gray-700 ml-7">
                              {topic.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <FiBook className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CODESENAME</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Select a module from the sidebar to view its content and start learning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      {module.icon}
                      <h3 className="font-semibold text-gray-800">{module.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {module.topics.slice(0, 3).map((topic) => (
                        <li key={topic.id} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {topic.name}
                        </li>
                      ))}
                      {module.topics.length > 3 && (
                        <li className="text-sm text-indigo-600">+{module.topics.length - 3} more topics</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer/>
    </>
  );
};

export default CourseModuleInterface;