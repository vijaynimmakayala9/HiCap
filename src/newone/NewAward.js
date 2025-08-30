import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const AwardBanner = () => {
  const slides = [
    {
      id: 1,
      image: "/logo/bgcounter.jpg",
      title: "Recognised as",
      subtitle: "MOST PROMISING UI/UX TRAINING INSTITUTES IN INDIA",
    },
    {
      id: 2,
      image: "/logo/banner.png",
      title: "Awarded By",
      subtitle: "BEST DESIGN THINKING TRAINING ACADEMY",
    },
    {
      id: 3,
      image: "/logo/bgcounter.jpg",
      title: "Recognised Globally",
      subtitle: "TOP INNOVATIVE TRAINING INSTITUTION",
    },
    {
      id: 4,
      image: "/logo/banner.png",
      title: "Top Choice",
      subtitle: "LEADING CREATIVE TRAINING CENTER",
    },
  ];

  return (
    <div className="px-5 p-5 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">🏆 Our Achievements & Awards</h2>
        <p className="text-muted">Proud moments that define our journey</p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        slidesPerGroup={1} // 👈 slide one by one
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          768: { slidesPerView: 2 }, // tablet & up
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container-fluid rounded-3 text-center mb-3 p-4 shadow-sm border">
              <img
                src={slide.image}
                alt="Award"
                className="img-fluid mb-3 d-block mx-auto"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
              <h5 className="text-dark mb-2">{slide.title}</h5>
              <p className="text-black fw-bold mb-3">{slide.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AwardBanner;
