import React, { useEffect, useState } from 'react';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const mockLiveClasses = [
  { _id: '1', title: 'React Basics', description: 'Intro to React', mentorName: 'John Doe', course: 'React JS', timing: '2025-08-28T10:00:00', duration: '1h 30m', meetLink: '#' },
  { _id: '2', title: 'Advanced CSS', description: 'Flexbox & Grid', mentorName: 'Jane Smith', course: 'CSS Mastery', timing: '2025-08-28T14:00:00', duration: '2h', meetLink: '#' },
  { _id: '3', title: 'Node.js Fundamentals', description: 'Server-side JS', mentorName: 'Alice Johnson', course: 'Node JS', timing: '2025-08-29T11:00:00', duration: '1h 45m', meetLink: '#' },
  { _id: '4', title: 'Python for Data Science', description: 'Pandas, NumPy, Matplotlib', mentorName: 'Bob Brown', course: 'Python DS', timing: '2025-08-30T09:30:00', duration: '2h', meetLink: '#' },
];

const LiveClassesPage = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date());

  useEffect(() => {
    setLiveClasses(mockLiveClasses);
    setWeekStart(getWeekStart(new Date()));
  }, []);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
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

  const filteredClasses = (date) =>
    liveClasses.filter((cls) => new Date(cls.timing).toDateString() === date.toDateString());

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  };

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

  return (
    <div className="container py-5">

      {/* Page Heading */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Live Classes</h1>
        <p className="text-muted fs-5">Attend live interactive sessions and enhance your skills</p>
      </div>

      {/* Week Carousel */}
      <h4 className="mb-3">This Week</h4>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <button className="btn btn-outline-secondary" onClick={handlePrevWeek}>
          <FaChevronLeft />
        </button>
        <div className="d-flex overflow-auto gap-3 flex-grow-1 pb-3">
          {weekDays.map((day, index) => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const dayClasses = filteredClasses(day);

            return (
              <div
                key={index}
                className={`position-relative flex-shrink-0 p-3 rounded-3 shadow-sm text-center ${isSelected ? 'bg-primary text-white' : 'bg-light'}`}
                style={{ minWidth: '120px', cursor: 'pointer', transition: 'all 0.3s ease', border: '1px solid #dee2e6' }}
                onClick={() => setSelectedDate(day)}
              >
                <div className="fw-bold">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="small">{day.getDate()}-{day.getMonth() + 1}</div>
                <div className="mt-2">
                  <span className={`badge ${isSelected ? 'bg-white text-dark' : 'bg-secondary'}`}>
                    {dayClasses.length} Class{dayClasses.length !== 1 ? 'es' : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-outline-secondary" onClick={handleNextWeek}>
          <FaChevronRight />
        </button>
      </div>

      {/* Classes for selected day */}
      <section className="py-4">
        <h4 className="mb-4">
          Classes for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h4>

        {filteredClasses(selectedDate).length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fs-5">No live classes scheduled for this day.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredClasses(selectedDate).map((cls) => (
              <div key={cls._id} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="card h-100 shadow rounded-4 overflow-hidden border-0"
                  style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div className="card-header py-3 bg-light">
                    <h5 className="card-title mb-0 fw-bold">{cls.title}</h5>
                  </div>
                  <div className="card-body d-flex flex-column bg-white">
                    <p className="text-dark mb-3">{cls.description}</p>
                    <div className="mb-2"><strong>Mentor:</strong> {cls.mentorName}</div>
                    <div className="mb-2"><strong>Course:</strong> {cls.course}</div>
                    <div className="mb-3"><strong>Timing:</strong> {formatDateTime(cls.timing)}</div>
                    <div className="d-flex justify-content-between mb-3 flex-wrap">
                      <div className="d-flex align-items-center mb-2 mb-sm-0">
                        <MdOutlineTimer size={20} className="me-2" />
                        <small>{cls.duration}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <SiGoogleclassroom size={20} className="me-2" />
                        <small>Live Class</small>
                      </div>
                    </div>
                    <a
                      href={cls.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-auto d-flex align-items-center justify-content-center gap-2"
                    >
                      Join Now <MoveRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default LiveClassesPage;
