import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContactUs from "./Pages/ContactUs";
import AboutSection from "./Pages/AboutSection";
import FAQ from "./Pages/FAQ";
import BlogPage from "./Pages/BlogPage";
import OurMentorsPage from "./Pages/OurMentorsPage";
import AvailableCourses from "./Pages/AvailableCourses";
import Courses from "./Pages/Courses";
import CourseDetail from "./Pages/CourseDetail";
import DoubtSession from "./Pages/DoubtSession";
import Certificate from "./Pages/Certificate";
import Interviews from "./Pages/Interviews";
import Clients from "./Pages/Clients";
import UpCommingBatches from "./components/UpCommingBatches";
import Dashboard from "./components/Dashboard";
import AdminCourses from "./admin/AdminCourses";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import the wrapper
import LiveClassesPage from "./components/LiveClassesPage";

function App() {
  return (
    <Routes>
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

      {/* 🔒 Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard/doubt-session" element={<PrivateRoute><DoubtSession /></PrivateRoute>} />
      <Route path="/dashboard/certificate" element={<PrivateRoute><Certificate /></PrivateRoute>} />
      <Route path="/dashboard/interviews" element={<PrivateRoute><Interviews /></PrivateRoute>} />
      <Route path="/dashboard/live-classes" element={<PrivateRoute><LiveClassesPage /></PrivateRoute>} />
      <Route path="/admin" element={<AdminCourses />} />
    </Routes>
  );
}

export default App;
