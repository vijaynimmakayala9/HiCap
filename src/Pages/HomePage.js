import React, { useState, useEffect } from "react";
import Header from "./Header";
import IndustryExperts from "./IndustryExperts";
import Footer from "./Footer";
import Course from "../components/course";
import CourseAndFeatures from "../components/CourseSection";
import Features from "../components/Features";
import DifferSection from "../components/differSection";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import Reviews from "../components/Reviews";
import MagnitiaCourses from '../components/magnitiaCourses'

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setIsLoggedIn(true);
    }

    // Fetch content for modal
    axios
      .get("https://hicap-backend-4rat.onrender.com/api/content")
      .then((res) => {
        if (res.data?.data?.length > 0) {
          setModalContent(res.data.data[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch modal content", err);
      });

    // Show modal after 1 second
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
          <MagnitiaCourses/>
          <Features />
          <Course />
          <DifferSection />
          <Reviews />
          <IndustryExperts />
        </>
      ) : (
        <>
          <Dashboard />
        </>
      )}

      <Footer />

      {/* Modal */}
      {showModal && modalContent && (
        <div
          className="modal d-block fade show"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded-4 border-0 overflow-hidden">
              <div className="modal-header text-dark">
                <h5 className="modal-title">{modalContent.title || "Welcome!"}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="p-2">
                <img
                  src={modalContent.image}
                  alt="Modal Visual"
                  className="img-fluid w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </div>

              <div className="modal-body text-center">
                <h5 className="mb-3 fw-bold">
                  {modalContent.heading || "Start Your Journey"}
                </h5>
                <p className="text-muted white-space-pre-line">
                  {modalContent.description || "Join now to explore more."}
                </p>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/contactus");
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
