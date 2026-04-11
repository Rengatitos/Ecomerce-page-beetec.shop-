export default function ProductModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const renderRating = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className={`modal ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className="modal-content product-detail" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-grid">
          <div className="modal-media">
            {product.video ? (
              <video controls style={{ width: '100%', borderRadius: '12px' }}>
                <source src={product.video} type="video/mp4" />
              </video>
            ) : (
              <img src={product.imagen} alt={product.nombre} />
            )}
          </div>

          <div className="modal-info">
            <h2>{product.nombre}</h2>
            
            <div className="price-section">
              <div className="modal-price">S/.{product.precio}</div>
              <button className="add-to-cart-btn">Agregar al Carrito</button>
            </div>

            {product.caracteristicas && (
              <div className="modal-section">
                <h3>Características Principales</h3>
                <ul className="modal-list">
                  {product.caracteristicas.map((char, idx) => (
                    <li key={idx}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.beneficios && (
              <div className="modal-section">
                <h3>Beneficios</h3>
                <ul className="modal-list">
                  {product.beneficios.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.incluye && (
              <div className="modal-section">
                <h3>Incluye</h3>
                <ul className="modal-list">
                  {product.incluye.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.especificaciones && (
              <div className="modal-section">
                <h3>Especificaciones</h3>
                <table className="spec-table">
                  <tbody>
                    {Object.entries(product.especificaciones).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
