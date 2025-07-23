import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('https://hicap-backend-4rat.onrender.com/api/Review');
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
        What Our <span className="text-primary">Alumni</span> Speaks?
      </h4>

      {loading && <p className="text-center">Loading reviews...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && reviews.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-100 d-flex">
              <div className="card p-4 shadow-sm rounded-4 w-100 d-flex flex-column h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 text-success fw-bold">{review.name}</h6>
                    <div className="text-warning d-flex mt-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="me-1" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.9rem', flexGrow: 1 }}>
                  "{review.content}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Reviews;
