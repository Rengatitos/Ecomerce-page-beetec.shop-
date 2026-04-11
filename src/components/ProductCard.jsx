export default function ProductCard({ product, onViewDetails }) {
  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">S/.{product.precio}</span>
          <button className="product-btn" onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}>
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}
