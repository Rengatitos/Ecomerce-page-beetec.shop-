export default function ReviewCard({ review }) {
  const stars = '⭐'.repeat(Math.floor(review.rating));
  
  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <div className="review-author">{review.nombre}</div>
          <div className="review-rating">{stars}</div>
        </div>
        <div className="review-date">{review.date}</div>
      </div>
      <p className="review-text">"{review.text}"</p>
      <div className="review-product">{review.product}</div>
    </div>
  );
}
