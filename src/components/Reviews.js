import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('https://backend-hicap.onrender.com/api/Reviews');
      setReviews(res.data.data);
    } catch (err) {
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4 text-center">
        What Our <span style={{ color: "#a51d34" }}>Alumni</span> Speaks?
      </h4>

      {loading && <p className="text-center">Loading reviews...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && reviews.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 2 },
          }}
          className="pb-4" // Added padding to prevent content cutoff
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="card p-4 shadow-sm border-0 rounded-4 h-100">
                <div className="d-flex align-items-start">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-circle me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-1 textcolor fw-bold">{review.name}</h6>
                    <div className="text-warning d-flex mb-2">
                      {Array.from(
                        { length: Number.isFinite(Number(review.rating)) ? Number(review.rating) : 5 },
                        (_, i) => (
                          <FaStar key={i} className="me-1" />
                        )
                      )}
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                      "{review.content}"
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Reviews;