import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LiveClasses = () => {
  const scrollRef = useRef(null);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/liveclasses');
        if (res.data.success) {
          setLiveClasses(res.data.data);
        } else {
          setError('Failed to load live classes');
        }
      } catch (err) {
        setError('An error occurred while fetching live classes.');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  return (
    <section className="container py-5 position-relative">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-2">Live Classes</h2>
        <div
          style={{
            width: '180px',
            height: '3px',
            backgroundColor: '#007860',
            borderRadius: '999px',
          }}
        />
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll(-320)}
        className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-3 d-none d-md-flex shadow"
        style={{ borderRadius: '50%' }}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll(320)}
        className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-3 d-none d-md-flex shadow"
        style={{ borderRadius: '50%' }}
      >
        <FaChevronRight />
      </button>

      {/* Content */}
      {loading ? (
        <p>Loading live classes...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : liveClasses.length === 0 ? (
        <p>No live classes available.</p>
      ) : (
        <div
          ref={scrollRef}
          className="d-flex overflow-auto gap-4 py-2 px-2"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
        >
          {liveClasses.map((cls) => (
            <div key={cls._id} className="flex-shrink-0" style={{ width: '300px' }}>
              <div className="card h-100 shadow rounded-4 p-3 d-flex flex-column justify-content-between">
                <div className="mb-3">
                  <h5 className="fw-bold text-dark mb-1">{cls.title}</h5>
                  <p className="text-muted mb-2">{cls.description}</p>
                  <small className="text-secondary">
                    <strong>Mentor:</strong> {cls.mentorName}
                  </small>
                  <br />
                  <small className="text-secondary">
                    <strong>Course:</strong> {cls.course}
                  </small>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div
                    className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                    style={{ width: '48%', borderColor: '#00000022' }}
                  >
                    <MdOutlineTimer size={24} color="#007860" />
                    <small className="fw-medium mt-1">{cls.duration}</small>
                  </div>

                  <div
                    className="bg-light border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                    style={{ width: '48%', borderColor: '#00000022' }}
                  >
                    <SiGoogleclassroom size={24} color="#007860" />
                    <small className="fw-medium mt-1">Live</small>
                  </div>
                </div>

                <button className='btn btn-md btn-primary'><a
                  href={cls.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-white d-flex align-items-center justify-content-center gap-2"

                >
                  Join Now <MoveRight size={20} />
                </a></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LiveClasses;
