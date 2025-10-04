import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaIdBadge, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, setShowLoginModal, onLogin }) => {
  const [loginData, setLoginData] = useState({ userId: "", generatedPassword: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("https://api.techsterker.com/api/userlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: loginData.userId,
          generatedPassword: loginData.generatedPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowLoginModal(false);
        const userData = result.data;
        onLogin({
          id: userData._id,
          name: userData.name,
          userId: userData.userId,
          email: userData.email,
          token: userData.token,
        });
        navigate("/dashboard");
      } else {
        setLoginError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-[480px] p-6 sm:p-6 md:p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[#a51d34] text-xl md:text-2xl font-semibold">Login</h4>
          <button
            onClick={() => setShowLoginModal(false)}
            className="text-xl md:text-2xl cursor-pointer hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Error Message */}
        {loginError && (
          <div className="p-2 mb-3 sm:mb-4 bg-[#f8d7da] text-[#721c24] rounded text-sm sm:text-base">
            {loginError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit}>
          {/* User ID */}
          <div className="mb-3 sm:mb-4 md:mb-5 relative">
            <FaIdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-base sm:text-lg md:text-xl" />
            <input
              type="text"
              name="userId"
              value={loginData.userId}
              onChange={handleLoginChange}
              placeholder="User ID"
              required
              className="w-full py-2 sm:py-2.5 md:py-3 pl-10 pr-3 border border-gray-300 rounded-md text-sm sm:text-base md:text-lg focus:border-[#a51d34] focus:outline-none focus:ring-1 focus:ring-[#a51d34] transition-colors"
            />
          </div>

          {/* Generated Password */}
          <div className="mb-3 sm:mb-4 md:mb-5 relative">
            <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-base sm:text-lg md:text-xl" />
            <input
              type="password"
              name="generatedPassword"
              value={loginData.generatedPassword}
              onChange={handleLoginChange}
              placeholder="Generated Password"
              required
              className="w-full py-2 sm:py-2.5 md:py-3 pl-10 pr-3 border border-gray-300 rounded-md text-sm sm:text-base md:text-lg focus:border-[#a51d34] focus:outline-none focus:ring-1 focus:ring-[#a51d34] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full py-2 sm:py-2.5 md:py-3 bg-gradient-to-br from-[#a51d34] to-[#d32f2f] text-white rounded-md font-semibold text-sm sm:text-base md:text-lg cursor-pointer hover:opacity-90 transition-opacity ${
              isLoggingIn ? "opacity-80" : ""
            }`}
          >
            {isLoggingIn ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 rounded-full border-t-white animate-spin mr-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
