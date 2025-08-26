import React, { useState } from "react";
import ContactUsModal from "./ContactUsModal"; // import the API-integrated ContactUsModal

const StickyContactButtons = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

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

        {/* Expanded Icon */}
        {isExpanded && (
          <div className="d-flex flex-column bg-danger" style={{ borderBottomLeftRadius: '5px' }}>
            {/* Contact Us */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === 'contact' ? '#b92d3b' : '#ad2132',
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
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactUsModal show={showContactModal} onHide={() => setShowContactModal(false)} />
    </>
  );
};

export default StickyContactButtons;
