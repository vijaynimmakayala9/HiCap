import React, { useRef, useEffect, useState } from "react";

const ClientScroller = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(6);

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

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || logos.length <= visibleCount) return;

    // Get width of one logo item + gap (assumed 24px)
    const logoItem = container.querySelector(".logo-item");
    if (!logoItem) return;

    const logoWidth = logoItem.offsetWidth + 24;
    const totalWidth = logoWidth * logos.length;

    let startScrollLeft = container.scrollLeft;
    let targetScrollLeft = startScrollLeft + logoWidth;
    let startTime = null;
    const scrollDuration = 2000; // 2 seconds to scroll one logo width
    const pauseDuration = 1000; // 1 second pause

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < scrollDuration) {
        // Calculate eased scroll position (linear here, can use easing)
        const progress = elapsed / scrollDuration;
        container.scrollLeft = startScrollLeft + logoWidth * progress;
        animationRef.current = requestAnimationFrame(step);
      } else {
        // Scroll finished one logo width, ensure exact alignment
        container.scrollLeft = targetScrollLeft;

        // Reset scroll position if at end
        if (container.scrollLeft >= totalWidth) {
          container.scrollLeft -= totalWidth;
        }

        // Pause for 1 second before next scroll
        pauseTimeoutRef.current = setTimeout(() => {
          // Setup next scroll
          startScrollLeft = container.scrollLeft;
          targetScrollLeft = startScrollLeft + logoWidth;
          startTime = null;
          animationRef.current = requestAnimationFrame(step);
        }, pauseDuration);
      }
    };

    animationRef.current = requestAnimationFrame(step);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [visibleCount, logos.length]);

  return (
    <section className="w-full mb-4 px-4 py-10 bg-gray-50 overflow-hidden">
      {/* Heading */}
      <div className="max-w-[600px] mx-auto mb-8 text-center">
        <div className="inline-block text-start">
          <h1 className="font-roboto font-bold text-2xl sm:text-3xl mb-2 text-black">
            Our Esteemed <span style={{ color: "#ad2132" }}>Clients</span>
          </h1>
          <div
            style={{
              width: "100px",
              height: "5px",
              backgroundColor: "#ad2132",
              borderRadius: "999px",
              marginBottom: "12px",
            }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Some of the companies we've helped recruit excellent applicants over
          the years
        </p>
      </div>

      {/* Scroller */}
      <div
        ref={containerRef}
        className="w-full flex items-center overflow-x-auto scrollbar-hide py-2"
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex" style={{ gap: "24px" }}>
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-center items-center logo-item"
              style={{
                width: `${100 / visibleCount}%`,
                minWidth: `${100 / visibleCount}%`,
              }}
            >
              <img
                src={logo}
                alt={`Client logo ${index + 1}`}
                className="max-h-[50px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ClientScroller;
