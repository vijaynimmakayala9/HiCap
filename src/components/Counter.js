import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [counts, setCounts] = useState({});
  const [targetCounts, setTargetCounts] = useState({});
  const duration = 2000; // Animation duration in ms
  const interval = 50; // Update interval in ms

  useEffect(() => {
    // Fetch counters from API
    const fetchCounts = async () => {
      try {
        const res = await fetch("http://31.97.206.144:5001/api/counts");
        const data = await res.json();

        if (data.success && data.data.length > 0) {
          const apiCounters = data.data[0].counters;

          // Convert API response into object { Title: count }
          const formatted = {};
          apiCounters.forEach(item => {
            formatted[item.title] = item.count;
          });

          setTargetCounts(formatted);

          // Initialize all counts to 0
          const initial = {};
          apiCounters.forEach(item => {
            initial[item.title] = 0;
          });
          setCounts(initial);
        }
      } catch (err) {
        console.error("Error fetching counters:", err);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    if (Object.keys(targetCounts).length === 0) return;

    const steps = duration / interval;
    const increments = {};
    Object.keys(targetCounts).forEach(key => {
      increments[key] = Math.ceil(targetCounts[key] / steps);
    });

    const timer = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = { ...prevCounts };
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

        if (allComplete) clearInterval(timer);
        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [targetCounts]);

  return (
    <section
      className="py-5 position-relative"
      style={{
        backgroundImage: 'url("/logo/bgcounter.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      {/* Red overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(173, 33, 50, 0.5)' }}
      ></div>

      <div className="container position-relative z-index-1">
        <div className="row text-center g-4">
          {Object.keys(counts).map((key, index) => (
            <div className="col-md-3 col-6" key={index}>
              <div className="p-3">
                <h2 className="display-4 fw-bold text-white mb-2">
                  {counts[key]?.toLocaleString()}+
                </h2>
                <p className="mb-0 text-white">{key}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
