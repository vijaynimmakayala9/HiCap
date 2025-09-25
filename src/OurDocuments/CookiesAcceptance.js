import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CookieAcceptance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already accepted cookies
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      // Slight delay before showing for smooth rise effect
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowPolicies(false); // close modal after click
  };

  return (
    <>
      {/* Cookie Banner */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-[9999] bg-meroon text-gray-800 p-4 md:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4
          transform transition-transform duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
      >
        <p className="text-sm md:text-base max-w-xl">
          This website uses cookies to ensure secure login, improve learning services, and analyse site performance. By clicking “Accept,” you agree to our use of cookies in accordance with our{" "}
          <a
            href="/cookiepolicy"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Cookie Policy
          </a>.
          You can manage your preferences in your browser settings.
        </p>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={handleAccept}
            className="bg-white hover:bg-gray-100 text-black text-sm md:text-base font-semibold px-4 py-2 rounded-md transition"
          >
            Accept
          </button>

          <button
            onClick={() => setShowPolicies(true)}
            className="bg-gray-200 hover:bg-gray-300 text-black text-sm md:text-base font-semibold px-4 py-2 rounded-md transition"
          >
            View Policies
          </button>
        </div>
      </div>

      {/* Modal for Policies */}
      {showPolicies && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            <h2 className="text-lg font-bold mb-4">Our Policies</h2>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavigate("/privacypolicy")}
                className="text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigate("/termsofuse")}
                className="text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                Terms and Conditions
              </button>
              <button
                onClick={() => handleNavigate("/refundpolicy")}
                className="text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                Refund Policy
              </button>
              <button
                onClick={() => handleNavigate("/cookiepolicy")}
                className="text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                Cookie Policy
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPolicies(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieAcceptance;
