import React, { useEffect, useRef } from 'react';
import { MoveRight } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';

const mockLiveClasses = [
  {
    id: 1,
    title: 'UI/UX Live Session',
    description: 'Join our daily UI/UX design bootcamp to build real-world projects.',
    duration: '1 Hour daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Full Stack Live Training',
    description: 'Hands-on coding with MERN stack — Build real-time apps.',
    duration: '2 Hours daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Digital Marketing Live Session',
    description: 'Master SEO, SEM, and content strategy with live case studies.',
    duration: '1.5 Hours daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Live practical sessions with projects and datasets.',
    duration: '1 Hour daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'React.js Bootcamp',
    description: 'Learn to build scalable React apps with hooks, context, and routing.',
    duration: '1.5 Hours daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Cloud Computing with AWS',
    description: 'Explore AWS cloud solutions and hands-on labs in live sessions.',
    duration: '2 Hours daily',
    status: 'Ongoing Classes',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  },
];


const LiveClasses = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });

        // Reset scroll when reaching end
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth - 10
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container py-5">
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

      {/* Scrollable Card Row */}
      <div
        ref={scrollRef}
        className="d-flex overflow-auto gap-4 py-2"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
      >
        {mockLiveClasses.map((cls) => (
          <div key={cls.id} className="flex-shrink-0" style={{ width: '300px' }}>
            <div className="card h-100 shadow rounded-4 overflow-hidden">
              <img
                src={cls.image}
                alt={cls.title}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between gap-3">
                <h5 className="card-title fw-bold text-dark">{cls.title}</h5>
                <p className="card-text text-muted">{cls.description}</p>

                <div className="d-flex justify-content-between text-center">
                  <div
                    className="bg-white border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                    style={{ width: '48%', borderColor: '#00000033' }}
                  >
                    <MdOutlineTimer size={28} color="#007860" />
                    <small className="fw-medium mt-1">{cls.duration}</small>
                  </div>

                  <div
                    className="bg-white border d-flex flex-column align-items-center justify-content-center px-2 py-2 rounded"
                    style={{ width: '48%', borderColor: '#00000033' }}
                  >
                    <SiGoogleclassroom size={28} color="#007860" />
                    <small className="fw-medium mt-1">{cls.status}</small>
                  </div>
                </div>

                <button
                  className="btn text-white d-flex align-items-center justify-content-center gap-2 mt-2"
                  style={{
                    backgroundColor: '#007860',
                    borderRadius: '999px',
                    fontWeight: '600',
                    height: '40px',
                  }}
                >
                  Join Now <MoveRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveClasses;
