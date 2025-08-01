import React, { useRef, useEffect } from 'react';

const ClientScroller = () => {
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    const logos = [
        '/logos/aws.png',
        '/logos/google.png',
        '/logos/microsoft.png',
        '/logos/meta.png',
        '/logos/ibm.png',
        '/logos/tcs.png',
        '/logos/infosys.png',
        '/logos/oracle.png',
    ];

    const scrollSpeed = 1; // pixels per interval
    const scrollInterval = 20; // faster interval for smoother scroll

    useEffect(() => {
        const container = containerRef.current;

        const startScrolling = () => {
            intervalRef.current = setInterval(() => {
                if (container) {
                    container.scrollLeft += scrollSpeed;

                    // Reset scroll to start seamlessly when halfway through
                    if (container.scrollLeft >= container.scrollWidth / 2) {
                        container.scrollLeft = 0;
                    }
                }
            }, scrollInterval);
        };

        startScrolling();

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <section className="w-full mb-4 px-4 py-10 bg-gray-50 overflow-hidden">
            {/* Heading */}
            <div className="max-w-[600px] mx-auto mb-8 text-center">
                <div className="inline-block text-start">
                    <h1 className="font-roboto font-bold text-2xl sm:text-3xl mb-2 text-black">
                        Our Esteemed <span style={{ color: "#ad2132" }}>Clients</span>
                    </h1>

                    {/* Underline aligned to start of text */}
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
                    Some of the companies we've helped recruit excellent applicants over the years
                </p>
            </div>



            {/* Scrolling Logos */}
            <div
                ref={containerRef}
                className="w-full flex items-center overflow-x-auto scrollbar-hide py-2"
                style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <div className="flex space-x-6 px-2">
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex justify-center items-center"
                            style={{
                                width: '140px',
                                minWidth: '140px',
                            }}
                        >
                            <img
                                src={logo}
                                alt={`Client logo ${index + 1}`}
                                className="max-h-[50px] max-w-[120px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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
