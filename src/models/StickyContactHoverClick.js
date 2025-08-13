import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const RequestCallModal = ({ show, onHide }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3">
          <div className="modal-header">
            <h5 className="modal-title">Request Call</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <input type="tel" className="form-control" placeholder="Your Phone Number" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Message (optional)" rows="3"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onHide}>Request Call</button>
            <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactUsModal = ({ show, onHide }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3">
          <div className="modal-header">
            <h5 className="modal-title">Contact Us</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Subject" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Your Message" rows="4"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onHide}>Send Message</button>
            <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StickyContactButtons = () => {
  const [showCallModal, setShowCallModal] = useState(false);
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

        {/* Expanded Icons */}
        {isExpanded && (
          <div className="d-flex flex-column bg-danger" style={{ borderBottomLeftRadius: '5px' }}>
            {/* Request Call */}
            <div
              className="position-relative"
              style={{
                backgroundColor: hoveredIcon === 'call' ? '#b92d3b' : '#ad2132',
                padding: '12px 15px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setShowCallModal(true);
                setIsExpanded(false);
              }}
              onMouseEnter={() => setHoveredIcon('call')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Phone size={20} color="white" />
              {hoveredIcon === 'call' && (
                <span
                  className="position-absolute end-100 me-2 bg-dark text-white px-2 py-1 rounded small"
                  style={{ top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}
                >
                  Request Call
                </span>
              )}
            </div>

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
              <Mail size={20} color="white" />
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

      {/* Modals */}
      <RequestCallModal show={showCallModal} onHide={() => setShowCallModal(false)} />
      <ContactUsModal show={showContactModal} onHide={() => setShowContactModal(false)} />
    </>
  );
};

export default StickyContactButtons;
