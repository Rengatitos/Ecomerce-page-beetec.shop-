import { useRef } from 'react';
import { reviewsData } from '../data/reviews';
import ReviewCard from './ReviewCard';

export default function Reviews() {
  const reviewsTrackRef = useRef(null);

  const scrollReviews = (direction) => {
    if (reviewsTrackRef.current) {
      const scrollAmount = 380;
      reviewsTrackRef.current.scrollBy({
        left: direction > 0 ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <div className="section-header">
          <h2>Lo que dicen nuestros <span className="highlight">Clientes</span></h2>
          <p>Opiniones reales de usuarios satisfechos</p>
        </div>
        <div className="reviews-carousel">
          <button className="carousel-btn carousel-prev" onClick={() => scrollReviews(-1)}>‹</button>
          <div className="reviews-track" ref={reviewsTrackRef}>
            {reviewsData.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <button className="carousel-btn carousel-next" onClick={() => scrollReviews(1)}>›</button>
        </div>
      </div>
    </section>
  );
}
