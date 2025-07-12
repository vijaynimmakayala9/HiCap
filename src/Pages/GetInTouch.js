import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const GetInTouch = () => {
  return (
    <section className="container-fluid py-5">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">
          {/* Left Section - Contact Info */}
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <h1 className="fw-bold display-5 mb-4 mb-lg-5">
                Get in Touch with us!
              </h1>

              <div className="d-flex flex-column gap-4">
                {/* Phone */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                    style={{ width: '50px', height: '50px', minWidth: '50px' }}
                  >
                    <FaPhoneAlt />
                  </div>
                  <span className="fw-medium fs-5">+91 98765 43210</span>
                </div>

                {/* Email */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                    style={{ width: '50px', height: '50px', minWidth: '50px' }}
                  >
                    <FaEnvelope />
                  </div>
                  <span className="fw-medium fs-5">contact@example.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="col-lg-6">
            <div
              className="bg-success text-white rounded-3 p-3 p-md-4 h-100"
            >
              <h2 className="fw-bold fs-3 mb-3  text-light px-3 py-2 rounded-3 d-inline-block">
                Sign Up for Free Resources
              </h2>

              {/* Form */}
              <form className="mt-3 mt-md-4">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control form-control-lg rounded-2"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control form-control-lg rounded-2"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="form-control form-control-lg rounded-2"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Description"
                    rows={3}
                    className="form-control form-control-lg rounded-2"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-light  fw-semibold px-4 py-2 rounded-2 w-100"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;