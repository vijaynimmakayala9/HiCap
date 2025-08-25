import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContactUs from "./Pages/ContactUs";
import AboutSection from "./Pages/AboutSection";
import FAQ from "./Pages/FAQ";
import BlogPage from "./Pages/BlogPage";
import OurMentorsPage from "./Pages/OurMentorsPage";
import Courses from "./Pages/Courses";
import CourseDetail from "./Pages/CourseDetail";
import DoubtSession from "./Pages/DoubtSession";
import Certificate from "./Pages/Certificate";
import Interviews from "./Pages/Interviews";
import Clients from "./Pages/Clients";
import UpCommingBatches from "./components/UpCommingBatches";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import LiveClassesPage from "./components/LiveClassesPage";
import CourseModule from "./admin/CourseModule";
import StickyContactButtons from "./models/StickyContactHoverClick";
import ResumeBuilding from "./services/ResumeBuild";
import MockInterviews from "./services/MockInterviews";
import PlacementAssistance from "./services/PlacementsAssistance";
import OnetoOneSession from "./services/OnetoOneAssistance";
import ProjectAssistance from "./services/Project Assistance";
import RealTimeAssistance from "./services/RealTimeAssistance";
import CoursesByCategory from "./newone/CoursesbyCategory";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setIsAuthenticated(!!user?.token); // Using optional chaining
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check error:", error);
        setIsAuthenticated(false);
      }
    };

    // Check auth on initial load and when route changes
    checkAuth();

    // Listen for storage changes (from other tabs)
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]); // Re-run when route changes

  // Debugging - log auth status and user data
  useEffect(() => {
    console.log("Current auth status:", isAuthenticated);
    console.log("User data:", sessionStorage.getItem("user"));
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutSection />} />
        <Route path="/upcommingbatches" element={<UpCommingBatches />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ourmentors" element={<OurMentorsPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/resumebuilding" element={<ResumeBuilding />} />
        <Route path="/mockinterviews" element={<MockInterviews />} />
        <Route path="/projectassistance" element={<ProjectAssistance />} />
        <Route path="/realtimeassistance" element={<RealTimeAssistance />} />
        <Route path="/placements" element={<PlacementAssistance />} />
        <Route path="/onetoone" element={<OnetoOneSession />} />
        <Route path="/allcourses" element={<CoursesByCategory />} />
        <Route path="/" element={<HomePage />} />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/doubt-session"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DoubtSession />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/certificate"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Certificate />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/interviews"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Interviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/live-classes"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <LiveClassesPage />
            </PrivateRoute>
          }
        />
        <Route path="/coursemodule" element={<CourseModule />} />
      </Routes>

      {/* Only show if not authenticated AND not on these pages */}
      {!isAuthenticated && !['/contactus', '/dashboard'].includes(location.pathname) && (
        <StickyContactButtons />
      )}
    </>
  );
}

export default App;