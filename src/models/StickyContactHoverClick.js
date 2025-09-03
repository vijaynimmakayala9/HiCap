import React, { useState, useRef } from "react";
import ContactUsModal from "./ContactUsModal"; 
import CourseEnquiryModal from "../components/EnrollModal";

const StickyContactButtons = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const containerRef = useRef(null);
  let timeoutId = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredIcon(null);
    }, 200); // small delay to prevent flicker
  };

  return (
    <>
      <div
        ref={containerRef}
        className="position-fixed d-flex flex-column align-items-end"
        style={{ right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1050 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Vertical Enquiry Button */}
        {!isExpanded && (
          <div
            className="bg-danger text-white fw-bold text-center"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              padding: '15px 5px',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}
          >
            ENQUIRY NOW
          </div>
        )}

        {/* Expanded Buttons */}
        {isExpanded && (
          <div className="d-flex flex-column bg-danger" style={{ borderBottomLeftRadius: '5px' }}>
            {/* Contact Us */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === 'contact' ? '#b92d3b' : '#a51d34',
                padding: '12px 15px',
                borderBottomLeftRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => setShowContactModal(true)}
              onMouseEnter={() => setHoveredIcon('contact')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <span className="text-white fw-bold">Contact Us</span>
              {hoveredIcon === 'contact' && (
                <span
                  className="position-absolute end-100 me-2 bg-dark text-white px-2 py-1 rounded small"
                  style={{ top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
                >
                  Contact Us
                </span>
              )}
            </div>

            {/* Enroll Now */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === 'enroll' ? '#b92d3b' : '#a51d34',
                padding: '12px 15px',
                borderBottomLeftRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => setShowEnquiryModal(true)}
              onMouseEnter={() => setHoveredIcon('enroll')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <span className="text-white fw-bold">Enroll Now</span>
              {hoveredIcon === 'enroll' && (
                <span
                  className="position-absolute end-100 me-2 bg-dark text-white px-2 py-1 rounded small"
                  style={{ top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
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
