import React, { useState } from "react";
import ContactUsModal from "./ContactUsModal"; // import the API-integrated ContactUsModal
import CourseEnquiryModal from "../components/EnrollModal";

const StickyContactButtons = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  
  return (
    <>
      <div
        className="position-fixed d-flex flex-column align-items-end"
        style={{ right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1050 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setHoveredIcon(null);
        }}
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
              height: 'auto',
              cursor: 'pointer'
            }}
          >
            ENQUIRY NOW
          </div>
        )}

        {/* Expanded Icons */}
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
              onClick={() => {
                setShowContactModal(true);
                setIsExpanded(false);
              }}
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
              onClick={() => {
                setShowEnquiryModal(true);
                setIsExpanded(false);
              }}
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

      {/* Contact Modal */}
      <ContactUsModal show={showContactModal} onHide={() => setShowContactModal(false)} />
      <CourseEnquiryModal
        show={showEnquiryModal}
        handleClose={() => setShowEnquiryModal(false)}
      />
    </>
  );
};

export default StickyContactButtons;
