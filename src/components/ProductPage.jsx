import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products, getProductImage } from '../data/products';
import ProductGallery from './ProductGallery';
import Toast from './Toast';
import '../styles/ProductPage.css';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  // Scroll al top cuando carga el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [productId]);

  const handleAddToCart = () => {
    // Obtener carrito actual
    const cart = JSON.parse(localStorage.getItem('beetecCart') || '[]');
    
    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // Si ya existe, aumentar cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si no existe, agregarlo
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: getProductImage(product.id),
        quantity: quantity
      });
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('beetecCart', JSON.stringify(cart));
    
    // Disparar evento para actualizar contador
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Mostrar toast
    setToastMessage(`${product.nombre} agregado al carrito!`);
    
    // Reset quantity
    setQuantity(1);
  };

  if (!product) {
    return (
      <div className="product-page-error">
        <div className="error-content">
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe.</p>
          <Link to="/" className="btn-back-home">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  // Encontrar productos relacionados (misma categoría)
  const relatedProducts = products
    .filter(p => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-page">
      <Toast message={toastMessage} />
      
      {/* Navigation */}
      <div className="product-breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/#catalog">Catálogo</Link>
        <span>/</span>
        <span>{product.nombre}</span>
      </div>

      {/* Main Content */}
      <div className="product-main-content">
        <div className="product-gallery-section">
          <ProductGallery productId={product.id} />
        </div>

        <div className="product-details-section">
          {/* Header */}
          <div className="product-header">
            <div className="category-badge">{product.categoria}</div>
            <h1>{product.nombre}</h1>
            <p className="product-description-main">{product.descripcion}</p>
          </div>

          {/* Price Section */}
          <div className="product-price-section">
            <div className="price-display">S/.{product.precio}</div>
            <div className="stock-info in-stock">En stock</div>
          </div>

          {/* Add to Cart */}
          <div className="product-purchase">
            <div className="quantity-selector">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="btn-add-cart" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          </div>

          {/* Features */}
          {product.caracteristicas && product.caracteristicas.length > 0 && (
            <div className="product-section">
              <h3>Características Principales</h3>
              <ul className="features-list">
                {product.caracteristicas.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="product-additional">
        {/* Especificaciones */}
        {product.especificaciones && Object.keys(product.especificaciones).length > 0 && (
          <div className="product-section full-width">
            <h3>Especificaciones Técnicas</h3>
            <div className="specifications-grid">
              {Object.entries(product.especificaciones).map(([key, value], idx) => (
                <div key={idx} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beneficios */}
        {product.beneficios && product.beneficios.length > 0 && (
          <div className="product-section full-width">
            <h3>Beneficios</h3>
            <ul className="benefits-list">
              {product.beneficios.map((benefit, idx) => (
                <li key={idx}>
                  <span className="benefit-icon">★</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Incluye */}
        {product.incluye && product.incluye.length > 0 && (
          <div className="product-section full-width">
            <h3>Lo que Incluye</h3>
            <div className="includes-list">
              {product.incluye.map((item, idx) => (
                <div key={idx} className="include-item">
                  <span className="include-icon">📦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3>Productos Relacionados</h3>
          <div className="related-products-grid">
            {relatedProducts.map(prod => (
              <Link 
                key={prod.id} 
                to={`/product/${prod.id}`}
                className="related-product-card"
              >
                <div className="related-product-image">
                  <img src={`/images/${prod.imagen}`} alt={prod.nombre} />
                </div>
                <div className="related-product-info">
                  <h4>{prod.nombre}</h4>
                  <p className="related-product-price">S/.{prod.precio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
