import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import CourseEnquiryModal from "./EnrollModal";
import { useNavigate } from "react-router-dom";
import { FaRegClock, FaCode } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userName = "Angela Della";
  const enrolledCourses = 5;
  const todaysClasses = 2;

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://hicap-backend-4rat.onrender.com/api/coursecontroller");
      setRecommendedCourses(response.data.data || response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setRecommendedCourses([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // mock occasions for calendar
  const mockOccasions = [
    { date: "2025-08-28", title: "Math Exam", type: "Exam", time: "10:00 AM", location: "Room 101" },
    { date: "2025-08-28", title: "Science Quiz", type: "Quiz", time: "2:00 PM", location: "Room 102" },
    { date: "2025-08-29", title: "Parent Meeting", type: "Meeting", time: "11:00 AM", location: "Hall A" },
    { date: "2025-08-30", title: "History Exam", type: "Exam", time: "9:30 AM", location: "Room 103" },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date());

  useEffect(() => {
    setWeekStart(getWeekStart(new Date()));
  }, []);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0=Sun
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    return monday;
  };

  const getWeekDays = (start) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(weekStart);

  const todaysOccasions = mockOccasions.filter(
    (occ) => new Date(occ.date).toDateString() === selectedDate.toDateString()
  );

  const handlePrevWeek = () => {
    const prevWeek = new Date(weekStart);
    prevWeek.setDate(weekStart.getDate() - 7);
    setWeekStart(prevWeek);
    setSelectedDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStart);
    nextWeek.setDate(weekStart.getDate() + 7);
    setWeekStart(nextWeek);
    setSelectedDate(nextWeek);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatWeekday = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <Container fluid className="min-vh-100 bg-light p-3 p-md-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-3 p-3" style={{ backgroundColor: "#e3f2fd" }}>
            <h5 className="text-primary fw-semibold mb-1">Welcome</h5>
            <p className="text-secondary mb-0">{userName}</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-3 p-3" style={{ backgroundColor: "#e8f5e9" }}>
            <h6 className="text-muted mb-1">Enrolled Courses</h6>
            <h3 className="fw-bold text-success mb-0">{enrolledCourses}</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="shadow-sm border-0 rounded-3 p-3"
            style={{ backgroundColor: "#fff3e0" }}
            onClick={() => navigate("/dashboard/live-classes")}
          >
            <h6 className="text-muted mb-1">Classes Today</h6>
            <h3 className="fw-bold text-warning mb-0">{todaysClasses}</h3>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Attendance Section */}
        <Col xl={6} lg={6} md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#ffebee' }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info p-2 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-calendar-check text-white fs-4"></i>
                </div>
                <Card.Title className="h5 fw-semibold text-info mb-0">Attendance</Card.Title>
              </div>

              <Row className="g-3 justify-content-center">
                {[{ name: "UI/UX Design", attended: 24, total: 30, color: "#ff6b6b" },
                { name: "Web Development", attended: 20, total: 25, color: "#4ecdc4" },
                { name: "Data Structures", attended: 18, total: 22, color: "#ffd166" },
                { name: "Database Systems", attended: 22, total: 28, color: "#6a0572" }].map((course, idx) => {
                  const percentage = Math.round((course.attended / course.total) * 100);
                  return (
                    <Col xs={6} sm={6} key={idx} className="d-flex justify-content-center">
                      <div className="text-center">
                        <div className="circular-progress position-relative mb-2" style={{ width: "100px", height: "100px" }}>
                          <svg className="position-absolute top-0 start-0" width="100" height="100">
                            <circle cx="50" cy="50" r="45" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke={course.color} strokeWidth="10" fill="none"
                              strokeDasharray={2 * Math.PI * 45}
                              strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)" />
                          </svg>
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <strong className="text-dark">{course.attended}</strong>/{course.total}
                          </div>
                        </div>
                        <p className="text-dark fw-medium mb-1">{course.name}</p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
          <style>{`.circular-progress svg { transform: rotate(-90deg); }`}</style>
        </Col>

        {/* Enrolled Courses */}
        <Col xl={6} lg={6} md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#e8f5e9' }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success p-2 rounded me-3">
                  <i className="bi bi-journal-bookmark text-white fs-4"></i>
                </div>
                <Card.Title className="h5 fw-semibold text-success mb-0">Enrolled Courses</Card.Title>
              </div>
              <Row className="g-3">
                {[{ name: "UI/UX Design", status: "Ongoing", progress: 80, instructor: "Prof. Smith" },
                { name: "Web Development", status: "Completed", progress: 100, instructor: "Dr. Johnson" },
                { name: "Data Structures", status: "Ongoing", progress: 65, instructor: "Prof. Williams" },
                { name: "Database Systems", status: "Upcoming", progress: 0, instructor: "Dr. Brown" }].map((course, idx) => (
                  <Col xl={6} lg={6} md={12} sm={12} xs={12} key={idx}>
                    <Card className="shadow-sm border-0 h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <p className="text-dark fw-medium mb-0">{course.name}</p>
                          <Badge bg={course.status === "Completed" ? "success" : course.status === "Ongoing" ? "primary" : "info"} className="px-2">{course.status}</Badge>
                        </div>
                        <p className="text-secondary small mb-2">Instructor: {course.instructor}</p>
                        {course.status !== "Upcoming" && (
                          <>
                            <div className="progress mb-2" style={{ height: "8px" }}>
                              <div className={`progress-bar ${course.status === "Completed" ? "bg-success" : "bg-primary"}`} role="progressbar" style={{ width: `${course.progress}%` }}></div>
                            </div>
                            <p className="text-secondary small mb-0">{course.progress}% completed</p>
                          </>
                        )}
                        {course.status === "Upcoming" && <p className="text-secondary small mb-0">Starting next week</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Student Details */}
        <Col xl={6} lg={6} md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#e3f2fd' }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info p-2 rounded me-3">
                  <i className="bi bi-person-circle text-white fs-4"></i>
                </div>
                <Card.Title className="h5 fw-semibold text-info mb-0">Student Details</Card.Title>
              </div>
              <div className="d-grid gap-3">
                {[{ icon: "bi-person-badge", label: "Student ID", value: "STU-2023-001" },
                { icon: "bi-building", label: "Department", value: "Computer Science" },
                { icon: "bi-book", label: "Semester", value: "4th" },
                { icon: "bi-telephone", label: "Contact", value: "angela@example.com" },
                { icon: "bi-calendar", label: "Joining Date", value: "Jan 15, 2023" },
                { icon: "bi-award", label: "Current GPA", value: "3.8" }].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center p-2 bg-white rounded shadow-sm">
                    <div className="bg-light p-2 rounded me-3">
                      <i className={`${item.icon} text-info`}></i>
                    </div>
                    <div>
                      <p className="text-secondary small mb-0">{item.label}</p>
                      <p className="text-dark fw-medium mb-0">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>


        {/* Calendar Section - Responsive */}
        <Col xl={6} lg={6} md={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#f3e5f5' }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-purple p-2 rounded me-3" style={{ backgroundColor: '#9c27b0' }}>
                  <i className="bi bi-calendar-event text-white fs-4"></i>
                </div>
                <Card.Title className="h5 fw-semibold text-purple mb-0" style={{ color: '#7b1fa2' }}>
                  Calendar
                </Card.Title>
              </div>

              {/* Week Navigation */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Button variant="outline-primary" size="sm" onClick={handlePrevWeek}>
                  &lt; Prev Week
                </Button>
                <span className="fw-medium text-primary">
                  {weekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline-primary" size="sm" onClick={handleNextWeek}>
                  Next Week &gt;
                </Button>
              </div>

              {/* Week Carousel - Responsive */}
              <div className="d-flex overflow-auto gap-2 mb-3 pb-2" style={{ scrollbarWidth: 'thin' }}>
                {weekDays.map((day, idx) => {
                  const isSelected = day.toDateString() === selectedDate.toDateString();
                  const isToday = day.toDateString() === new Date().toDateString();
                  const dayOccasions = mockOccasions.filter(
                    (occ) => new Date(occ.date).toDateString() === day.toDateString()
                  );

                  return (
                    <div
                      key={idx}
                      className={`flex-shrink-0 p-2 rounded-3 text-center ${isSelected ? 'bg-primary text-white' : isToday ? 'border-warning bg-light' : 'bg-light'}`}
                      style={{
                        minWidth: '70px',
                        cursor: 'pointer',
                        border: isToday ? '2px solid #ff9800' : '1px solid #dee2e6'
                      }}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="fw-bold small">{formatWeekday(day)}</div>
                      <div className={`small ${isSelected ? 'text-white' : 'text-muted'}`}>{formatDate(day)}</div>
                      <div className="mt-1">
                        {dayOccasions.length > 0 ? (
                          <Badge
                            bg={isSelected ? 'light' : 'success'}
                            text={isSelected ? 'dark' : ''}
                            className="small"
                            style={{ fontSize: '0.6rem' }}
                          >
                            {dayOccasions.length}
                          </Badge>
                        ) : (
                          <Badge bg="secondary" className="small" style={{ fontSize: '0.6rem' }}>0</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Date Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-primary mb-0">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h6>
                <Badge bg="light" text="dark" className="small">
                  {todaysOccasions.length} event{todaysOccasions.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Occasions List */}
              {todaysOccasions.length > 0 ? (
                <div className="d-grid gap-2">
                  {todaysOccasions.map((occ, idx) => (
                    <Card
                      key={idx}
                      className={`shadow-sm border-0 ${occ.type === 'Exam' ? 'border-start border-danger border-3' : occ.type === 'Quiz' ? 'border-start border-warning border-3' : 'border-start border-info border-3'}`}
                    >
                      <Card.Body className="p-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-dark fw-medium small">{occ.title}</span>
                          <Badge
                            bg={occ.type === 'Exam' ? 'danger' : occ.type === 'Quiz' ? 'warning' : 'info'}
                            className="text-capitalize small"
                          >
                            {occ.type}
                          </Badge>
                        </div>
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mt-2 gap-1 gap-sm-0">
                          <small className="text-secondary">
                            <i className="bi bi-clock me-1"></i>{occ.time}
                          </small>
                          <small className="text-secondary">
                            <i className="bi bi-geo-alt me-1"></i>{occ.location}
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="shadow-sm border-0 text-center py-4">
                  <Card.Body className="p-3">
                    <i className="bi bi-calendar-x text-secondary fs-1"></i>
                    <p className="text-secondary mt-2 mb-0">No occasions scheduled for today.</p>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Recommended Courses (Tailwind style like Course component) */}
        <Col xl={12} lg={12} md={12} className="mb-4">
          <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: "#fffde7", borderRadius: "12px" }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-warning p-2 rounded me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-lightbulb text-white fs-4"></i>
                </div>
                <Card.Title className="h5 fw-semibold text-warning mb-0">Recommended Courses</Card.Title>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-5">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : Array.isArray(recommendedCourses) && recommendedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
                  {recommendedCourses.slice(0, 4).map(
                    ({ _id, name, logoImage, category, duration, mode, description }) => (
                      <div
                        key={_id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 p-5 flex flex-col justify-between border border-gray-100 hover:scale-[1.02]"
                      >
                        {/* Top Section */}
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-3">
                          <img
                            src={logoImage}
                            alt={name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                              {name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">{category}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 flex-grow line-clamp-3">
                          {description}
                        </p>

                        {/* Course Details */}
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 my-4 gap-4 flex-wrap">
                          <div className="flex items-center">
                            <FaRegClock className="mr-1 sm:mr-2 text-yellow-600" />
                            <span>{duration}</span>
                          </div>
                          <div className="flex items-center">
                            <FaCode className="mr-1 sm:mr-2 text-yellow-600" />
                            <span>{mode}</span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-3">
                          <button
                            className="flex-1 py-2 px-4 rounded-md border border-yellow-400 font-medium text-yellow-700 hover:bg-yellow-100 transition-colors text-sm sm:text-base"
                            onClick={() => handleViewDetails(_id)}
                          >
                            View Details
                          </button>
                          <button
                            className="flex-1 py-2 px-4 rounded-md text-white font-medium bg-yellow-500 hover:bg-yellow-600 transition-colors text-sm sm:text-base"
                            onClick={() => setShowModal(true)}
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

              ) : (
                <p className="text-center text-gray-700">No courses available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Enroll Modal */}
      <CourseEnquiryModal show={showModal} handleClose={() => setShowModal(false)} prefillCourse={selectedCourse} />
    </Container>
  );
};

export default Dashboard;
