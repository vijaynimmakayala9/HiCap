import React, { useState, useEffect } from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";

const CalendarSection = () => {
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
  );
};

export default CalendarSection;