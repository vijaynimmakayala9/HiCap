import React, { useState, useRef, useEffect } from "react";
import ContactUsModal from "./ContactUsModal";
import CourseEnquiryModal from "../components/EnrollModal";

const StickyContactButtons = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const closeTimer = useRef(null);

  const enterZone = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsExpanded(true);
  };

  const leaveZone = () => {
    // small delay to prevent flicker when moving between items/tooltips
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredIcon(null);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Mobile/touch toggle
  const handleTouchToggle = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsExpanded((v) => !v);
  };

  return (
    <>
      <div
        className="position-fixed d-flex flex-column align-items-end"
        style={{ right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1050 }}
        onMouseEnter={enterZone}
        onMouseLeave={leaveZone}
        onTouchStart={handleTouchToggle}
      >
        {/* Main Vertical Enquiry Button (shown when collapsed) */}
        {!isExpanded && (
          <div
            className="bg-danger text-white fw-bold text-center"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              padding: "15px 5px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              fontSize: "0.9rem",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
            onMouseEnter={enterZone}
            onClick={handleTouchToggle}
          >
            ENQUIRY
          </div>
        )}

        {/* Expanded Buttons */}
        {isExpanded && (
          <div
            className="d-flex flex-column bg-danger"
            style={{ borderBottomLeftRadius: "5px" }}
            onMouseEnter={enterZone}
            onMouseLeave={leaveZone}
          >
            {/* Contact Us */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === "contact" ? "#b92d3b" : "#a51d34",
                padding: "12px 15px",
                borderBottomLeftRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShowContactModal(true)}
              onMouseEnter={() => {
                enterZone();
                setHoveredIcon("contact");
              }}
              onMouseLeave={() => {
                setHoveredIcon(null);
                leaveZone();
              }}
            >
              <span className="text-white fw-bold">Contact Us</span>
              {hoveredIcon === "contact" && (
                <span
                  className="position-absolute end-100 me-2 bg-dark text-white px-2 py-1 rounded small"
                  style={{ top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}
                  onMouseEnter={enterZone}
                  onMouseLeave={leaveZone}
                >
                  Contact Us
                </span>
              )}
            </div>

            {/* Enroll Now */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === "enroll" ? "#b92d3b" : "#a51d34",
                padding: "12px 15px",
                borderBottomLeftRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShowEnquiryModal(true)}
              onMouseEnter={() => {
                enterZone();
                setHoveredIcon("enroll");
              }}
              onMouseLeave={() => {
                setHoveredIcon(null);
                leaveZone();
              }}
            >
              <span className="text-white fw-bold">Enroll Now</span>
              {hoveredIcon === "enroll" && (
                <span
                  className="position-absolute end-100 me-2 bg-dark text-white px-2 py-1 rounded small"
                  style={{ top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}
                  onMouseEnter={enterZone}
                  onMouseLeave={leaveZone}
                >
                  Enroll Now
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ContactUsModal show={showContactModal} onHide={() => setShowContactModal(false)} />
      <CourseEnquiryModal show={showEnquiryModal} handleClose={() => setShowEnquiryModal(false)} />
    </>
  );
};

export default StickyContactButtons;
