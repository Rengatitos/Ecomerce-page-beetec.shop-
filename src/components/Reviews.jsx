import { useRef, useEffect } from 'react';
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

  // Auto-scroll en mobile cada 7 segundos
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (reviewsTrackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsTrackRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // Si llegó al final, vuelve al inicio
        if (scrollLeft >= maxScroll - 10) {
          reviewsTrackRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scrollea al siguiente elemento (370px = tarjeta + gap)
          reviewsTrackRef.current.scrollBy({
            left: 370,
            behavior: 'smooth'
          });
        }
      }
    }, 7000);

    return () => clearInterval(interval);
  }, []);

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
