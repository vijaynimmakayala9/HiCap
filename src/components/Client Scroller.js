// ClientScrollerBootstrap.js
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientScrollerBootstrap = () => {
  const trackRef = useRef(null);
  const runningRef = useRef(false);
  const timeoutRef = useRef(null);
  const transitionEndRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const [logos, setLogos] = useState([]);
  const [content, setContent] = useState("");

  // --- config: tweak these if you want different spacing/speed ---
  const GAP = 24; // px gap between items (must match style below)
  const SCROLL_DURATION = 600; // ms for the slide animation
  const PAUSE_DURATION = 1000; // ms pause between slides
  // ----------------------------------------------------------------

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("https://api.techsterker.com/api/clients");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setContent(data[0].content || "");
          setLogos(data[0].image || []);
        }
      } catch (err) {
        console.error("Error fetching client logos:", err);
      }
    };

    fetchClients();
  }, []);

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

  // auto-scroll logic
  useEffect(() => {
    const track = trackRef.current;
    if (!track || logos.length === 0) return;

    let currentIndex = 0;
    let isMounted = true;

    const originalCount = logos.length;
    const repeated = [...logos, ...logos]; // duplicate logos for seamless wrap
    track.innerHTML = ""; // clear previous children if rerun

    // Render logos dynamically inside track
    repeated.forEach((logo, idx) => {
      const wrapper = document.createElement("div");
      wrapper.className =
        "logo-item d-flex justify-content-center align-items-center flex-shrink-0";
      wrapper.style.width = `${100 / visibleCount}%`;
      wrapper.style.minWidth = `${100 / visibleCount}%`;

      const img = document.createElement("img");
      img.src = logo;
      img.alt = `client ${idx + 1}`;
      img.className = "img-fluid";
      img.style.maxHeight = "50px";
      img.style.objectFit = "contain";
      img.style.opacity = 0.85;
      img.style.transition = "opacity .25s";
      img.draggable = false;

      img.onmouseenter = () => (img.style.opacity = 1);
      img.onmouseleave = () => (img.style.opacity = 0.85);

      wrapper.appendChild(img);
      track.appendChild(wrapper);
    });

    const getItemWidth = () => {
      const item = track.querySelector(".logo-item");
      if (!item) return 0;
      return item.getBoundingClientRect().width + GAP;
    };

    const step = () => {
      if (!isMounted) return;
      const itemWidth = getItemWidth();
      if (!itemWidth) {
        timeoutRef.current = setTimeout(step, 200);
        return;
      }

      currentIndex += 1;
      track.style.transition = `transform ${SCROLL_DURATION}ms ease`;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      const onTransitionEnd = () => {
        if (!isMounted) return;
        track.removeEventListener("transitionend", onTransitionEnd);

        if (currentIndex >= originalCount) {
          track.style.transition = "none";
          currentIndex = 0;
          track.style.transform = `translateX(0px)`;
          track.getBoundingClientRect(); // force reflow
        }

        timeoutRef.current = setTimeout(() => {
          step();
        }, PAUSE_DURATION);
      };

      transitionEndRef.current = onTransitionEnd;
      track.addEventListener("transitionend", onTransitionEnd);
    };

    timeoutRef.current = setTimeout(() => {
      runningRef.current = true;
      step();
    }, 300);

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
  }, [visibleCount, logos]);

  return (
    <section className="container mb-4 py-5 bg-white">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">
          Our Esteemed <span style={{ color: "#a51d34" }}>Clients</span>
        </h2>
        <p className="text-muted small">{content}</p>
      </div>

      <div className="position-relative overflow-hidden">
        <div
          ref={trackRef}
          className="d-flex align-items-center"
          style={{ gap: `${GAP}px`, willChange: "transform" }}
        />
      </div>

      <style>{`
        .container-fluid { --bs-gutter-x: 0; }
        .position-relative::-webkit-scrollbar { display: none; }
        .position-relative { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ClientScrollerBootstrap;
