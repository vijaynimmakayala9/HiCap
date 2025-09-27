import React from "react";
import { Col, Card } from "react-bootstrap";

const AttendanceSection = () => {
  // 🔹 Static demo attendance data
  const attendanceData = [
    { course: "Data Science", attended: 0, total: 25, color: "#ff6b6b" },
    { course: "Data Science", attended: 0, total: 22, color: "#6a0572" },
  ];

  return (
    <Col xl={12} lg={12} md={12} className="mb-4">
      <Card
        className="h-100 shadow-sm border-0"
        style={{ backgroundColor: "#ffebee" }}
      >
        <Card.Body className="p-3 p-md-4">
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <div
              className="bg-info p-2 rounded me-3 d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-calendar-check text-white fs-4"></i>
            </div>
            <Card.Title className="h5 fw-semibold text-info mb-0">
              Attendance
            </Card.Title>
          </div>

          {/* Attendance Circles */}
          <div className="row g-3 justify-content-center">
            {attendanceData.map((item, idx) => {
              const percentage = Math.round((item.attended / item.total) * 100);

              return (
                <div
                  className="col-6 col-sm-6 d-flex justify-content-center"
                  key={idx}
                >
                  <div className="text-center">
                    <div
                      className="circular-progress position-relative mb-2"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <svg
                        className="position-absolute top-0 start-0"
                        width="100"
                        height="100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#e6e6e6"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke={item.color}
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={2 * Math.PI * 45}
                          strokeDashoffset={
                            2 * Math.PI * 45 * (1 - percentage / 100)
                          }
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <strong className="text-dark">{item.attended}</strong>/
                        {item.total}
                      </div>
                    </div>
                    <p className="text-dark fw-medium mb-1">{item.course}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
      <style>{`.circular-progress svg { transform: rotate(-90deg); }`}</style>
    </Col>
  );
};

export default AttendanceSection;
