import { useEffect, useState } from 'react';
import { getRandomComments } from '../data/productComments';
import '../styles/ProductReviews.css';

export default function ProductReviews({ productId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Obtener comentarios aleatorios del producto
    const randomComments = getRandomComments(productId, 4);
    setComments(randomComments);
  }, [productId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="product-reviews-section">
      <h3>Comentarios de Clientes Satisfechos</h3>
      <div className="reviews-grid">
        {comments.map((comment, idx) => (
          <div key={idx} className="review-card">
            <div className="review-header">
              <div className="review-author">
                <h4>{comment.nombre}</h4>
                <div className="review-rating">
                  {renderStars(comment.rating)}
                  <span className="rating-number">{comment.rating}</span>
                </div>
              </div>
              <span className="review-date">{comment.date}</span>
            </div>
            <p className="review-text">"{comment.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
