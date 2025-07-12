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
import Course from "../components/course";
import CourseAndFeatures from "../components/CourseSection";
import MagnitiaCourses from "../components/magnitiaCourses";
import Features from "../components/Features";
import DifferSection from "../components/differSection";
import BatchAndAlumniSection from "../components/batchandreview";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setIsLoggedIn(true);
    }

    // Show modal 1 second after page loads
    setTimeout(() => setShowModal(true), 1000);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      

      {!isLoggedIn ? (
        <>
          <CourseAndFeatures />
          <MagnitiaCourses />
          <Features />
          <AboutUs />
          <Course />
          <DifferSection />
          <BatchAndAlumniSection />
          <GetInTouch />
          <IndustryExperts />
        </>
      ) : (
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

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal d-block fade show"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={handleCloseModal}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content rounded-4 border-0 overflow-hidden">
              {/* Header */}
              <div className="modal-header  text-dark">
                <h5 className="modal-title">Welcome to Magnitia!</h5>
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="p-2">
                {/* Image */}
                <img
                  src="https://magnitia.com/images/Magnitia-up-coming-batches-july-09.jpg"
                  alt="Welcome Banner"
                  className="img-fluid w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />

              </div>

              {/* Body */}
              <div className="modal-body text-center">
                <h5 className="mb-3 fw-bold">Start your learning journey today!</h5>
                <p className="text-muted">
                  Join the best courses curated by top industry experts and get
                  certified. Limited seats available.
                </p>
              </div>

              {/* Footer */}
              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={() => {

                    window.scrollTo({ top: 0, behavior: "smooth" });
                    // Optionally navigate to courses section
                    navigate('/courses');
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
