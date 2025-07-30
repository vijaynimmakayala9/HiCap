import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [counts, setCounts] = useState({
    graduated: 0,
    instructors: 0,
    clients: 0,
    employed: 0
  });

  const targetCounts = {
    graduated: 20000,
    instructors: 124,
    clients: 20,
    employed: 15000
  };

  const duration = 2000; // Animation duration in ms
  const interval = 50; // Update interval in ms

  useEffect(() => {
    const steps = duration / interval;
    const increments = {
      graduated: Math.ceil(targetCounts.graduated / steps),
      instructors: Math.ceil(targetCounts.instructors / steps),
      clients: Math.ceil(targetCounts.clients / steps),
      employed: Math.ceil(targetCounts.employed / steps)
    };

    const timer = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = {...prevCounts};
        let allComplete = true;

        Object.keys(targetCounts).forEach(key => {
          if (newCounts[key] < targetCounts[key]) {
            newCounts[key] = Math.min(
              newCounts[key] + increments[key],
              targetCounts[key]
            );
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-5 position-relative" style={{ 
      backgroundImage: 'url("/bgcounter.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    }}>
      {/* Blue overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
        backgroundColor: 'rgba(13, 110, 253, 0.7)' 
      }}></div>

      <div className="container position-relative z-index-1">
        <div className="row text-center g-4">
          {/* Graduated Students */}
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold text-white mb-2">
                {counts.graduated.toLocaleString()}+
              </h2>
              <p className="mb-0 text-white">Graduated Students</p>
            </div>
          </div>

          {/* Expert Instructors */}
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold text-white mb-2">
                {counts.instructors}+
              </h2>
              <p className="mb-0 text-white">Expert Instructors</p>
            </div>
          </div>

          {/* Esteemed Clients */}
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold text-white mb-2">
                {counts.clients}+
              </h2>
              <p className="mb-0 text-white">Esteemed Clients</p>
            </div>
          </div>

          {/* Students Got Employed */}
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold text-white mb-2">
                {counts.employed.toLocaleString()}+
              </h2>
              <p className="mb-0 text-white">Students Got Employed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;