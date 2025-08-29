import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import LiveClasses from "./components/LiveClassesPage";
import CourseModule from "./admin/CourseModule";
import StickyContactButtons from "./models/StickyContactHoverClick";
import ResumeBuilding from "./services/ResumeBuild";
import MockInterviews from "./services/MockInterviews";
import PlacementAssistance from "./services/PlacementsAssistance";
import OnetoOneSession from "./services/OnetoOneAssistance";
import ProjectAssistance from "./services/Project Assistance";
import RealTimeAssistance from "./services/RealTimeAssistance";
import CoursesByCategory from "./newone/CoursesbyCategory";
import UserLayout from "./Header/UserLayout"; // User sidebar layout

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Check login status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setIsAuthenticated(!!user?.token);
          setUser(user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />
        } />
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

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <UserLayout user={user} onLogout={handleLogout} />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />                {/* /dashboard */}
          <Route path="interviews" element={<Interviews />} />  {/* /dashboard/interviews */}
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="coursemodule" element={<CourseModule />} />
          <Route path="doubt-session" element={<DoubtSession />} />
          <Route path="certificate" element={<Certificate />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Sticky contact button for non-authenticated users */}
      {!isAuthenticated && !['/contactus', '/aboutus', '/faqs'].includes(location.pathname) && (
        <StickyContactButtons />
      )}
    </>
  );
}

export default App;
