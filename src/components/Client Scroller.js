// ClientScrollerBootstrap.js
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientScrollerBootstrap = () => {
  const trackRef = useRef(null);
  const runningRef = useRef(false);
  const timeoutRef = useRef(null);
  const transitionEndRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(6);

  // --- config: tweak these if you want different spacing/speed ---
  const GAP = 24; // px gap between items (must match style below)
  const SCROLL_DURATION = 600; // ms for the slide animation
  const PAUSE_DURATION = 1000; // ms pause between slides
  // ----------------------------------------------------------------

  const logos = [
    "/logos/aws.png",
    "/logos/google.png",
    "/logos/microsoft.png",
    "/logos/meta.png",
    "/logos/ibm.png",
    "/logos/tcs.png",
    "/logos/infosys.png",
    "/logos/oracle.png",
  ];

  // duplicate logos for seamless wrap
  const repeated = [...logos, ...logos];
  const originalCount = logos.length;

  // responsive visible count
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(4);
      else setVisibleCount(6);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let currentIndex = 0; // how many steps we have moved (0..originalCount-1)
    let isMounted = true;

    const getItemWidth = () => {
      const item = track.querySelector(".logo-item");
      if (!item) return 0;
      // width including gap
      return item.getBoundingClientRect().width + GAP;
    };

    const step = () => {
      if (!isMounted) return;
      const itemWidth = getItemWidth();
      if (!itemWidth) {
        // retry shortly if layout not ready
        timeoutRef.current = setTimeout(step, 200);
        return;
      }

      // move to next index (animate)
      currentIndex += 1;
      track.style.transition = `transform ${SCROLL_DURATION}ms ease`;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      // handle after transition
      const onTransitionEnd = () => {
        if (!isMounted) return;
        track.removeEventListener("transitionend", onTransitionEnd);

        // If we've moved past originalCount, instantly reset to 0 (seamless)
        if (currentIndex >= originalCount) {
          // remove transition, jump back to start
          track.style.transition = "none";
          currentIndex = 0;
          track.style.transform = `translateX(0px)`;
          // force reflow so next transition will animate
          // eslint-disable-next-line no-unused-expressions
          track.getBoundingClientRect();
        }

        // schedule next step with pause
        timeoutRef.current = setTimeout(() => {
          step();
        }, PAUSE_DURATION);
      };

      // ensure we don't leak listeners
      transitionEndRef.current = onTransitionEnd;
      track.addEventListener("transitionend", onTransitionEnd);
    };

    // start loop (start after small initial pause so layout settles)
    timeoutRef.current = setTimeout(() => {
      runningRef.current = true;
      step();
    }, 300);

    // cleanup
    return () => {
      isMounted = false;
      runningRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (transitionEndRef.current) {
        try {
          track.removeEventListener("transitionend", transitionEndRef.current);
        } catch (e) {}
      }
    };
  }, [visibleCount, originalCount]); // restart loop if visibleCount or length changes

  return (
    <section className="container mb-4 py-5 bg-white">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">
          Our Esteemed <span style={{ color: "#ad2132" }}>Clients</span>
        </h2>
        <div
          style={{
            width: "100px",
            height: "5px",
            backgroundColor: "#ad2132",
            borderRadius: "999px",
            margin: "0.75rem auto",
          }}
        />
        <p className="text-muted small">
          Some of the companies we've helped recruit excellent applicants over the years
        </p>
      </div>

      <div className="position-relative overflow-hidden">
        {/* track: duplicated logos for seamless wrap */}
        <div
          ref={trackRef}
          className="d-flex align-items-center"
          style={{ gap: `${GAP}px`, willChange: "transform" }}
        >
          {repeated.map((logo, idx) => (
            <div
              key={idx}
              className="logo-item d-flex justify-content-center align-items-center flex-shrink-0"
              style={{
                width: `${100 / visibleCount}%`,
                minWidth: `${100 / visibleCount}%`,
              }}
            >
              <img
                src={logo}
                alt={`client ${idx + 1}`}
                className="img-fluid"
                style={{
                  maxHeight: "50px",
                  objectFit: "contain",
                  opacity: 0.85,
                  transition: "opacity .25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.85)}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* optional: small CSS to hide scrollbars (visual only) */}
      <style>{`
        .container-fluid { --bs-gutter-x: 0; }
        /* hide native scrollbars if any appear on some browsers */
        .position-relative::-webkit-scrollbar { display: none; }
        .position-relative { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ClientScrollerBootstrap;
