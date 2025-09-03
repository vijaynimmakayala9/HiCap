import React, { useEffect, useState } from 'react';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LiveClassesPage = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Get user from session storage
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLiveClasses();
    setWeekStart(getWeekStart(new Date()));
  }, []);

  const fetchLiveClasses = async () => {
    try {
      if (!user || !user.id) {
        console.error('User not found in session storage');
        setLiveClasses([]);
        setLoading(false);
        return;
      }

      // Use the user-specific endpoint
      const res = await fetch(`http://31.97.206.144:5001/api/live-classes/user/${user.id}`);
      const data = await res.json();

      console.log('Live classes data:', data);

      if (data.success) {
        // Map API data to your card structure
        const mappedClasses = data.data.map((cls) => ({
          _id: cls._id,
          title: cls.className,
          description: cls.subjectName,
          mentorName: `${cls.mentorId?.firstName || 'Unknown'} ${cls.mentorId?.lastName || 'Mentor'}`,
          course: cls.enrollmentIdRef?.courseId?.name || 'General Course',
          timing: cls.date,
          duration: cls.enrollmentIdRef?.timings || '1 hour',
          meetLink: cls.link,
        }));
        setLiveClasses(mappedClasses);
      } else {
        console.error('Failed to fetch live classes:', data.message);
        setLiveClasses([]);
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
      // Fallback to general endpoint if user-specific fails
      try {
        const fallbackRes = await fetch('http://31.97.206.144:5001/api/liveclass');
        const fallbackData = await fallbackRes.json();

        if (fallbackData.success) {
          const mappedClasses = fallbackData.data.map((cls) => ({
            _id: cls._id,
            title: cls.className,
            description: cls.subjectName,
            mentorName: `${cls.mentorId?.firstName || 'Unknown'} ${cls.mentorId?.lastName || 'Mentor'}`,
            course: cls.enrollmentIdRef?.courseId?.name || 'General Course',
            timing: cls.date,
            duration: cls.enrollmentIdRef?.timings || '1 hour',
            meetLink: cls.link,
          }));
          setLiveClasses(mappedClasses);
        } else {
          setLiveClasses([]);
        }
      } catch (fallbackError) {
        console.error('Error fetching fallback live classes:', fallbackError);
        setLiveClasses([]);
      }
    } finally {
      setLoading(false);
    }
  };

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
    liveClasses.filter((cls) => {
      const classDate = new Date(cls.timing);
      return classDate.toDateString() === date.toDateString();
    });

  const formatDateTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
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

  // Check if class is currently live
  const isClassLive = (classTime) => {
    const now = new Date();
    const classDate = new Date(classTime);
    const endTime = new Date(classDate.getTime() + 60 * 60 * 1000); // Assuming 1 hour duration

    return now >= classDate && now <= endTime;
  };

  // Check if class is upcoming
  const isClassUpcoming = (classTime) => {
    return new Date(classTime) > new Date();
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
            const hasLiveClasses = dayClasses.some(cls => isClassLive(cls.timing));
            const hasUpcomingClasses = dayClasses.some(cls => isClassUpcoming(cls.timing));
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`position-relative flex-shrink-0 p-3 rounded-3 shadow-sm text-center ${isSelected ? 'bg-meroon text-white' : 'bg-light'
                  }`}
                style={{
                  minWidth: '120px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #dee2e6',
                  borderLeft: hasLiveClasses ? '4px solid #28a745' : hasUpcomingClasses ? '4px solid #ffc107' : '1px solid #dee2e6'
                }}
                onClick={() => setSelectedDate(day)}
              >
                {/* 🔴 Dot marker for today */}
                {isToday && (
                  <span
                    className="position-absolute top-2 end-2 translate-middle p-1 bg-warning border border-light rounded-circle"
                    title="Today"
                    style={{ transform: 'translate(50%, -50%)' }}
                  ></span>
                )}

                <div className="fw-bold">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="small">{day.getDate()}-{day.getMonth() + 1}</div>
                <div className="mt-2">
                  <span className={`badge ${isSelected ? 'bg-white text-dark' : 'bg-secondary'}`}>
                    {dayClasses.length} Class{dayClasses.length !== 1 ? 'es' : ''}
                  </span>
                </div>
                {hasLiveClasses && (
                  <div className="position-absolute top-0 end-0 m-1">
                    <span className="badge bg-success">Live</span>
                  </div>
                )}
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

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading your live classes...</p>
          </div>
        ) : filteredClasses(selectedDate).length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-camera-video-off text-muted" style={{ fontSize: '3rem' }}></i>
            <p className="text-muted fs-5 mt-3">No live classes scheduled for this day.</p>
            <p className="text-muted">Check back later or browse other days.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredClasses(selectedDate).map((cls) => {
              const isLive = isClassLive(cls.timing);
              const isUpcoming = isClassUpcoming(cls.timing);

              return (
                <div key={cls._id} className="col-12 col-sm-6 col-lg-4">
                  <div
                    className={`card h-100 shadow rounded-4 overflow-hidden border-0 ${isLive ? 'border-success border-2' : isUpcoming ? 'border-warning border-2' : ''
                      }`}
                    style={{
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,0.075)';
                    }}
                  >
                    <div className="card-header py-3 bg-light position-relative">
                      {isLive && (
                        <span className="position-absolute top-0 start-0 badge bg-success rounded-end-0">
                          LIVE NOW
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="position-absolute top-0 start-0 badge bg-warning text-dark rounded-end-0">
                          UPCOMING
                        </span>
                      )}
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
                        className={`btn mt-auto d-flex align-items-center justify-content-center gap-2 ${isLive ? 'btn-success' : isUpcoming ? 'btn-warning' : 'btn-primary'
                          }`}
                        disabled={!isLive && !isUpcoming}
                      >
                        {isLive ? 'Join Now' : isUpcoming ? 'Join Soon' : 'Class Ended'}
                        <MoveRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Additional information section */}
      {!loading && liveClasses.length > 0 && (
        <div className="alert alert-info mt-4">
          <h5 className="alert-heading">Need Help?</h5>
          <p className="mb-0">
            If you're having trouble joining a class or have any questions, please contact support at
            <strong> support@hicap.com</strong> or call <strong>+1-800-HICAP-HELP</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveClassesPage;