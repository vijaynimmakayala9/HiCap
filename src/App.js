import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContactUs from "./Pages/ContactUs";
import AboutSection from "./Pages/AboutSection";
import FAQ from "./Pages/FAQ";
import BlogPage from "./Pages/BlogPage";
import OurMentorsPage from "./Pages/OurMentorsPage";
import AvailableCourses from "./Pages/AvailableCourses";
import Courses from "./Pages/Cources";
import CourseDetail from "./Pages/CourseDetail";
import DoubtSession from "./Pages/DoubtSession";
import Certificate from "./Pages/Certificate";
import Interviews from "./Pages/Interviews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/aboutus" element={<AboutSection />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/ourmentors" element={<OurMentorsPage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/doubtsession" element={<DoubtSession />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/course/:id" element={<CourseDetail />} />
    </Routes>
  );
}

export default App;
