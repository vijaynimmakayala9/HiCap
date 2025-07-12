import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import IndustryExperts from "./IndustryExperts";
import AvailableCourses from "./AvailableCourses";
import GetInTouch from "./GetInTouch";
import SuccessStories from "./SuccessStories";
import Footer from "./Footer";
import EnrolledCourses from "./EnrolledCourses";
import RecommendedCourses from "./RecommendedCourses";
import TopPerformers from "./TopPerformers";
import YourStatistics from "./YourStatistics";
import LiveClasses from "./LiveClasses";
import CompletedClasses from "./CompletedClasses";
import Interviews from "./Interviews";
import Courses from "./Cources";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header />
      <Hero />

      {/* Before Login */}
      {!isLoggedIn && (
        <>
          <AboutUs />
          <IndustryExperts />
          <Courses />
          <GetInTouch />
          <SuccessStories />
        </>
      )}

      {/* After Login */}
      {isLoggedIn && (
        <>
          <EnrolledCourses />
          <LiveClasses />
          <CompletedClasses />
          <RecommendedCourses />
          <TopPerformers />
          <YourStatistics />
        </>
      )}

      <Footer />
    </>
  );
};

export default HomePage;
