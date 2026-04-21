import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onViewDetails }) {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <div className="product-image">
        <img src={`/images/${product.imagen}`} alt={product.nombre} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">S/.{product.precio}</span>
          <button className="product-btn" onClick={handleViewDetails}>
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}
